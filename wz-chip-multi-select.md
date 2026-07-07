# `wz-chip-multi-select` Component Specification

This document provides the specification for the Waze Styleguide `wz-chip-multi-select` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-chip-multi-select`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxSelected` | `number` | `1` | The maximum amount of chips that can be simultaneously selected. |

### Slots
*No slots defined.*

### Events
- `chipSelected`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '4b080eb27b960f12052fd2c52069368721f4b766' }, h("slot", { key: '97c4b23174192a60a3d33157e15376e9b43a2cc3' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: inline-block;
}
:host ::slotted(wz-checkable-chip),
:host ::slotted(wz-chip-select),
:host ::slotted(wz-image-chip),
:host ::slotted(wz-status-chip) {
  margin-bottom: var(--space-xs, 8px);
}
```
