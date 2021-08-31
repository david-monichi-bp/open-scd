# `substation-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="Edit substation"
  open=""
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="Substation name"
      label="name"
      required=""
      validationmessage="Required"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Substation description"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="Cancel"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="edit"
    label="Save"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```
