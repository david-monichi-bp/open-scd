import {
  Create,
  getInstanceAttribute,
  getNameAttribute,
  newWizardEvent
} from "../../../foundation.js";
import { editAddressWizard } from "../wizards/address.js";
import { CreateFunction } from "./cdc.js";

export const PRIVATE_TYPE_104 = "IEC_60870_5_104";

/**
 * Retrieve the full path as wanted for the IED Container in the 104 Plugin, meaning we go higher in the
 * hierarchy until the parent found is the IED, this element is excluded, because the containers are group per
 * IED.
 * From all parent between the DAI and IED the name or likely attributes are used to define a unique name.
 *
 * @param element - The DAI Element for which the full path needs to be defined.
 * @param topLevelTagName - Name of the Tag to stop at when travelling through the parents (excluding).
 * @returns The full path shown to the user for a DAI Element.
 */
export function getFullPath(element: Element, topLevelTagName: string): string {
  let path = getNameAttribute(element) ?? '';
  let parent = element.parentElement;

  while (parent && parent.tagName != topLevelTagName) {
    let value: string | undefined;
    switch (parent.tagName) {
      case 'LN':
      case 'LN0': {
        const prefix = parent.getAttribute('prefix');
        const inst = getInstanceAttribute(parent);
        value = `${prefix ? prefix + '-' : ''}${parent.getAttribute('lnClass')}${inst ? '-' + inst : ''}`;
        break;
      }
      case 'LDevice': {
        value = getNameAttribute(parent) ?? getInstanceAttribute(parent);
        break;
      }
      default: {
        // Just add the name to the list
        value = getNameAttribute(parent);
      }
    }
    path = (value ? value + ' / ' : '') + path;
    parent = parent.parentElement;
  }
  return path;
}

/**
 * Retrieve the CDC Value that belongs to a DAI Element, meaning, using the DOI/LN Elements to
 * search for a DO Element, which is again used to find the DO/DOType Element. The DOType Element
 * finally holds the attribute 'cdc'.
 *
 * @param doiElement - The DOI Element to start the search for the CDC Value.
 * @returns The CDC Value from the DOType Element.
 */
export function getCdcValue(doiElement: Element): string | null {
  const lnElement = doiElement.closest('LN0, LN');
  if (lnElement) {
    const lnType = lnElement.getAttribute('lnType');
    const doName = doiElement.getAttribute('name');

    const doElement = doiElement.ownerDocument.querySelector(`LNodeType[id="${lnType}"] > DO[name="${doName}"]`)
    if (doElement) {
      const doType = doElement.getAttribute('type');
      const doTypeElement = doiElement.ownerDocument.querySelector(`DOType[id="${doType}"]`)
      return (doTypeElement ? doTypeElement.getAttribute('cdc') : null);
    }
  }
  return null;
}

/**
 * All available Address attributes that can be displayed.
 */
const addressAttributes = [
  'casdu',
  'ioa',
  'ti',
  'expectedValue',
  'unitMultiplier',
  'scaleMultiplier',
  'scaleOffset',
  'inverted',
  'check',
];

/**
 * Create a string to display all information about a 104 Address element.
 * A list of attributes is used to determine what can be displayed if available.
 *
 * @param address - The Address element from which to retrieve all attribute values.
 * @returns A string to display with all attribute values.
 */
export function get104DetailsLine(address: Element): string {
  return addressAttributes
    .filter(attrName => address.hasAttribute(attrName))
    .map(attrName => `${attrName}: ${address.getAttribute(attrName)}`)
    .join(', ');
}

/**
 * Indicates if the combination cdc/ti should handle/process the attribute "expected" of the Address Element.
 *
 * @param cdc - The Common Data Class.
 * @param ti  - The TI Value.
 * @returns true, if the combination should handle/process the attribute "expected".
 */
export function hasExpectedValueField(cdc: string, ti: string): boolean {
  return (cdc === 'ENC' && ['30', '45', '58'].includes(ti))
    || (cdc === 'ENG' && ['45', '58'].includes(ti))
    || (cdc === 'ENS' && ti === '30')
    || (cdc === 'INS' && ti === '30');
}

