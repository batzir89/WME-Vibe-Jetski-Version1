# `wz-breadcrumbs` Component Specification

This document provides the specification for the Waze Styleguide `wz-breadcrumbs` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-breadcrumbs`
**Encapsulation:** `shadow`
**Dependencies:** `wz-body2`

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
        return (h("wz-body2", { key: '5b5fdea20c7a8e999cbcc5e73b5a1ad89f62b1d4', class: "wz-breadcrumbs" }, h("slot", { key: '72b673d4353289a38a4e99eee0abf8efa5f8eb52' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-breadcrumbs {
  align-items: center;
  color: var(--content_p2, #55595e);
  display: inline-flex;
}

:host {
  display: inline-block;
}
```
