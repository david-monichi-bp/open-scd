import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { html, LitElement, property, customElement, state, css, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../../_snowpack/pkg/@material/mwc-menu.js';
import '../../../../openscd/src/action-pane.js';
import './general-equipment-editor.js';
import { newWizardEvent, tags, } from '../../../../openscd/src/foundation.js';
import { getChildElementsByTagName } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import { renderGeneralEquipment } from './foundation.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
/** Pane rendering `EqSubFunction` element with its children */
let EqSubFunctionEditor = class EqSubFunctionEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.showfunctions = false;
    }
    get header() {
        const name = this.element.getAttribute('name');
        const desc = this.element.getAttribute('desc');
        const type = this.element.getAttribute('type');
        return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
    }
    openEditWizard() {
        const wizard = wizards['EqSubFunction'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    remove() {
        if (this.element.parentElement)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                },
            }));
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    updated() {
        this.addMenu.anchor = this.addButton;
    }
    renderLNodes() {
        const lNodes = getChildElementsByTagName(this.element, 'LNode');
        return lNodes.length
            ? html `<div class="container lnode">
          ${lNodes.map(lNode => html `<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>`
            : html ``;
    }
    renderEqSubFunctions() {
        const eqSubFunctions = getChildElementsByTagName(this.element, 'EqSubFunction');
        return html ` ${eqSubFunctions.map(eqSubFunction => html `<eq-sub-function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${eqSubFunction}
        ></eq-sub-function-editor>`)}`;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    render() {
        return html `<action-pane label="${this.header}" icon="functions" secondary
      ><abbr slot="action" title="${get('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button> </abbr
      ><abbr slot="action" title="${get('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button> </abbr
      ><abbr slot="action" style="position:relative;" title="${get('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => (this.addMenu.open = true)}
        ></mwc-icon-button
        ><mwc-menu
          corner="BOTTOM_RIGHT"
          menuCorner="END"
          @action=${(e) => {
            const tagName = e.target.selected.value;
            this.openCreateWizard(tagName);
        }}
          >${this.renderAddButtons()}</mwc-menu
        ></abbr
      >
      ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
      ${this.renderLNodes()}${this.renderEqSubFunctions()}</action-pane
    >`;
    }
};
EqSubFunctionEditor.styles = css `
    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    .container.lnode {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
__decorate([
    property({ attribute: false })
], EqSubFunctionEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], EqSubFunctionEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], EqSubFunctionEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], EqSubFunctionEditor.prototype, "showfunctions", void 0);
__decorate([
    state()
], EqSubFunctionEditor.prototype, "header", null);
__decorate([
    query('mwc-menu')
], EqSubFunctionEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], EqSubFunctionEditor.prototype, "addButton", void 0);
EqSubFunctionEditor = __decorate([
    customElement('eq-sub-function-editor')
], EqSubFunctionEditor);
export { EqSubFunctionEditor };
//# sourceMappingURL=eq-sub-function-editor.js.map