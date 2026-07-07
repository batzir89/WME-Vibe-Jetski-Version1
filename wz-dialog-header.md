# `wz-dialog-header` Component Specification

This document provides the specification for the Waze Styleguide `wz-dialog-header` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-dialog-header`
**Encapsulation:** `shadow`

### Properties
*No exposed properties.*

### Slots
| Slot | Description |
| :--- | :--- |
| `component's children` |  |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("div", { key: '120d4937b5dc44f911fdccabca0c33108c7670aa', class: "wz-dialog-header" }, h("slot", { key: 'd73613f43d4a60b01c8ad8e283fd031a786b0ba5' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-dialog-header {
  font-family: var(--wz-font-family, Waze Boing, Waze Boing HB, Rubik, sans-serif);
}
.wz-dialog-header :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-dialog-header :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-dialog-header {
  display: block;
  font-weight: var(--wz-font-weight, 500);
}
.wz-dialog-header :lang(vi) {
  font-weight: var(--wz-font-weight, 600);
}
.wz-dialog-header {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: var(--space-m, 16px);
  min-height: 24px;
  padding-left: var(--wz-dialog-padding, var(--space-always-l, 24px));
  padding-right: var(--wz-dialog-padding, var(--space-always-l, 24px));
}
.wz-dialog-header ::slotted(i) {
  clear: both;
  color: var(--content_p1, #55595e);
  font-size: 32px;
  margin-bottom: 15px;
}
```
