# `wz-star-rating` Component Specification

This document provides the specification for the Waze Styleguide `wz-star-rating` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-star-rating`
**Encapsulation:** `shadow`
**Dependencies:** `wz-star-rating-icon`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ratingScore` | `number` | `` | Rating Score. A number. The number will be rounded to the closest number of stars between 0 and 5 (inc.) with 0.5 intervals |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("div", { key: '4d57fb2c21224067acfc2c76f9d15336de48b1ab', class: "wz-star-rating" }, this.renderStar(1), this.renderStar(2), this.renderStar(3), this.renderStar(4), this.renderStar(5)));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-star-rating {
  align-items: center;
  display: flex;
}

.star {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1px;
}
```
