# `wz-list` Component Specification

This document provides the specification for the Waze Styleguide `wz-list` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-list`
**Encapsulation:** `shadow`

### Properties
*No exposed properties.*

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '526a25aa59bf1adc5d0532732d216cb148184fff' }, h("slot", { key: 'ff24ac6dfcf32e271e6098f42d639f7f2c8bf255' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  background-color: var(--background_default, #ffffff);
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  padding: 0 var(--space-always-m, 16px);
  width: 100%;
}

::slotted(wz-list-item:not(:last-child)) {
  border-bottom: 1px solid var(--separator_default, #e8eaed);
}
```
