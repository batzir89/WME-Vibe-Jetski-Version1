# `wz-body1` Component Specification

This document provides the specification for the Waze Styleguide `wz-body1` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-body1`
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
        return renderWazeText();
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
:host :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
:host :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
:host {
  font-weight: 400;
  font-size: 16px;
  letter-spacing: var(--wz-letter-spacing, 0.5px);
  line-height: 24px;
}
:host ::slotted(i.w-icon) {
  vertical-align: middle;
}
```
