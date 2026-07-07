# `wz-checkbox` Component Specification

This document provides the specification for the Waze Styleguide `wz-checkbox` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-checkbox`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Whether this checkbox is true or false |
| `disabled` | `boolean` | `false` | Whether this checkbox is disabled or not |
| `hasError` | `boolean` | `false` | Whether this checkbox has an error |
| `indeterminate` | `boolean` | `false` | Whether this checkbox is indeterminate read more at: go/indeterminate-checkbox |
| `name` | `string` | `""` | The checkbox element name. |
| `value` | `string` | `"on"` | The checkbox element value. Defaults to "on" to be compatible with native checkbox specs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox "If the value attribute was omitted, the default value for the checkbox is on" |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const { el, value, name } = this;
        const parentForm = this.el.closest("FORM");
        if (parentForm) {
            renderHtmlCheckboxOutsideShadowRoot(el, name, value, this.checked);
        }
        const componentClass = {
            "has-error": this.hasError,
            "wz-checkbox": true,
            disabled: this.disabled,
            mobile: isMobileDevice(),
        };
        return (h("span", { key: 'f498fe413921a1762644f0a8393ccc4e9db16d70', tabIndex: 0 }, h("label", { key: '89291efbd754ce1839a796acbc01a4273654444f', class: componentClass, tabIndex: -1 }, h("input", { key: '00e4c228e7dde2806534decc14cf97d46d83c4d3', type: "checkbox", disabled: this.disabled, checked: this.checked, name: name, value: value,
            // eslint-disable-next-line react/no-unknown-property
            indeterminate: this.indeterminate }), h("div", { key: '2f459f84a0f48dcf01875478b8c7e2abf4400121', class: "border" }, h("div", { key: '0f51fd9b31b385b1ee79a1157a13cb35aa190fc2', class: "fill" }), h("div", { key: '91c1fa9bb51e498cb7acf2d18cd363c8ecdc232a', class: "mask" }), this.getInnerIcon()), h("slot", { key: 'a61426529fcb9eb897621ef5c40ec782c8e73053' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-checkbox {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  min-height: 24px;
  outline: none;
  user-select: none;
}
.wz-checkbox svg {
  position: absolute;
  stroke: var(--on_primary, #ffffff);
  stroke-width: 2;
}
.wz-checkbox input[type=checkbox] {
  display: none;
  height: 0;
  opacity: 0;
  width: 0;
}
.wz-checkbox .border {
  border: 2px solid var(--hairline_strong, #90959c);
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  height: 18px;
  margin-inline-end: var(--wz-checkbox-margin, var(--space-always-s, 12px));
  position: relative;
  width: 18px;
}
.wz-checkbox .fill {
  background: var(--primary_variant, #0075e3);
  height: 100%;
  position: absolute;
  width: 100%;
}
.wz-checkbox .fill::before {
  display: none !important;
  height: 100%;
  line-height: 14px;
  position: absolute;
  text-indent: -1px;
  width: 100%;
}
.wz-checkbox .mask {
  background: var(--background_default, #ffffff);
  clip-path: circle(10px at center);
  height: 100%;
  position: absolute;
  transition: 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 100%;
}
.wz-checkbox slot,
.wz-checkbox .label {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-checkbox slot :lang(vi),
.wz-checkbox .label :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-checkbox slot :lang(th),
.wz-checkbox .label :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-checkbox slot,
.wz-checkbox .label {
  color: var(--content_default, #202124);
  font-weight: normal;
  -webkit-transition: 0.25s;
  transition: 0.25s;
}
.wz-checkbox.has-error {
  --checkbox-error-color: var(--alarming_variant, #e42828);
}
.wz-checkbox.has-error .border {
  border-color: var(--checkbox-error-color);
}
.wz-checkbox.has-error input:checked + .border {
  background-color: var(--checkbox-error-color);
  border-color: var(--checkbox-error-color);
}
.wz-checkbox.has-error slot,
.wz-checkbox.has-error .label {
  color: var(--alarming_variant, #e42828);
}
.wz-checkbox.has-error .fill, .wz-checkbox.has-error.checked .fill {
  background-color: var(--checkbox-error-color);
}
.wz-checkbox input:indeterminate + .border,
.wz-checkbox input:checked + .border {
  background-color: var(--primary_variant, #0075e3);
  border: 2px solid var(--primary_variant, #0075e3);
}
.wz-checkbox input:indeterminate + .border .mask,
.wz-checkbox input:checked + .border .mask {
  clip-path: circle(0 at center);
}
.wz-checkbox input:disabled + .border {
  background-color: var(--hairline, #d5d7db);
  border-color: var(--hairline, #d5d7db);
}
.wz-checkbox input:disabled + .border .fill {
  background-color: var(--hairline, #d5d7db);
  color: var(--disabled_text, #b7babf);
}
.wz-checkbox input:disabled + .border + .label, .wz-checkbox input:disabled + .border + slot {
  color: var(--disabled_text, #b7babf);
}
.wz-checkbox.mobile {
  font-size: 16px;
}
.wz-checkbox.mobile i.w-icon {
  font-size: 14px;
}
.wz-checkbox.disabled {
  cursor: not-allowed;
}
```
