# `wz-dialog-content` Component Specification

This document provides the specification for the Waze Styleguide `wz-dialog-content` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-dialog-content`
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
        const hostClass = {
            mobile: isMobileDevice(),
            [CAN_SCROLL_UP_CLASS_NAME]: this.canScrollUp,
            [CAN_SCROLL_DOWN_CLASS_NAME]: this.canScrollDown,
        };
        return (h(Host, { key: '6fed871ff232436ee56fbe30fe9082d10d50c5a2', class: hostClass }, h("div", { key: 'b82d8af0d0fa93f7c27ea2c03fa9914483056640', class: "wz-dialog-content" }, h("slot", { key: '25cc289cefcfa74dea2c989f09f18eaf58c7d5d0' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-dialog-content {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-dialog-content :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-dialog-content :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-dialog-content {
  color: var(--content_p2, #55595e);
  font-size: 14px;
  line-height: 20px;
  padding-left: var(--wz-dialog-padding, var(--space-always-l, 24px));
  padding-right: var(--wz-dialog-padding, var(--space-always-l, 24px));
}

:host {
  flex-grow: 1;
  overflow-y: auto;
}
:host::-webkit-scrollbar {
  width: 8px;
}
:host::-webkit-scrollbar-track {
  background: transparent;
}
:host::-webkit-scrollbar-thumb {
  background: var(--hairline_strong);
  border-radius: 5px;
}

:host(.can-scroll-up) {
  border-top: 1px solid var(--hairline);
}

:host(.can-scroll-down) {
  border-bottom: 1px solid var(--hairline);
}

:host(.mobile) {
  flex-grow: 1;
  overflow-y: auto;
}
```
