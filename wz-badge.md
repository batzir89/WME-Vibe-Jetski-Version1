# `wz-badge` Component Specification

This document provides the specification for the Waze Styleguide `wz-badge` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-badge`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `"blue" \| "green" \| "grey" \| "light-green" \| "orange" \| "purple" \| "red" \| "yellow"` | `"grey"` | The color of the badge dot. Can be one of the following: 'grey' | 'red' | 'yellow' | 'green' | 'lightGreen' | 'blue' | 'purple' | 'orange' |
| `emphasized` | `boolean` | `false` | Whether the badge is emphasized. |
| `hasDot` | `boolean` | `false` | Whether the badge shows a dot icon. |
| `size` | `"md" \| "sm"` | `"md"` | The size of the badge. Can be one of the following: 'sm' | 'md' |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const preBadgeSlot = this.renderDotPart();
        const componentClass = {
            "wz-badge": true,
            emphasized: this.emphasized,
            [getBadgeClassByColor(this.color)]: true,
            [getBadgeClassBySize(this.size)]: true,
        };
        return (h("div", { key: 'f0d6d338ffd67842d30aae55e0c11401553e0603', class: componentClass }, preBadgeSlot, h("span", { key: '033cc49fcd87005513e5413fee4a9f81fcf10dae', class: "text" }, h("slot", { key: '596de0aabf779daa4dd462510e9d3c24600dc124' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-badge {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-badge :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-badge :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-badge {
  align-items: center;
  background-color: var(--background_default, #ffffff);
  border: 1px solid var(--hairline, #d5d7db);
  border-radius: 4px;
  color: var(--content_p2, #55595e);
  display: inline-flex;
  line-height: 16px;
  max-width: 230px;
  padding: 0 var(--space-always-xs, 8px);
}
.wz-badge.emphasized {
  background-color: var(--content_p2, #55595e);
  border-color: var(--content_p2, #55595e);
  color: var(--on_primary, #ffffff);
}
.wz-badge .dot-icon {
  border-radius: 8px;
  margin-inline-end: var(--space-always-xs, 8px);
  min-height: 8px;
  min-width: 8px;
  position: relative;
}
.wz-badge .text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wz-badge.sm {
  font-size: 11px;
  height: 18px;
}
.wz-badge.md {
  font-size: 12px;
  height: 24px;
}
.wz-badge.grey .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--content_p3, #72767d));
}
.wz-badge.red .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--alarming_variant, #e42828));
}
.wz-badge.yellow .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--cautious, #ffc400));
}
.wz-badge.green .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--safe_variant, #118742));
}
.wz-badge.light-green .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--safe, #1bab50));
}
.wz-badge.blue .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--primary_variant, #0075e3));
}
.wz-badge.purple .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--promotion_variant, #842feb));
}
.wz-badge.orange .dot-icon {
  background-color: var(--wz-badge-dot-color, var(--cautious_variant, #e37400));
}

/**
  * @prop --wz-badge-dot-color
  */
:host {
  display: flex;
}
:host ::slotted(i) {
  margin-inline-end: var(--space-always-xxs, 4px);
  vertical-align: middle;
}
```
