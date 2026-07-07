# `wz-banner` Component Specification

This document provides the specification for the Waze Styleguide `wz-banner` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-banner`
**Encapsulation:** `shadow`
**Dependencies:** `wz-icon`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `"blue" \| "default" \| "green" \| "orange" \| "purple" \| "red" \| "yellow"` | `"default"` | optional color, from a given colors list |
| `dismissible` | `boolean` | `false` | optionally add a dismiss X button |
| `iconName` | `string` | `""` | optional tier2 icon name |
| `iconSize` | `number` | `32` |  |

### Slots
*No slots defined.*

### Events
- `bannerHidden`: Dispatched after hiding the banner

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        if (!this.displayed) {
            return;
        }
        const className = {
            "wz-banner": true,
            "with-icon": Boolean(this.iconName),
            [this.color]: true,
        };
        return (h("div", { class: className }, this.renderOptionalIcon(), this.renderContent(), this.renderOptionalDismissButton()));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: block;
}

.wz-banner {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-banner :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-banner :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-banner {
  display: flex;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 20px;
  max-height: 76px;
  padding: var(--space-s, 12px) var(--space-always-m, 16px);
  position: relative;
}
.wz-banner.with-icon {
  max-height: 60px;
  padding: var(--space-xs, 8px) var(--space-always-m, 16px);
}
.wz-banner.with-icon .content {
  max-height: 60px;
}
.wz-banner .icon {
  border-radius: 8px;
  display: inline-flex;
  height: 64px;
  justify-content: center;
  margin-inline-end: var(--space-always-s, 12px);
  width: 64px;
}
.wz-banner .icon wz-icon {
  align-self: center;
}
.wz-banner .content {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  display: -webkit-box;
  flex-grow: 1;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  margin: auto;
  overflow: hidden;
  padding-inline-end: var(--space-always-m, 16px);
  text-overflow: ellipsis;
}
.wz-banner .dismiss-button {
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
}
.wz-banner .dismiss-button:hover {
  opacity: 0.5;
}
.wz-banner.purple {
  background-color: var(--surface_variant_purple, #f8f2ff);
}
.wz-banner.blue {
  background-color: var(--surface_alt, #e5f6ff);
}
.wz-banner.green {
  background-color: var(--surface_variant_green, #eff9f3);
}
.wz-banner.yellow {
  background-color: var(--surface_variant_yellow, #fffaeb);
}
.wz-banner.orange {
  background-color: var(--surface_variant_orange, #fff5f1);
}
.wz-banner.red {
  background-color: var(--surface_variant_red, #fff1f1);
}
```
