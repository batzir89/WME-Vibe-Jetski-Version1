# `wz-card-section` Component Specification

This document provides the specification for the Waze Styleguide `wz-card-section` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-card-section`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `"default" \| "variant"` | `"default"` | Section background color |

### Slots
| Slot | Description |
| :--- | :--- |
| `default` | component's children |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-card-section": true,
            [getCardSectionClassByColor(this.color)]: true,
        };
        return (h("div", { key: 'a2ace16718887d46a2e0bb92af4fefe571aa94c6', class: componentClass }, h("slot", { key: 'e1b5afbd245dda48019eecc1308deb561cf1a9ca' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  /**
  * @prop --wz-card-section-padding: Section padding.
  *       Default:	`--wz-card-padding` (16px)
  * @prop --wz-card-section-background: Section custom background. Will override the `color` attribute.
  *       Default: `--background_default` for `color="default"` `--background_variant` for `color="variant"
  */
  --card-padding: var(--wz-card-padding, 16px 16px);
  display: block;
  margin-left: calc(-1 * var(--card-padding));
  margin-right: calc(-1 * var(--card-padding));
}
:host:host(:first-child) {
  margin-top: calc(-1 * var(--card-padding));
}
:host:host(:first-child) .wz-card-section {
  border-top-left-radius: var(--card-border-radius);
  border-top-right-radius: var(--card-border-radius);
}
:host:host(:last-child) {
  margin-bottom: calc(-1 * var(--card-padding));
}
:host:host(:last-child) .wz-card-section {
  border-bottom-left-radius: var(--card-border-radius);
  border-bottom-right-radius: var(--card-border-radius);
}
:host .wz-card-section {
  padding: var(--wz-card-section-padding, var(--card-padding));
}
:host .wz-card-section.default {
  background: var(--wz-card-section-background, var(--background_default));
}
:host .wz-card-section.variant {
  background: var(--wz-card-section-background, var(--background_variant));
}
```