/**
 * Indicates if the combination cdc/ti should handle/process the attribute "unitMultiplier" of the Address Element.
 *
 * @param cdc - The Common Data Class.
 * @param ti  - The TI Value.
 * @returns true, if the combination should handle/process the attribute "unitMultiplier".
 */
export function hasUnitMultiplierField(cdc: string, ti: string): boolean {
  return (cdc === 'MV' && ['35', '36'].includes(ti))
    || (cdc === 'INS' && ti === '35');
}

/**
 * Indicates if the combination cdc/ti should handle/process the attributes "scaleMultiplier" and "scaleOffset" of
 * the Address Element.
 *
 * @param cdc - The Common Data Class.
 * @param ti  - The TI Value.
 * @returns true, if the combination should handle/process the attributes "scaleMultiplier" and "scaleOffset".
 */
export function hasScaleFields(cdc: string, ti: string): boolean {
  return (cdc === 'MV' && ['35', '36'].includes(ti));
}

/**
 * Search for a DAI Element below the passed DOI Element.
 *
 * @param doiElement - The DOI Element to search on.
 * @param name       - The name of the DAI Element to search for.
 * @returns The found DAI Element or null, if not found.
 */
export function getDaiElement(doiElement: Element, name: string): Element | null {
  return doiElement.querySelector(`:scope > DAI[name="${name}"]`);
}

/**
 * Search for the Value of a DAI Element below the passed DOI Element.
 *
 * @param doiElement - The DOI Element to search on.
 * @param name       - The name of the DAI Element to search for.
 * @returns The value (Val) of the found DAI Element or null, if not found.
 */
export function getDaiValue(doiElement: Element, name: string): string | null {
  const daiElement = getDaiElement(doiElement, name);
  if (daiElement) {
    return daiElement.querySelector(':scope > Val')?.textContent ?? null;
  }
  return null;
}

/**
 * Search for the DAI Element 'ctlModel', this one indicates if control Addresses need to be created.
 *
 * @param doiElement - The DOI Element.
 * @returns The value of the CtlModel.
 */
export function getCtlModel(doiElement: Element): string | null {
  return getDaiValue(doiElement, 'ctlModel');
}

/**
 * Create a list of Create Actions using the parameters passed. First search for the DAI Elements
 * that can be effected. Next create the action and add it to this list, also start the Edit
 * Address Element wizard for all Address Elements created.
 *
 * @param doiElement     - The DOI Element.
 * @param wizard         - The Wizard to dispatch the Open Wizard event on.
 * @param ti             - The TI Value set on the new Address Elements.
 * @param filter         - The Filter used to find the DAI Elements.
 * @param createFunction - The Function used to create the new Private/Address Elements.
 * @returns A list of Create Action that will be added to the complex action.
 */
export function createActions(
  doiElement: Element,
  wizard: Element,
  ti: string,
  filter: string,
  createFunction: CreateFunction
): Create[] {
  const actions: Create[] = [];
  const daiMonitorElements = doiElement.querySelectorAll(filter);
  if (daiMonitorElements.length > 0) {
    daiMonitorElements.forEach(daiElement => {
      const createActions = createFunction(daiElement, ti);
      actions.push(...createActions);

      createActions.forEach(createAction => {
        const privateElement = <Element>createAction.new.element;
        Array.from(privateElement.querySelectorAll('Address'))
          .forEach(addressElement => {
            wizard.dispatchEvent(newWizardEvent(editAddressWizard(daiElement, addressElement)));
          });
      });
    });
  }
  return actions;
}

/**
 * Enumeration stating the active view of the 104 plugin.
 */
export enum View {
  VALUES,
  NETWORK
}

export const VIEW_EVENT_NAME = 'view-change-104-plugin';

// Objects needed to register and fire the change of a view within the Communication 104 Plugin
export interface ViewDetail {
  view: View;
}
export type ViewEvent = CustomEvent<ViewDetail>;
export function newViewEvent(
  view: View,
): ViewEvent {
  return new CustomEvent<ViewDetail>(VIEW_EVENT_NAME, {
    bubbles: true,
    composed: true,
    detail: { view },
  });
}

declare global {
  interface ElementEventMap {
    [VIEW_EVENT_NAME]: ViewEvent;
  }
}
