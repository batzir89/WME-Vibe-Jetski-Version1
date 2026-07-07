# `wz-navigation-section` Component Specification

This document provides the specification for the Waze Styleguide `wz-navigation-section` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-navigation-section`
**Encapsulation:** `shadow`
**Dependencies:** `wz-overline`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isCollapsed` | `boolean` | `false` |  |
| `sectionTitle` | `string` | `` | Section title |

### Slots
| Slot | Description |
| :--- | :--- |
| `default (no name)` | Slot for navigation items |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-navigation-section": true,
            collapsed: this.isCollapsed,
        };
        return (h("div", { key: '82f60bf803909181801612320fe7c9066506bc44', class: componentClass }, this.sectionTitle && h("wz-overline", { key: '0ffa8d745cebc01ed19ae9eca1a6347245a868d1' }, this.sectionTitle), h("slot", { key: '5e587af38455fd7086a734edf61cff7e6ec1d7a7' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-navigation-section {
  display: flex;
  flex-direction: column;
  padding: var(--space-l, 24px) 0;
  width: 100%;
}
.wz-navigation-section + .wz-navigation-section {
  border-top: 1px solid;
  border-top-color: var(--separator_default, #e8eaed);
}
.wz-navigation-section wz-overline {
  color: var(--content_p3, #72767d);
  padding-bottom: var(--space-m, 16px);
  padding-inline-start: var(--space-always-l, 24px);
}
.wz-navigation-section.collapsed wz-overline {
  display: none;
}

:host {
  display: flex;
}

:host(:nth-of-type(n + 2)) {
  border-top: 1px solid;
  border-top-color: var(--separator_default, #e8eaed);
}
```
