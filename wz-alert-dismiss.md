# `wz-alert-dismiss` Component Specification

This document provides the specification for the Waze Styleguide `wz-alert-dismiss` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-alert-dismiss`
**Encapsulation:** `shadow`

### Properties
*No exposed properties.*

### Slots
| Slot | Description |
| :--- | :--- |
| `Component's children` |  |

### Events
- `alertDismissed`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '87d7f33b243e5971321375b426a7596034e6e2e7', onClick: this.alertDismissed.emit }, h("slot", { key: '76a316521c1c1eb1b0bbdebfc21bb8eed58dddb9' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
/* No CSS found */
```
