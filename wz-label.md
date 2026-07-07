# `wz-label` Component Specification

This document provides the specification for the Waze Styleguide `wz-label` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-label`
**Encapsulation:** `shadow`
**Dependencies:** `wz-subhead5`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `htmlFor` | `string` | `""` |  |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("label", { key: '68e4966d9e558d9363007dee701fd39fb06a5233', htmlFor: this.htmlFor }, h("wz-subhead5", { key: 'fa7574db91035492987e7a24c30b54d39aa99f0b' }, h("slot", { key: 'b8c125ae79e2d860d824ee0620cd2cccbc7c901f' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  color: var(--content_default, #202124);
  margin-bottom: var(--wz-label-margin, var(--space-xs, 8px));
  cursor: pointer;
}
```
