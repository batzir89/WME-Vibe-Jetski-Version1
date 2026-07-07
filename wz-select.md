# `wz-select` Component Specification

This document provides the specification for the Waze Styleguide `wz-select` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-select`
**Encapsulation:** `shadow`
**Dependencies:** `wz-menu`, `wz-label`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether the select component is disabled. |
| `errorMessage` | `string` | `""` | The error message for error state |
| `label` | `string` | `""` | The label of the select component. |
| `name` | `string` | `""` | The name of the select component. |
| `placeholder` | `string` | `` | A title to display when no option is selected. |
| `successMessage` | `string` | `""` | The success message for success state |
| `upperMenu` | `boolean` | `false` | Whether the menu should be forced to open upwards. By default, the menu will check if it has enough space downwards, and if it does not, it will open upwards. By passing "true" to this prop the menu will open upwards regardless to it's position. |
| `value` | `number \| string` | `` | The selected value of the select component. |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const { el, value, name, label, errorMessage, successMessage, expanded, disabled, title, } = this;
        const parentForm = this.el.closest("FORM");
        if (parentForm) {
            this.outerInput = renderHtmlTextInputOutsideShadowRoot(el, name, String(value));
        }
        const labelPart = label && h("wz-label", { key: '4025e5352244aecb2ac6909ee8b2004d1536e337' }, label);
        const hasError = Boolean(errorMessage);
        const hasSuccess = Boolean(successMessage);
        const shouldShowSuccessMessage = hasSuccess && !hasError;
        const errorIconPart = hasError && (h("div", { key: '93e0ec494408814988a29f9cc462cd77e302c2f7', class: "error-icon" }, h("slot", { key: '1caae70ad5d3ebda56f1a7e3565ab51d28e3bcb5', name: "error-icon" }, alertIcon())));
        const successIconPart = shouldShowSuccessMessage && (h("div", { key: 'facdf1b898123b7f0342ea9116d1e4f1a5a9f818', class: "success-icon" }, h("slot", { key: '34f920d7ac7b54d1778be15f71fd3431c7da39d9', name: "success-icon" }, successIcon())));
        const errorMessagePart = hasError && (h("div", { key: 'f01d88f6f69515b035eae7973428b495852de9e8', class: "error-text" }, errorMessage));
        const successMessagePart = shouldShowSuccessMessage && (h("div", { key: '1343089db2a45adf3bfec349975c6a4f1c69dbd5', class: "success-text" }, successMessage));
        const componentClass = {
            "has-error": hasError,
            "has-success": shouldShowSuccessMessage,
            "wz-select": true,
            disabled: disabled,
            expanded: expanded,
            mobile: isMobileDevice(),
        };
        return (h("div", { key: '2bc4ddaff5f5c601ef1c544a71f13d0ccad27497', class: componentClass }, labelPart, h("div", { key: '2936c3b2ce81f350b4753bb929d31bc1bb63a5e7', class: "select-wrapper", id: "select-wrapper" }, errorIconPart, successIconPart, h("div", { key: '8770f7a90b7114dc61c3ed190b981fada5570a71', tabIndex: 0, class: "select-box", ref: (node) => (this.selectBox = node) }, h("div", { key: 'ccb72c0e4bc0bb9b924ce27292c1da0a8b31ae4d', class: "selected-value-wrapper" }, h("span", { key: 'e4e83b311c383491152cfa86c5b5adc54bfde032', class: "selected-value" }, title), caretDownIcon())), this.renderSelectOptions()), errorMessagePart, successMessagePart));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
@keyframes drop-in {
  from {
    opacity: 0;
    transform: translate(0, -10px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes scale-icon {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.wz-select {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-select :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-select :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-select {
  color: var(--content_default, #202124);
  display: flex;
  flex-direction: column;
  font-size: var(--wz-select-font-size, 14px);
  min-width: 112px;
  position: relative;
  width: inherit;
}
.wz-select.mobile {
  font-size: 16px;
}
.wz-select.mobile .select-box {
  height: 48px;
}
.wz-select.disabled .select-box {
  color: var(--disabled_text, #b7babf);
  cursor: not-allowed;
}
.wz-select .selected-value {
  margin-inline-end: var(--space-always-m, 16px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wz-select select {
  display: none;
}
.wz-select .select-box {
  background-color: var(--background_variant, #f2f4f7);
  border-radius: 6px 6px 6px 6px;
  box-sizing: border-box;
  cursor: pointer;
  height: var(--wz-select-height, 40px);
  padding-inline-end: var(--space-always-m, 16px);
  padding-inline-start: var(--space-always-s, 12px);
  position: relative;
  width: 100%;
}
.wz-select .select-box::after {
  border-bottom: 2px solid var(--primary, #0099ff);
  content: "";
  inset-inline-start: 0;
  position: absolute;
  transition: width 80ms cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 0;
}
.wz-select .select-box:focus {
  outline: none;
}
.wz-select .select-wrapper {
  max-width: inherit;
  min-width: inherit;
  position: relative;
  transform: translate(0, 0);
}
.wz-select .selected-value-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
}
.wz-select .selected-value-wrapper svg {
  fill: var(--content_p2, #55595e);
  flex-shrink: 0;
  transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  user-select: none;
}
.wz-select.expanded {
  z-index: 1000;
}
.wz-select.expanded .select-box {
  border-radius: 6px 6px 0 0;
}
.wz-select.expanded .select-box::after {
  transition: width 150ms cubic-bezier(0.14, 0.77, 0.41, 1);
  width: 100%;
}
.wz-select.expanded .selected-value-wrapper svg {
  transform: rotate(180deg);
}
.wz-select .options-wrapper {
  position: relative;
}
.wz-select label {
  color: var(--content_default, #202124);
  margin-bottom: var(--wz-label-margin, var(--space-xs, 8px));
}
.wz-select .success-text {
  animation-duration: 0.24s;
  animation-name: drop-in;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  color: var(--safe_variant, #118742);
  font-size: 12px;
  padding: var(--space-xxs, 4px) var(--space-always-m, 16px) 0 var(--space-always-m, 16px);
}
.wz-select .error-text {
  animation-duration: 0.24s;
  animation-name: drop-in;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  color: var(--alarming_variant, #e42828);
  font-size: 12px;
  padding: var(--space-xxs, 4px) var(--space-always-m, 16px) 0 var(--space-always-m, 16px);
}
.wz-select .success-icon {
  animation-duration: 0.24s;
  animation-name: scale-icon;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  align-self: center;
  bottom: 0;
  display: initial;
  font-size: 24px;
  margin-inline-start: calc(100% - var(--space-always-xxxl, 64px));
  margin-top: calc(var(--space-s, 12px) * -1);
  position: absolute;
  top: 50%;
  z-index: 1;
  fill: var(--safe_variant, #118742);
}
.wz-select .error-icon {
  animation-duration: 0.24s;
  animation-name: scale-icon;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  align-self: center;
  bottom: 0;
  display: initial;
  font-size: 24px;
  margin-inline-start: calc(100% - var(--space-always-xxxl, 64px));
  margin-top: calc(var(--space-s, 12px) * -1);
  position: absolute;
  top: 50%;
  z-index: 1;
  fill: var(--alarming_variant, #e42828);
}
.wz-select.has-success .select-box::after {
  border-color: var(--safe_variant, #118742);
}
.wz-select.has-success .selected-value {
  margin-inline-end: var(--space-always-xxl, 40px);
}
.wz-select.has-error .select-box::after {
  border-color: var(--alarming_variant, #e42828);
}
.wz-select.has-error .selected-value {
  margin-inline-end: var(--space-always-xxl, 40px);
}

:host {
  /**
   * @prop --wz-menu-max-height
   * @prop --wz-menu-max-width
   * @prop --wz-select-height
   * @prop --wz-select-font-size
   */
  width: inherit;
}

.disabled wz-label {
  color: var(--disabled_text, #b7babf);
}

wz-menu {
  --wz-menu-max-width: var(--wz-select-menu-max-width, 100%);
  --wz-menu-min-width: 100%;
  --wz-menu-upper-menu-bottom: calc(var(--wz-select-height, 40px) + 10px);
  display: block;
  max-width: var(--wz-select-menu-max-width, 100%);
  position: relative;
  top: var(--space-xxs, 4px);
  z-index: 1;
}

.wz-select select {
  display: block;
  font-size: 16px; /* disable iOS auto zoom */
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```
