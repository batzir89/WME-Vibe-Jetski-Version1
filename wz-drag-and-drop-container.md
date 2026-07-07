# `wz-drag-and-drop-container` Component Specification

This document provides the specification for the Waze Styleguide `wz-drag-and-drop-container` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-drag-and-drop-container`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `true` |  |

### Slots
*No slots defined.*

### Events
- `filesDropped`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const containerClass = {
            "drag-and-drop-container": true,
            "active-drag": !this.disabled && this.isDragActive,
        };
        return (h("div", { key: 'f54de197bfc3d41e83c438bea828cec1d0a4a286', class: containerClass, onDrop: this.dropHandler, onDragEnter: this.activateDragHandler, onDragOver: this.activateDragHandler, onDragLeave: this.deactivateDragHandler, id: "wz-drag-and-drop-container" }, h("slot", { key: '159fb3e017d0ad90d8c707d88e76a0dbe14ee76a' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
/* No CSS found */
```
