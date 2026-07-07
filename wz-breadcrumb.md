# `wz-breadcrumb` Component Specification

This document provides the specification for the Waze Styleguide `wz-breadcrumb` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-breadcrumb`
**Encapsulation:** `shadow`
**Dependencies:** `wz-a`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `href` | `string` | `""` | The URL of the page the breadcrumb links to |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h(Host, { key: '3e222523d59af20093d4fbe2f491131a98ccfb51' }, h("wz-a", { key: 'ec54a320ad06d355fd5ed74606e310a894705a1d', href: this.href }, h("slot", { key: '81b527556caedeef8928d9cf37ce410ef234f977' })), h("span", { key: '43d5b6d8dfb15ad295b4ef697255ed205a5913f3', class: { icon: true, mirrorIcon: this.isRTL() } }, getArrowIcon())));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  align-items: center;
  display: inline-flex;
}

.icon {
  margin: 0 var(--space-always-xxxs, 2px);
}
.icon.mirrorIcon {
  transform: scaleX(-1);
}
.icon svg {
  vertical-align: middle;
}

::slotted(i) {
  font-size: 16px;
  vertical-align: middle;
}
```
