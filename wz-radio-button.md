# `wz-radio-button` Component Specification

This document provides the specification for the Waze Styleguide `wz-radio-button` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-radio-button`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Whether this radio button is Checked or not |
| `disabled` | `boolean` | `false` | Whether this radio button is disabled or not |
| `hasError` | `boolean` | `false` | Whether this radio button has an error or not |
| `name` | `string` | `""` | The name of the radio button group |
| `value` | `string` | `""` | The value of the radio button |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const { el, value, name, hasError, disabled, checked } = this;
        const parentForm = this.el.closest("FORM");
        if (parentForm) {
            renderHtmlRadioOutsideShadowRoot(el, name, value, checked);
        }
        const componentClass = {
            "has-error": hasError,
            "wz-radio": true,
            disabled: this.disabled,
            mobile: isMobileDevice(),
        };
        return (h("span", { key: '71bcbcc3db709e56bb0c0f44e054bdbcec4522f0', tabIndex: 0 }, h("label", { key: '043b89aa16e5a92dc32707882eec0f8329bfd01b', class: componentClass, tabIndex: -1 }, h("input", { key: '7d3d2f19ba4557f1bcafb665a6decdb3e4e42f7d', type: "radio", name: name, disabled: disabled, checked: checked, value: value }), h("span", { key: 'a8da03b1301aeba9c1026a40025df326408922a7', class: "radio-button" }), h("span", { key: 'c61e6089bad6ebb6f5e200536e250bcbc4ec5e3a', class: "radio-label" }, h("slot", { key: 'e6eaad944e70dd8275fcf3894c9157a15615d28e' })))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-radio {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-radio :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-radio :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-radio {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  min-height: 24px;
  outline: none;
  user-select: none;
}
.wz-radio.mobile {
  font-size: 16px;
}
.wz-radio.mobile i.w-icon {
  font-size: 14px;
}
.wz-radio input[type=radio] {
  display: none;
}
.wz-radio input[type=radio] + .radio-button {
  background-color: var(--background_default, #ffffff);
  border: 2px solid var(--hairline_strong, #90959c);
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  height: 18px;
  padding: var(--space-xxxs, 2px) var(--space-always-xxxs, 2px);
  position: relative;
  transition: 0.25s;
  width: 18px;
}
.wz-radio input[type=radio] + .radio-button + .radio-label {
  color: var(--content_default, #202124);
  margin-inline-start: var(--space-always-s, 12px);
}
.wz-radio input[type=radio]:checked + .radio-button {
  background-color: var(--background_default, #ffffff);
  border-color: var(--primary_variant, #0075e3);
}
.wz-radio input[type=radio]:checked + .radio-button::after {
  background-color: var(--primary_variant, #0075e3);
  display: block;
}
.wz-radio input[type=radio] + .radio-button::after {
  background-color: var(--background_default, #ffffff);
  border-radius: 50%;
  content: "";
  height: 10px;
  margin: auto;
  position: relative;
  transition: 0.25s;
  width: 10px;
}
.wz-radio input[type=radio]:disabled + .radio-button {
  border-color: var(--hairline, #d5d7db);
}
.wz-radio input[type=radio]:disabled + .radio-button + .radio-label {
  color: var(--disabled_text, #b7babf);
}
.wz-radio input[type=radio]:disabled:checked + .radio-button::after {
  background-color: var(--disabled_text, #b7babf);
}
.wz-radio.has-error {
  --wz-radio-button-error-color: var(--alarming_variant, #e42828);
}
.wz-radio.has-error input[type=radio] + .radio-button {
  border-color: var(--wz-radio-button-error-color);
}
.wz-radio.has-error input[type=radio] + .radio-button + .radio-label {
  color: var(--wz-radio-button-error-color);
}
.wz-radio.has-error input[type=radio]:checked + .radio-button::after {
  background-color: var(--wz-radio-button-error-color);
}
.wz-radio.disabled {
  cursor: not-allowed;
}

label.wz-radio {
  margin: var(--wz-radio-button-margin, var(--space-xs, 8px) 0);
}
```
