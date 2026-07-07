# `wz-carousel-item` Component Specification

This document provides the specification for the Waze Styleguide `wz-carousel-item` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-carousel-item`
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
        return (h(Host, { key: '0f5c92383f1b666b86dc43ee34f5850920a2d307' }, h("div", { key: '37d5919185efa596d1e09f85ecc930d65dd5fcf8', class: "carousel-item-container" }, h("slot", { key: 'e6832fe646078d1f0bb15387e0eca21bdd7502cf' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: block;
  height: 100%;
  width: 100%;
}
:host .carousel-item-container {
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
```
