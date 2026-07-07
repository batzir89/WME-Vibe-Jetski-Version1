# `wz-dialog-controls` Component Specification

This document provides the specification for the Waze Styleguide `wz-dialog-controls` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-dialog-controls`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layout` | `"horizontal" \| "horizontal-reverse" \| "vertical"` | `"horizontal-reverse"` | Layout for the dialog controls. If using "vertical" and the controls are of type Wz-Button, They will render full width by default. |

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
        return (h("div", { key: 'e3f3eaa187b8e9dedfa4f80e884716f2e486a89f', class: "wz-dialog-controls" }, h("slot", { key: 'c3bd57e508fbe7f84b3948461a89715d9000f7b6' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-dialog-controls {
  display: flex;
  flex-direction: row-reverse;
  gap: var(--space-s, 12px);
  margin-top: var(--space-xl, 32px);
  padding-left: var(--wz-dialog-padding, var(--space-always-l, 24px));
  padding-right: var(--wz-dialog-padding, var(--space-always-l, 24px));
}

:host([layout=horizontal]) .wz-dialog-controls {
  flex-direction: row;
  gap: var(--space-always-s, 12px);
  justify-content: flex-end;
}

:host([layout=vertical]) .wz-dialog-controls {
  flex-direction: column;
}
:host([layout=vertical]) .wz-dialog-controls ::slotted(wz-button) {
  width: 100%;
}
```
