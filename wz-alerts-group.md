# `wz-alerts-group` Component Specification

This document provides the specification for the Waze Styleguide `wz-alerts-group` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-alerts-group`
**Encapsulation:** `shadow`
**Dependencies:** `wz-alert-pagination`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiline` | `boolean` | `false` | Whether the grouped alerts should be rendered multilined |

### Slots
| Slot | Description |
| :--- | :--- |
| `component's children` | Single or multiple wz-alert components |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        if (this.alerts.length <= 1) {
            return h("slot", null);
        }
        return (h("div", { class: { "wz-alerts-group": true, multiline: this.multiline } }, h("div", { class: "header" }, this.renderVariantIcon(), h("wz-alert-pagination", { currentPage: this.currentIndex + 1, totalPages: this.alerts.length })), h("div", { class: "content" }, h("slot", null))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-alerts-group {
  align-items: center;
  background-color: var(--background_variant, #f2f4f7);
  border: 1px solid var(--separator_default, #e8eaed);
  border-radius: 4px;
  color: var(--content_default, #000000);
  display: flex;
  gap: var(--space-always-xs, 8px);
  justify-content: space-between;
  padding: var(--space-xs, 8px) var(--space-always-xs, 8px);
}
.wz-alerts-group svg {
  vertical-align: top;
}
.wz-alerts-group .header {
  align-items: center;
  display: flex;
  gap: var(--space-always-s, 12px);
}
.wz-alerts-group .content {
  flex-grow: 1;
}
.wz-alerts-group.multiline {
  align-items: stretch;
  flex-direction: column;
  gap: var(--space-always-xxs, 4px);
}
.wz-alerts-group.multiline .header {
  gap: var(--space-always-xxs, 4px);
}
```
