# `wz-dialog` Component Specification

This document provides the specification for the Waze Styleguide `wz-dialog` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-dialog`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `alignment` | `"center" \| "default"` | `"default"` | Aligns the dialog's inner text, including `wz-dialog-header` and `wz-dialog-content` |
| `dismissible` | `boolean` | `true` | Whether the dialog is dismissible, meaning can it be closed without using any of the provided controls. If dismissible=true, the dialog can be closed by clicking on the dark background or by clicking an 'X' icon on the top right of the dialog. |
| `size` | `"lg" \| "sm" \| "xl" \| "xs" \| "xxs"` | `"sm"` | Dialog's width, according to the following specs: xxs: 280px xs: 320px sm: 400px lg: 560px xl: 720px |

### Slots
*No slots defined.*

### Events
- `dialogHidden`: Dispatched after hiding the dialog
- `dialogShown`: Dispatched after showing the dialog

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        if (!this.displayed) {
            return;
        }
        const componentClass = {
            "wz-dialog": true,
            [getDialogSizeClass(this.size)]: true,
        };
        const dismissButton = this.dismissible && (h("button", { class: "dismiss-button", onClick: () => this.hideDialog() }, xIcon()));
        return (h("div", { class: "wz-dialog-wrapper" }, h("div", { class: "dark-overlay", onClick: () => this.hideDialogIfDismissible() }), h("div", { class: componentClass }, dismissButton, h("slot", null))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-dialog-wrapper .wz-dialog {
  background-color: var(--background_default, #ffffff);
  border-radius: var(--wz-dialog-border-radius, 10px);
  box-shadow: 0 4px 8px 3px rgba(0.15, 0.24, 0.25, 0.26);
  display: flex;
  flex-direction: column;
  height: var(--wz-dialog-height);
  padding-bottom: var(--wz-dialog-padding, var(--space-l, 24px));
  padding-top: var(--wz-dialog-padding, var(--space-l, 24px));
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.wz-dialog-wrapper .wz-dialog.xxs {
  width: var(--wz-dialog-width, 280px);
}
.wz-dialog-wrapper .wz-dialog.xs {
  width: var(--wz-dialog-width, 320px);
}
.wz-dialog-wrapper .wz-dialog.sm {
  width: var(--wz-dialog-width, 400px);
}
.wz-dialog-wrapper .wz-dialog.lg {
  width: var(--wz-dialog-width, 560px);
}
.wz-dialog-wrapper .wz-dialog.xl {
  width: var(--wz-dialog-width, 720px);
}
.wz-dialog-wrapper .wz-dialog .dismiss-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--wz-dialog-dismiss-button-width, 24px);
  padding: 0;
  position: absolute;
  right: var(--wz-dialog-dismiss-button-top, var(--space-always-m, 16px));
  top: var(--wz-dialog-dismiss-button-top, var(--space-m, 16px));
}
.wz-dialog-wrapper .wz-dialog .dismiss-button svg {
  height: var(--wz-dialog-dismiss-button-width, 24px);
  width: var(--wz-dialog-dismiss-button-width, 24px);
}
.wz-dialog-wrapper .wz-dialog .dismiss-button svg path {
  fill: var(--wz-dialog-dismiss-button-fill, var(--content_p1, #3c4043));
}
@media (min-width: 600px) and (min-height: 600px) {
  .wz-dialog-wrapper .wz-dialog {
    left: 50%;
    min-height: 182px;
    min-width: 280px;
    top: 50%;
  }
}
@media (orientation: portrait) and (max-width: 600px) {
  .wz-dialog-wrapper .wz-dialog {
    left: calc(50% - var(--space-always-m, 16px));
    margin: var(--space-xxl, 40px) var(--space-always-m, 16px);
    max-width: var(--wz-dialog-width, calc(100% - 2 * var(--wz-dialog-padding, var(--space-always-l, 24px)) - 2 * var(--space-always-m, 16px)));
    min-width: 280px;
    top: calc(50% - var(--space-xxl, 40px));
  }
}
@media (orientation: landscape) and (max-height: 600px) {
  .wz-dialog-wrapper .wz-dialog {
    left: 50%;
    margin: var(--space-m, 16px) 0;
    max-height: var(--wz-dialog-height, calc(100% - 2 * var(--wz-dialog-padding, var(--space-l, 24px)) - 2 * var(--space-m, 16px)));
    max-width: var(--wz-dialog-width, 65%);
    position: fixed;
    top: calc(50% - var(--space-m, 16px));
  }
}
.wz-dialog-wrapper .dark-overlay {
  background-color: var(--background_modal, rgba(32, 33, 36, 0.6));
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 0;
}

:host {
  /**
  * @prop --wz-dialog-padding: The dialog padding value. default:	24px
  * @prop --wz-dialog-height: The dialog height value. If not specified, the height is computed according to the content.
  * @prop --wz-dialog-width: The dialog width value, regardless the dialog size.	If not specified, the width depends on the dialog size.
  * @prop --wz-dialog-dismiss-button-top: The dismiss button top value. default: 16px
  * @prop --wz-dialog-dismiss-button-fill: The dismiss button fill value. default: `#3c4043`
  * @prop --wz-dialog-dismiss-button-width: The dismiss button width value. default: 24px
  */
  position: fixed;
  z-index: 1002;
}

:host([dir=rtl]) .dismiss-button {
  left: var(--wz-dialog-dismiss-button-top, var(--space-m, 16px));
  right: unset;
}

:host([alignment=center]) ::slotted(wz-dialog-content) {
  text-align: center;
}
:host([alignment=center]) ::slotted(wz-dialog-header) {
  text-align: center;
}
:host([alignment=center]) ::slotted(wz-dialog-controls:not([layout=vertical])) {
  align-self: center;
}
```
