# `wz-star-rating-icon` Component Specification

This document provides the specification for the Waze Styleguide `wz-star-rating-icon` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-star-rating-icon`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `"empty" \| "full" \| "half"` | `"full"` | Star mode. (default: FULL) Can be one of the following: 'full' | 'empty' | 'half' |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        switch (this.mode.toLowerCase()) {
            case "full":
                return h("div", { class: "star" }, getFullStar());
            case "half":
                return (h("div", { class: { star: true, mirrorImage: this.isRTL() } }, getHalfStar()));
            case "empty":
                return h("div", { class: "star" }, getEmptyStar());
            default:
                return null;
        }
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.star {
  align-items: center;
  display: flex;
  min-height: 13px;
  min-width: 13px;
}

.fullStar path {
  fill: var(--cautious, #ffc400);
}

.emptyStar path {
  fill: var(--hairline, #d5d7db);
}

.halfStar .firstHalf {
  fill: var(--hairline, #d5d7db);
}

.halfStar .secondHalf {
  fill: var(--cautious, #ffc400);
}

.mirrorImage {
  transform: scaleX(-1);
}

/*
Nicer way to mirror image the half star
that is not fully supported:

:host-context([dir='rtl']) {
  .halfStar {
    transform: scaleX(-1);
  }
}
*/
```
