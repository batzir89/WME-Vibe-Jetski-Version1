# `wz-header-branding` Component Specification

This document provides the specification for the Waze Styleguide `wz-header-branding` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-header-branding`
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
        return (h("div", { key: '9a3bf6bece58ebac1a0981b8b715aad981707990', class: "wz-header-branding" }, h("slot", { key: 'ab54e1330e66cf2850789684f4470b59a9487a20' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-header-branding {
  height: 28px;
  line-height: 28px;
  max-width: 256px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
