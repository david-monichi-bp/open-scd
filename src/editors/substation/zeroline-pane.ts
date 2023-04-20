import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
  css,
  query,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import { Menu } from '@material/mwc-menu';

import './line-editor.js';
import './process-editor.js';
import './substation-editor.js';
import './ied-editor.js';
import { communicationMappingWizard } from '../../wizards/commmap-wizards.js';
import { gooseIcon, smvIcon, reportIcon } from '../../icons/icons.js';
import { isPublic, newWizardEvent } from '../../foundation.js';
import { selectGseControlWizard } from '../../wizards/gsecontrol.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import { getAttachedIeds } from './foundation.js';
import { selectSampledValueControlWizard } from '../../wizards/sampledvaluecontrol.js';
import { Settings } from '../../Setting.js';
import { selectReportControlWizard } from '../../wizards/reportcontrol.js';

import { SCLTag, tags } from '../../foundation.js';

function shouldShowIEDs(): boolean {
  return localStorage.getItem('showieds') === 'on';
}

function setShowIEDs(value: Settings['showieds']) {
  localStorage.setItem('showieds', value);
}

function shouldShowFunctions(): boolean {
  return localStorage.getItem('showfunctions') === 'on';
}

function setShowFunctions(value: 'on' | 'off') {
  localStorage.setItem('showfunctions', value);
}

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => [];

  @query('#commmap') commmap!: IconButton;
  @query('#showieds') showieds!: IconButtonToggle;
  @query('#showfunctions') showfunctions!: IconButtonToggle;
  @query('#gsecontrol') gsecontrol!: IconButton;
  @query('#smvcontrol') smvcontrol!: IconButton;
  @query('#reportcontrol') reportcontrol!: IconButton;
  @query('#createsubstation') createsubstation!: IconButton;

  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

  openCommunicationMapping(): void {
    const wizard = communicationMappingWizard(this.doc);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  openReportControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectReportControlWizard(this.doc.documentElement))
    );
  }

  openGseControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectGseControlWizard(this.doc.documentElement))
    );
  }

  openSampledValueControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() =>
        selectSampledValueControlWizard(this.doc.documentElement)
      )
    );
  }

  toggleShowIEDs(): void {
    if (shouldShowIEDs()) setShowIEDs('off');
    else setShowIEDs('on');
    this.requestUpdate();
  }

  toggleShowFunctions(): void {
    if (shouldShowFunctions()) setShowFunctions('off');
    else setShowFunctions('on');
    this.requestUpdate();
  }

  renderIedContainer(): TemplateResult {
    this.getAttachedIeds = shouldShowIEDs()
      ? getAttachedIeds(this.doc)
      : () => [];
    const ieds = this.getAttachedIeds?.(this.doc.documentElement) ?? [];

    return ieds.length
      ? html`<div id="iedcontainer">
          ${ieds.map(
            ied =>
              html`<ied-editor .doc=${this.doc} .element=${ied}></ied-editor>`
          )}
        </div>`
      : html``;
  }

  renderSubstation(): TemplateResult {
    return this.doc?.querySelector(':root > Substation')
      ? html`<section>
          ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
            .filter(isPublic)
            .map(
              substation =>
                html`<substation-editor
                  .doc=${this.doc}
                  .element=${substation}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></substation-editor>`
            )}
        </section>`
      : html`<h1>
          <span style="color: var(--base1)"
            >${translate('substation.missing')}</span
          >
        </h1>`;
  }

  renderLines(): TemplateResult {
    return this.doc?.querySelector(':root > Line')
      ? html`<section>
          ${Array.from(this.doc.querySelectorAll('Line') ?? [])
            .filter(isPublic)
            .map(
              line =>
                html`<line-editor
                  .doc=${this.doc}
                  .element=${line}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></line-editor>`
            )}
        </section>`
      : html``;
  }

  renderProcesses(): TemplateResult {
    return this.doc?.querySelector(':root > Process')
      ? html`<section>
          ${Array.from(this.doc.querySelectorAll(':root > Process') ?? [])
            .filter(isPublic)
            .map(
              process =>
                html`<process-editor
                  .doc=${this.doc}
                  .element=${process}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></process-editor>`
            )}
        </section>`
      : html``;
  }

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.doc.documentElement);

    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private renderAddButtons(): TemplateResult[] {
    return childTags(this.doc.documentElement).map(
      child =>
        html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`
    );
  }

  updated(): void {
    if (this.addMenu && this.addButton)
      this.addMenu.anchor = <HTMLElement>this.addButton;
  }

  render(): TemplateResult {
    return html` <h1>
        <nav>
          <abbr slot="action" title="${translate('add')}">
            <mwc-icon-button
              icon="playlist_add"
              @click=${() => (this.addMenu.open = true)}
            ></mwc-icon-button
            ><mwc-menu
              corner="BOTTOM_RIGHT"
              @action=${(e: Event) => {
                const tagName = (<ListItem>(<Menu>e.target).selected).value;
                this.openCreateWizard(tagName);
              }}
              >${this.renderAddButtons()}</mwc-menu
            ></abbr
          >
        </nav>
        <nav>
          <abbr title="${translate('zeroline.showieds')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowIEDs()}
              @click=${() => this.toggleShowIEDs()}
              id="showieds"
              onIcon="developer_board"
              offIcon="developer_board_off"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${translate('zeroline.showfunctions')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowFunctions()}
              @click=${() => this.toggleShowFunctions()}
              id="showfunctions"
              onIcon="layers"
              offIcon="layers_clear"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${translate('zeroline.commmap')}">
            <mwc-icon-button
              id="commmap"
              icon="link"
              @click=${() => this.openCommunicationMapping()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('zeroline.reportcontrol')}"
            ><mwc-icon-button
              id="reportcontrol"
              @click="${() => this.openReportControlSelection()}"
              >${reportIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${translate('zeroline.gsecontrol')}"
            ><mwc-icon-button
              id="gsecontrol"
              @click="${() => this.openGseControlSelection()}"
              >${gooseIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${translate('zeroline.smvcontrol')}"
            ><mwc-icon-button
              id="smvcontrol"
              @click="${() => this.openSampledValueControlSelection()}"
              >${smvIcon}</mwc-icon-button
            ></abbr
          >
        </nav>
      </h1>
      ${this.renderIedContainer()}
      ${this.renderSubstation()}${this.renderLines()}${this.renderProcesses()}`;
  }

  static styles = css`
    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    h1 > nav,
    h1 > abbr > mwc-icon-button {
      float: right;
    }

    section {
      padding: 8px 12px 16px;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    #iedcontainer {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(128px, auto));
    }
  `;
}
