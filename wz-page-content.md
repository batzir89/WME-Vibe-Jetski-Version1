# `wz-page-content` Component Specification

This document provides the specification for the Waze Styleguide `wz-page-content` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-page-content`
**Encapsulation:** `shadow`

### Properties
*No exposed properties.*

### Slots
| Slot | Description |
| :--- | :--- |
| `default (no name)` | Slot for page content |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '6aff5cee4633449fce5b8836b0d4fdd26e66cfb9' }, h("slot", { key: 'dc730cad56fc41e7c34136bd5535cd7887cefaa2' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: block;
  flex: 1;
  height: 100%;
  overflow: auto;
  position: relative;
}
```
