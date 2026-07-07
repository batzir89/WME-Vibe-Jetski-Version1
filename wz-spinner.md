# `wz-spinner` Component Specification

This document provides the specification for the Waze Styleguide `wz-spinner` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-spinner`
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
        return (h("svg", { key: 'c6eea6b723a00ab695269ca909828ce7fcf33f07', viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '380a3325399e2a85b278eb59fe2de81b5736367a', d: "m8 0 .117.007A1 1 0 0 1 8 2a6 6 0 1 0 6 6l.007-.117A1 1 0 0 1 16 8a8 8 0 1 1-8-8z" })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
:host {
  /**
  * @prop --wz-spinner-size
  */
}
:host svg {
  animation: rotate 0.7s infinite linear;
  display: block;
  fill: currentColor;
  height: var(--wz-spinner-size, 16px);
  width: var(--wz-spinner-size, 16px);
}
```
