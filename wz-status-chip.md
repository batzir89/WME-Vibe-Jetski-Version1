# `wz-status-chip` Component Specification

This document provides the specification for the Waze Styleguide `wz-status-chip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-status-chip`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `"green" \| "grey" \| "outline" \| "red" \| "yellow"` | `"outline"` | The color of the chip. (default: grey) Can be one of the following: 'grey' | 'red' | 'yellow' | 'green' | 'outline' |
| `hasDot` | `boolean` | `false` | Whether the chip shows a dot icon. |
| `isDragging` | `boolean` | `false` | Whether the chip is currently being dragged. |
| `size` | `"lg" \| "md" \| "sm"` | `"md"` | The size of the chip. (default: md) Can be one of the following: 'sm' | 'md' | 'lg' |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-chip": true,
            [getChipClassByColor(this.color)]: true,
            [getChipClassBySize(this.size)]: true,
            dragged: this.isDragging,
        };
        const preChipSlot = renderPreChipDomPart(this.hasDot, this.size, false);
        return (h("div", { key: 'd3bcc93846eb77648d689d3b53278658f9542d84', tabIndex: 0, class: componentClass }, preChipSlot, h("span", { key: '47402f03693df831e0811da9ffe198703eb75f69', class: "text" }, h("slot", { key: '41c29c4baa5008c02ec4dbd7ff7c4793f6f65d1d' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-chip.grey {
  --wz-chip-dot-color: #202124;
  --wz-chip-hover-background-color: rgba(32, 33, 36, 0.04);
  --wz-chip-focus-background-color: rgba(32, 33, 36, 0.12);
  --wz-chip-active-background-color: rgba(32, 33, 36, 0.1);
  --wz-chip-dragged-background-color: rgba(32, 33, 36, 0.1);
}

.wz-chip.green {
  --wz-chip-dot-color: #118742;
  --wz-chip-hover-background-color: rgba(17, 135, 66, 0.04);
  --wz-chip-focus-background-color: rgba(17, 135, 66, 0.12);
  --wz-chip-active-background-color: rgba(17, 135, 66, 0.1);
  --wz-chip-dragged-background-color: rgba(17, 135, 66, 0.1);
}

.wz-chip.yellow {
  --wz-chip-dot-color: #e37400;
  --wz-chip-hover-background-color: rgba(227, 116, 0, 0.04);
  --wz-chip-focus-background-color: rgba(227, 116, 0, 0.12);
  --wz-chip-active-background-color: rgba(227, 116, 0, 0.1);
  --wz-chip-dragged-background-color: rgba(227, 116, 0, 0.1);
}

.wz-chip.red {
  --wz-chip-dot-color: #e42828;
  --wz-chip-hover-background-color: rgba(228, 40, 40, 0.04);
  --wz-chip-focus-background-color: rgba(228, 40, 40, 0.12);
  --wz-chip-active-background-color: rgba(228, 40, 40, 0.1);
  --wz-chip-dragged-background-color: rgba(228, 40, 40, 0.1);
}

.wz-chip {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-chip :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-chip :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-chip {
  --smChipHeight: 18px;
  --mdChipHeight: 24px;
  --lgChipHeight: 32px;
  align-items: center;
  background-color: var(--wz-chip-background-color, var(--background_default, white));
  border: 1px solid var(--wz-chip-border-color, var(--hairline, #d5d7db));
  box-sizing: border-box;
  color: var(--wz-chip-color, var(--content_default, #202124));
  display: inline-flex;
  gap: var(--space-always-xxs, 4px);
  max-width: 200px;
  padding: 0 var(--space-always-xs, 8px);
  vertical-align: top;
}
.wz-chip:not(.immutable) {
  cursor: pointer;
}
.wz-chip:not(.immutable):hover {
  background-color: var(--wz-chip-hover-background-color, var(--ink_on_primary_hovered, rgba(32, 33, 36, 0.04)));
  border: 1px solid var(--wz-chip-hover-border-color, var(--hairline, #d5d7db));
}
.wz-chip:not(.immutable):focus-visible {
  background-color: var(--wz-chip-hover-background-color, var(--ink_on_primary_hovered, rgba(32, 33, 36, 0.04)));
  border: 1px solid var(--wz-chip-focus-border-color, var(--hairline, #d5d7db));
  outline: 0;
}
.wz-chip:not(.immutable):active {
  background-color: var(--wz-chip-active-background-color, var(--surface_alt, #e5f6ff));
  border: 1px solid var(--wz-chip-active-border-color, var(--primary, #0099ff));
}
.wz-chip:not(.immutable).checked, .wz-chip:not(.immutable).highlighted {
  background-color: var(--wz-chip-checked-background-color, var(--surface_alt, #e5f6ff));
  border: 1px solid var(--wz-chip-checked-border-color, var(--primary, #0099ff));
  color: var(--wz-chip-checked-color, var(--content_default, #202124));
}
.wz-chip:not(.immutable).checked:hover, .wz-chip:not(.immutable).highlighted:hover {
  background-image: linear-gradient(0deg, var(--ink_on_primary_hovered, rgba(32, 33, 36, 0.04)), var(--ink_on_primary_hovered, rgba(32, 33, 36, 0.04)));
}
.wz-chip:not(.immutable).checked:focus-visible, .wz-chip:not(.immutable).highlighted:focus-visible {
  background-image: linear-gradient(0deg, var(--ink_on_primary_focused, rgba(32, 33, 36, 0.12)), var(--ink_on_primary_focused, rgba(32, 33, 36, 0.12)));
}
.wz-chip ::slotted([slot=icon]) {
  font-size: var(--chip-icon-size, 18px);
  width: var(--chip-icon-size, 18px);
}
.wz-chip ::slotted([slot=trailing-icon]) {
  font-size: var(--chip-trailing-icon-size, 18px);
  width: var(--chip-trailing-icon-size, 18px);
}
.wz-chip .leading-icon {
  display: flex;
  justify-content: center;
  margin: auto;
}
.wz-chip .dot-icon {
  background-color: var(--wz-chip-dot-color, #3c4043);
  border-radius: 7px;
  min-height: 7px;
  min-width: 7px;
  position: relative;
}
.wz-chip .text {
  margin: 0 var(--space-always-xxs, 4px);
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wz-chip .remove-icon {
  color: var(--content_p3, #72767d);
}
.wz-chip .remove-icon svg {
  vertical-align: top;
}
.wz-chip.checked, .wz-chip.highlighted {
  background-color: var(--wz-chip-checked-background-color, var(--surface_alt, #e5f6ff));
  border: 1px solid var(--wz-chip-checked-border-color, var(--primary, #0099ff));
  color: var(--wz-chip-checked-color, var(--content_default, #202124));
}
.wz-chip.sm {
  border-radius: var(--smChipHeight);
  font-size: 11px;
  font-weight: 500;
  height: var(--smChipHeight);
}
.wz-chip.md {
  --chipAvatarSize: calc(var(--mdChipHeight) - 6px);
  border-radius: var(--mdChipHeight);
  font-size: 12px;
  font-weight: 500;
  height: var(--mdChipHeight);
}
.wz-chip.md.with-avatar {
  padding: var(--space-always-xxxs, 2px);
  padding-inline-end: var(--space-always-xs, 8px);
}
.wz-chip.md .leading-icon {
  height: 12px;
  width: 12px;
}
.wz-chip.lg {
  --chipAvatarSize: calc(var(--lgChipHeight) - 6px);
  border-radius: var(--lgChipHeight);
  font-size: 14px;
  font-weight: 400;
  height: var(--lgChipHeight);
}
.wz-chip.lg.with-avatar {
  padding: var(--space-always-xxxs, 2px);
  padding-inline-end: var(--space-always-xs, 8px);
}
.wz-chip.lg .leading-icon {
  height: 18px;
  width: 18px;
}
.wz-chip .chip-avatar {
  background-position: center;
  background-size: var(--chipAvatarSize);
  border-radius: 50%;
  height: var(--chipAvatarSize);
  width: var(--chipAvatarSize);
}
.wz-chip.only-icons {
  justify-content: center;
  min-width: 34px;
  padding: 0 var(--space-always-xs, 8px);
}
.wz-chip.only-icons.lg {
  min-width: 42px;
  padding: 0 var(--space-always-s, 12px);
}
.wz-chip.disabled {
  background-color: var(--background_default, #ffffff);
  border: 1px solid var(--hairline, #d5d7db);
  color: var(--disabled_text, #b7babf);
  cursor: not-allowed;
}
.wz-chip.disabled.checked, .wz-chip.disabled:active {
  background-color: var(--wz-chip-checked-background-color, var(--surface_variant, #e8eaed));
}
.wz-chip.disabled svg {
  color: var(--disabled_text, #b7babf);
}
.wz-chip.dragged {
  background-color: var(--wz-chip-dragged-background-color, var(--surface_alt, #e5f6ff));
  border: 1px solid var(--wz-chip-dragged-border-color, var(--primary, #0099ff));
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  cursor: grabbing;
}
.wz-chip.error {
  color: var(--alarming_variant, #e42828);
}
.wz-chip.error svg {
  color: var(--alarming_variant, #e42828);
}

:host {
  display: inline-block;
}
```
