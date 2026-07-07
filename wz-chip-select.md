# `wz-chip-select` Component Specification

This document provides the specification for the Waze Styleguide `wz-chip-select` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-chip-select`
**Encapsulation:** `shadow`

### Properties
*No exposed properties.*

### Slots
*No slots defined.*

### Events
- `chipSelected`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '91579affe770d7ecd36993ee6c58ee1a00cf0bc0' }, h("slot", { key: 'e735f5b130cf597f65d5950033fb78e53b821878' })));
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
