var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-fab.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../../../_snowpack/pkg/@material/mwc-menu.js";
import "../../../../openscd/src/action-icon.js";
import "../../../../openscd/src/action-pane.js";
import "./sub-equipment-editor.js";
import "./eq-function-editor.js";
import "./transformer-winding-editor.js";
import {powerTransformerTwoWindingIcon} from "../../../../openscd/src/icons/icons.js";
import {emptyWizard, wizards} from "../../wizards/wizard-library.js";
import {
  newWizardEvent,
  tags
} from "../../../../openscd/src/foundation.js";
import {
  getChildElementsByTagName
} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {startMove, styles} from "./foundation.js";
import {SubstationEditor} from "./substation-editor.js";
import {BayEditor} from "./bay-editor.js";
import {VoltageLevelEditor} from "./voltage-level-editor.js";
function childTags(element) {
  if (!element)
    return [];
  return tags[element.tagName].children.filter((child) => wizards[child].create !== emptyWizard);
}
export let PowerTransformerEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.showfunctions = false;
  }
  get name() {
    return this.element.getAttribute("name") ?? "UNDEFINED";
  }
  openEditWizard() {
    const wizard = wizards["PowerTransformer"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  openLNodeWizard() {
    const wizard = wizards["LNode"].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  removeElement() {
    if (this.element)
      this.dispatchEvent(newActionEvent({
        old: {
          parent: this.element.parentElement,
          element: this.element,
          reference: this.element.nextSibling
        }
      }));
  }
  openCreateWizard(tagName) {
    const wizard = wizards[tagName].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  updated() {
    if (this.addMenu && this.addButton)
      this.addMenu.anchor = this.addButton;
  }
  renderLNodes() {
    const lNodes = getChildElementsByTagName(this.element, "LNode");
    return lNodes.length ? html`<div class="container lnode">
          ${lNodes.map((lNode) => html`<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>` : html``;
  }
  renderEqFunctions() {
    if (!this.showfunctions)
      return html``;
    const eqFunctions = getChildElementsByTagName(this.element, "EqFunction");
    return html` ${eqFunctions.map((eqFunction) => html`<eq-function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${eqFunction}
          ?showfunctions=${this.showfunctions}
        ></eq-function-editor>`)}`;
  }
  renderSubEquipments() {
    if (!this.showfunctions)
      return html``;
    const subEquipments = getChildElementsByTagName(this.element, "SubEquipment");
    return html` ${subEquipments.map((subEquipment) => html`<sub-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${subEquipment}
        ></sub-equipment-editor>`)}`;
  }
  renderAddButtons() {
    return childTags(this.element).map((child) => html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
  }
  renderContentPane() {
    return html`<mwc-icon class="substation-editor-icon" slot="icon"
        >${powerTransformerTwoWindingIcon}</mwc-icon
      >
      <abbr slot="action" title="${get("lnode.tooltip")}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get("edit")}">
        <mwc-icon-button
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get("move")}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => {
      startMove(this, PowerTransformerEditor, [
        SubstationEditor,
        VoltageLevelEditor,
        BayEditor
      ]);
    }}"
          icon="forward"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get("remove")}">
        <mwc-icon-button
          slot="action"
          mini
          icon="delete"
          @click="${() => this.removeElement()}}"
        ></mwc-icon-button> </abbr
      ><abbr slot="action" style="position:relative;" title="${get("add")}">
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addMenu.open = true}
        ></mwc-icon-button
        ><mwc-menu
          corner="BOTTOM_RIGHT"
          menuCorner="END"
          @action=${(e) => {
      const tagName = e.target.selected.value;
      this.openCreateWizard(tagName);
    }}
          >${this.renderAddButtons()}</mwc-menu
        >
      </abbr>`;
  }
  renderTransformerWinding() {
    if (!this.showfunctions)
      return html``;
    const transformerWindings = getChildElementsByTagName(this.element, "TransformerWinding");
    return transformerWindings.length ? html`<div class="container">
          ${transformerWindings.map((transformerWindings2) => html`<transformer-winding-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${transformerWindings2}
                ?showfunctions=${this.showfunctions}
              ></transformer-winding-editor>`)}
        </div>` : html``;
  }
  renderContentIcon() {
    return html`<mwc-icon slot="icon"
        >${powerTransformerTwoWindingIcon}</mwc-icon
      >
      <mwc-fab
        slot="action"
        class="edit"
        mini
        @click="${() => this.openEditWizard()}"
        icon="edit"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.removeElement()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => {
      startMove(this, PowerTransformerEditor, [
        SubstationEditor,
        VoltageLevelEditor,
        BayEditor
      ]);
    }}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>`;
  }
  render() {
    if (this.showfunctions)
      return html`<action-pane label="${this.name}">
        ${this.renderContentPane()} ${this.renderLNodes()}
        ${this.renderEqFunctions()} ${this.renderSubEquipments()}
        ${this.renderTransformerWinding()}
      </action-pane> `;
    return html`<action-icon label="${this.name}"
      >${this.renderContentIcon()}</action-icon
    > `;
  }
};
PowerTransformerEditor.styles = css`
    ${styles}

    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property({attribute: false})
], PowerTransformerEditor.prototype, "doc", 2);
__decorate([
  property({type: Number})
], PowerTransformerEditor.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], PowerTransformerEditor.prototype, "element", 2);
__decorate([
  property({type: String})
], PowerTransformerEditor.prototype, "name", 1);
__decorate([
  property({type: Boolean})
], PowerTransformerEditor.prototype, "showfunctions", 2);
__decorate([
  query("mwc-menu")
], PowerTransformerEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], PowerTransformerEditor.prototype, "addButton", 2);
PowerTransformerEditor = __decorate([
  customElement("powertransformer-editor")
], PowerTransformerEditor);
