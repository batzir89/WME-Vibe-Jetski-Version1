# `wz-alert-pagination` Component Specification

This document provides the specification for the Waze Styleguide `wz-alert-pagination` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-alert-pagination`
**Encapsulation:** `shadow`
**Dependencies:** `wz-button`, `wz-subhead4`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `currentPage` | `number` | `1` | Current page |
| `totalPages` | `number` | `0` | Total number of pages |

### Slots
*No slots defined.*

### Events
- `paginationChanged`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("div", { key: '183cd06f7c70449f77bbb690d1eb268e6755a58a', class: { "wz-alert-pagination": true, "is-rtl": this.isRTL } }, h("wz-button", { key: 'aa105ed0e2a299f08183d0619ffd0263d75ce4c3', size: "sm", color: "clear-icon", disabled: this.isPrevDisabled, class: "prev-button", onClick: this.handlePrev }, getArrowLeftIcon()), h("wz-subhead4", { key: 'ddb2027ad89eb6c2403bea434003676ebcc1dec7', class: "title" }, this.currentPage, "/", this.totalPages), h("wz-button", { key: 'ac52a89c63d9c06dcf4a47d24109bd95c96f146a', size: "sm", color: "clear-icon", disabled: this.isNextDisabled, class: "next-button", onClick: this.handleNext }, getArrowRightIcon())));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-alert-pagination {
  align-items: center;
  display: flex;
  font-feature-settings: "tnum";
  gap: var(--space-always-xxs, 4px);
}
.wz-alert-pagination svg {
  vertical-align: top;
}
.wz-alert-pagination.is-rtl .prev-button,
.wz-alert-pagination.is-rtl .next-button {
  transform: rotate(180deg);
}
```
