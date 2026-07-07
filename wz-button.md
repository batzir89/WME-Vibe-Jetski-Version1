# `wz-button` Component Specification

This document provides the specification for the Waze Styleguide `wz-button` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-button`
**Encapsulation:** `shadow`
**Dependencies:** `wz-spinner`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `active` | `boolean` | `false` | Whether this button is active or not This property applies visual effect to button and is currently implemented only for button color "clear-icon" |
| `alarming` | `boolean` | `false` | Whether this button is alarming or not |
| `busy` | `boolean` | `false` | Whether this button is busy or not |
| `color` | `"clear-icon" \| "primary" \| "secondary" \| "shadowed" \| "text"` | `"primary"` | The color of the button. |
| `disabled` | `boolean` | `false` | Whether this button is disabled or not |
| `name` | `string` | `""` | The name of the button. |
| `size` | `"lg" \| "md" \| "sm" \| "xs"` | `"md"` | The size of the button. |
| `type` | `"button" \| "reset" \| "submit"` | `"button"` | The type of the button. This is a native prop. Documentation can be found here: https://www.w3schools.com/tags/att_button_type.asp Can be one of the following: `button` | `submit` | `reset` |
| `value` | `string` | `""` | The value of the button. |

### Slots
| Slot | Description |
| :--- | :--- |
| `left-icon` | align the icon to the left |
| `right-icon` | align the icon to the right |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const { hasIcon, hasText } = deduceIconAndText(this.el);
        const componentClass = {
            "wz-button": true,
            [WzButton.getButtonClassByColor(this.color)]: true,
            [WzButton.getButtonClassBySize(this.size)]: true,
            [WzButton.getButtonClassByType(hasIcon, hasText)]: true,
            alarming: this.alarming,
            busy: this.busy,
            "is-active": this.active,
        };
        return (h("button", { key: 'eec03ad5a55350dec1bf1f209d3e4ecc6b3a0a26', class: componentClass, disabled: this.disabled || this.busy, type: this.type, name: this.name, value: this.value }, h("span", { key: '31048d12e719b60d6a63b9ebcb7f62396716fb5b', class: "color-layer" }), h("slot", { key: 'c4c927f36bca1423424f959e52c6c627e884d687', name: "left-icon" }), h("span", { key: '4eb18bb84379c5f6e1993cc2e752e65605eec57f', class: "button-text" }, h("slot", { key: 'bb767c61a72a8fa2f2edabf38d88402148b66fb4' })), h("slot", { key: '7845eccd6c1df894aa494e0df2bae2845ff3fe03', name: "right-icon" }), this.busy && h("wz-spinner", { key: '168ce1d3c5c69a2a9aa18b1d7a2e971f4cfb6aa9', class: "button-spinner" })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-button {
  font-family: var(--wz-font-family, Waze Boing, Waze Boing HB, Rubik, sans-serif);
}
.wz-button :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-button :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-button {
  align-items: center;
  border: var(--wz-button-border, 1px solid transparent);
  box-shadow: var(--wz-button-box-shadow, none);
  cursor: var(--wz-button-cursor, pointer);
  display: inline-flex;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.3px;
  min-width: 48px;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: unset;
  user-select: none;
  white-space: nowrap;
}
.wz-button .color-layer {
  background-color: transparent;
  height: calc(100% + 2px);
  opacity: 0.4;
  pointer-events: none;
  position: absolute;
  width: calc(100% + 2px);
}
.wz-button .button-text {
  z-index: 4;
}
.wz-button.xs {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-button.xs :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-button.xs :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-button.xs {
  border-radius: 43px;
  font-size: 10px;
  height: var(--wz-button-height, 18px);
  padding: 0 var(--space-always-xs, 8px);
}
.wz-button.xs.icon-only {
  min-width: var(--wz-button-height, 18px);
}
.wz-button.xs .icons {
  font-size: 20px;
}
.wz-button.xs .color-layer {
  border-radius: 43px;
}
.wz-button.sm {
  border-radius: 100px;
  font-size: 13px;
  height: var(--wz-button-height, var(--space-button-small, 32px));
  padding: 0 var(--space-always-s, 12px);
}
.wz-button.sm.icon-only {
  min-width: var(--wz-button-height, var(--space-button-small, 32px));
}
.wz-button.sm .icons {
  font-size: 20px;
}
.wz-button.sm .color-layer {
  border-radius: 100px;
}
.wz-button.md {
  border-radius: 100px;
  font-size: 15px;
  height: var(--wz-button-height, var(--space-button-medium, 40px));
  padding: 0 calc(var(--space-always-xxs, 4px) + var(--space-always-m, 16px));
}
.wz-button.md.icon-only {
  min-width: var(--wz-button-height, var(--space-button-medium, 40px));
}
.wz-button.md .color-layer {
  border-radius: 100px;
}
.wz-button.lg {
  border-radius: 118px;
  font-size: 17px;
  height: var(--wz-button-height, var(--space-button-large, 48px));
  padding: 0 var(--space-always-l, 24px);
}
.wz-button.lg.icon-only {
  min-width: var(--wz-button-height, var(--space-button-large, 48px));
}
.wz-button.lg .color-layer {
  border-radius: 118px;
}
.wz-button .icons {
  font-size: 24px;
}
.wz-button.primary {
  background-color: var(--wz-button-background-color, var(--primary, #0099ff));
  color: var(--on_primary, #ffffff);
}
@media (min-width: 1024px) {
  .wz-button.primary:hover .color-layer {
    background-color: #202124;
    opacity: 0.16;
  }
}
.wz-button.primary:active .color-layer {
  background-color: #202124;
  opacity: 0.2;
}
.wz-button.primary:focus-visible .color-layer, .wz-button.primary.busy .color-layer {
  background-color: #202124;
  opacity: 0.24;
}
.wz-button.primary:focus-visible:active .color-layer {
  opacity: 0.4;
}
.wz-button.primary.alarming {
  background-color: var(--alarming, #ff5252);
  color: var(--on_primary, #ffffff);
}
.wz-button.primary.alarming.busy {
  background-color: var(--alarming, #ff5252);
}
.wz-button.primary.alarming.busy .color-layer {
  background-color: var(--content_default, #202124);
  opacity: 0.1;
}
@media (min-width: 1024px) {
  .wz-button.primary.alarming:focus-visible:hover .color-layer {
    opacity: 0.4;
  }
}
.wz-button.secondary {
  background-color: var(--wz-button-background-color, var(--background_variant, #f2f4f7));
  color: var(--primary_variant, #0075e3);
}
@media (min-width: 1024px) {
  .wz-button.secondary:hover .color-layer {
    background-color: #0099ff;
    opacity: 0.04;
  }
}
.wz-button.secondary:active .color-layer {
  background-color: #0099ff;
  opacity: 0.1;
}
.wz-button.secondary:focus-visible, .wz-button.secondary.busy {
  box-sizing: border-box;
}
.wz-button.secondary:focus-visible .color-layer, .wz-button.secondary.busy .color-layer {
  background-color: #0099ff;
  opacity: 0.12;
}
.wz-button.secondary:focus-visible.icon-only, .wz-button.secondary.busy.icon-only {
  padding: 0;
}
@media (min-width: 1024px) {
  .wz-button.secondary:focus-visible:hover {
    border: 1px solid var(--primary_variant, #0075e3);
  }
}
.wz-button.secondary.alarming {
  color: var(--alarming_variant, #e42828);
}
.wz-button.secondary.alarming:is(:focus-visible, .busy, :active) .color-layer {
  background-color: var(--alarming, #ff5252);
}
@media (min-width: 1024px) {
  .wz-button.secondary.alarming:is(:hover) .color-layer {
    background-color: var(--alarming, #ff5252);
  }
}
.wz-button.secondary.alarming:focus-visible .color-layer {
  opacity: 0.04;
}
.wz-button.secondary.alarming:active .color-layer {
  opacity: 0.1;
}
@media (min-width: 1024px) {
  .wz-button.secondary.alarming:focus-visible:hover {
    border-color: var(--alarming_variant, #e42828);
  }
}
.wz-button.text {
  background-color: var(--wz-button-background-color, transparent);
  color: var(--primary_variant, #0075e3);
  height: var(--space-button-text, 24px);
  min-width: auto;
  padding: var(--space-always-xs, 8px) var(--space-always-xxs, 4px);
}
.wz-button.text .color-layer {
  background-color: var(--primary_variant, #0075e3);
  border-radius: 4px;
  opacity: 0;
}
@media (min-width: 1024px) {
  .wz-button.text:hover .color-layer {
    opacity: 0.04;
  }
}
.wz-button.text:focus-visible .color-layer {
  opacity: 0.12;
}
.wz-button.text:active .color-layer {
  opacity: 0.1;
}
.wz-button.text.alarming {
  color: var(--alarming_variant, #e42828);
}
.wz-button.text.alarming .color-layer {
  background-color: var(--alarming_variant, #e42828);
}
@media (min-width: 1024px) {
  .wz-button.text.alarming:focus-visible:hover .color-layer {
    opacity: 0.1;
  }
}
.wz-button.clear-icon {
  background-color: var(--wz-button-background-color, transparent);
  color: var(--content_p1, #3c4043);
}
.wz-button.clear-icon .color-layer {
  background-color: var(--content_p1, #3c4043);
  opacity: 0;
}
.wz-button.clear-icon.is-active {
  background-color: var(--surface_alt, #e5f6ff);
  color: var(--primary_variant, #0075e3);
}
@media (min-width: 1024px) {
  .wz-button.clear-icon:hover .color-layer {
    opacity: 0.04;
  }
}
.wz-button.clear-icon:focus-visible .color-layer {
  opacity: 0.12;
}
.wz-button.clear-icon:active .color-layer {
  opacity: 0.1;
}
.wz-button.clear-icon.alarming {
  color: var(--alarming_variant, #e42828);
}
.wz-button.clear-icon.alarming .color-layer {
  background-color: var(--alarming_variant, #e42828);
}
.wz-button.with-icon {
  padding-inline-end: var(--space-always-l, 24px);
  padding-inline-start: var(--space-always-m, 16px);
}
.wz-button.with-icon .button-text {
  align-items: center;
  display: flex;
}
.wz-button.with-icon .icons {
  margin-inline-end: var(--space-always-xs, 8px);
}
.wz-button.with-icon .color-layer {
  left: 0;
  right: 0;
}
.wz-button.icon-only {
  min-width: 40px;
  padding: 0;
}
.wz-button.icon-only .button-text {
  display: flex;
  pointer-events: none;
}
.wz-button.icon-only .icons {
  margin-inline-end: 0;
}
.wz-button:disabled.primary, .wz-button:disabled.secondary, .wz-button:disabled.shadowed {
  background-color: var(--wz-button-disabled-background-color, var(--surface_variant, #e8eaed));
  color: var(--wz-button-disabled-color, var(--disabled_text, #b7babf));
  cursor: var(--wz-button-cursor, auto);
}
.wz-button:disabled.clear-icon {
  color: var(--disabled_text, #b7babf);
  cursor: var(--wz-button-cursor, auto);
}
.wz-button:disabled:not(.busy) .color-layer {
  opacity: 0 !important;
}
.wz-button:disabled.text {
  color: var(--wz-button-disabled-color, var(--disabled_text, #b7babf));
  cursor: var(--wz-button-cursor, auto);
}
.wz-button:disabled.text .button-text {
  text-decoration: none;
}
.wz-button.busy {
  position: relative;
}
.wz-button.busy .button-spinner {
  position: absolute;
}
.wz-button.busy > :not(.button-spinner):not(.color-layer) {
  visibility: hidden;
}
.wz-button.busy.primary {
  background-color: var(--wz-button-background-color, var(--primary, #0099ff));
  color: var(--on_primary, #ffffff);
}
.wz-button.busy.secondary {
  background-color: var(--background_variant, #f2f4f7);
  color: var(--primary_variant, #0075e3);
}
.wz-button.busy.text .color-layer {
  color: var(--primary_variant, #0075e3);
  opacity: 0.12;
}
.wz-button.busy.shadowed {
  background-color: var(--background_variant, #f2f4f7);
  color: var(--primary_variant, #0075e3);
}
.wz-button.shadowed {
  background-color: var(--wz-button-background-color, #ffffff);
  border: var(--wz-button-border, 1px solid #d5d7db);
  color: var(--primary_variant, #0075e3);
}
@media (min-width: 1024px) {
  .wz-button.shadowed:hover {
    box-shadow: var(--wz-button-box-shadow, 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15));
  }
}
.wz-button.shadowed:active {
  background-color: #f2f4f7;
  box-shadow: var(--wz-button-box-shadow, 0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15));
}
.wz-button.shadowed:focus-visible, .wz-button.shadowed.busy .color-layer {
  box-shadow: var(--wz-button-box-shadow, 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15));
}
.wz-button.shadowed:focus-visible:active, .wz-button.shadowed.busy .color-layer:active {
  background-color: #f2f4f7;
  box-shadow: var(--wz-button-box-shadow, 0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15));
}
.wz-button.stretched {
  width: 100%;
}

:host {
  /**
  * @prop --wz-button-background-color
  * @prop --wz-button-disabled-background-color
  * @prop --wz-button-disabled-color
  * @prop --wz-button-box-shadow
  */
  border-radius: 40px;
  display: inline-flex;
  flex-direction: column;
}

.wz-button ::slotted(i.w-icon) {
  font-size: 24px;
}
.wz-button.sm ::slotted(i.w-icon), .wz-button.xs ::slotted(i.w-icon) {
  font-size: 20px;
}
.wz-button.tiny ::slotted(i.w-icon) {
  font-size: 18px;
}
.wz-button.with-icon .button-text ::slotted(i.w-icon) {
  margin-inline-end: var(--space-always-xxs, 4px);
}
.wz-button.with-icon ::slotted([slot=right-icon]) {
  margin-inline-start: var(--space-always-xxs, 4px);
  z-index: 4;
}
.wz-button.with-icon ::slotted([slot=left-icon]) {
  margin-inline-end: var(--space-always-xxs, 4px);
  z-index: 4;
}
```
