# `wz-icon` Component Specification

This document provides the specification for the Waze Styleguide `wz-icon` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-icon`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `` | The name of the icon. Check available names [here](/?path=/docs/🧱-foundations-web-icons--docs) |
| `size` | `number` | `` | Icon size. Default values are: - for `type="color"` size is `32` - for `type="grayscale"` size is `24` |
| `type` | `"color" \| "grayscale"` | `"color"` | The type of the icon |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const src = this.getImageSrcFromCDN();
        const size = this.getIconSize();
        return h("img", { key: '0b7e3df47ef4f7858c3d19e4373378419e44a531', src: src, width: size, height: size, alt: this.name });
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
/* No CSS found */
```
