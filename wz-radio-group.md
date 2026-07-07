# `wz-radio-group` Component Specification

This document provides the specification for the Waze Styleguide `wz-radio-group` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-radio-group`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layout` | `"horizontal" \| "vertical"` | `"horizontal"` | The direction of the radio buttons either 'horizontal' or 'vertical' |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const className = {
            "wz-radio-group": true,
            [getLayoutClassName(this.layout)]: true,
        };
        return (h("div", { key: 'ca01be76e456d592e72f8597fe28cc467e92151e', class: className }, h("slot", { key: 'e9660f173640b1c56135ad46a2f155da2c59ad2d' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host(wz-radio-group) {
  display: block;
}
:host(wz-radio-group) .wz-radio-group {
  --wz-radio-button-margin: 0 var(--space-always-s, 12px);
  display: flex;
  flex-direction: row;
}
:host(wz-radio-group) .wz-radio-group.vertical {
  --wz-radio-button-margin: inherit;
  display: flex;
  flex-direction: column;
}
```
