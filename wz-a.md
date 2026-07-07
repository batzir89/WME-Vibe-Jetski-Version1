# `wz-a` Component Specification

This document provides the specification for the Waze Styleguide `wz-a` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-a`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether this a is disabled or not |
| `href` | `string` | `""` | The URL of the page the link goes to |
| `rel` | `string` | `` | The relationship between the current document and the linked document. supported values are `alternate` | `author` | `bookmark` | `external` | `help` | `license` | `next` | `nofollow` | `noopener` | `noreferrer` | `prev` | `search` | `tag` | `_top` |
| `target` | `string` | `"_self"` | Where to open the linked document. supported values are `_blank`|`_self`|`_parent`|`_top` |
| `withIcon` | `boolean` | `null` | Whether the a is with icon or not |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-a": true,
            disabled: this.disabled,
        };
        const linkIcon = this.shouldShowIcon() && (h("span", { key: '72cdc909c6cffff849ac5697907c7f6b9d296c10', class: { icon: true, mirrorIcon: this.isRTL() } }, getLinkIcon()));
        return (h("a", { key: '99cc14728d7cf81dcf4b5373082fa7cc8bdd37e5', class: componentClass, href: this.href, target: this.target, rel: this.rel }, h("slot", { key: 'b05c1e6ccb62453810b72cd3719f1c4a26050137' }), linkIcon));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-a {
  color: var(--primary_variant, #0075e3);
  text-decoration: unset;
}
.wz-a:focus-visible {
  outline: 1px solid;
}
.wz-a.disabled {
  color: var(--disabled_text, #b7babf);
  cursor: default;
}
.wz-a .icon {
  margin-inline-start: var(--space-always-xxs, 4px);
  vertical-align: bottom;
}
.wz-a .icon.mirrorIcon {
  transform: scaleX(-1);
}
.wz-a .icon svg {
  vertical-align: middle;
}
.wz-a:hover:not(.disabled) {
  text-decoration: underline;
}

:host {
  white-space: nowrap;
}
```
