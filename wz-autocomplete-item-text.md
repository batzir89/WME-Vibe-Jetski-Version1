# `wz-autocomplete-item-text` Component Specification

This document provides the specification for the Waze Styleguide `wz-autocomplete-item-text` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-autocomplete-item-text`
**Encapsulation:** `none`
**Dependencies:** `wz-subhead4`, `wz-body2`, `wz-caption`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isDisabled` | `boolean` | `` |  |
| `isPrimaryText` | `boolean` | `` |  |
| `text` | `string` | `` |  |
| `textMatchPattern` | `boolean[]` | `` |  |
| `width` | `number` | `` |  |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const wrapperClass = `wz-string-wrapper ${this.isPrimaryText ? "primary-text" : "secondary-text"}`;
        const wrapperClassStyleProps = {
            width: this.width ? `${this.width}px` : "auto",
        };
        return (h("div", { key: '415cf049ea6e3fbeed23c9362a9f253c5401f2f1', class: wrapperClass, style: wrapperClassStyleProps }, this.textMatchPattern
            ? this.renderMatchedText()
            : this.renderUnmatchedText()));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
/* No CSS found */
```
