# `wz-notification-indicator` Component Specification

This document provides the specification for the Waze Styleguide `wz-notification-indicator` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-notification-indicator`
**Encapsulation:** `shadow`
**Dependencies:** `wz-overline`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | The value to display. If 'value <= 0' then it shows a red dot. If '0 < value < 100' then it shows the value. If 'value >= 100' then it shows the '99+' string. |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const displayValue = this.getDisplayValue();
        return (h("wz-overline", { key: 'f9e90fdcd04b3cdfecc66cb4224669c7586f4e2d', class: { digits: Boolean(displayValue) } }, displayValue));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
wz-overline {
  --wz-notification-indicator-size: 8px;
  align-items: center;
  background: var(--alarming_variant, #e42828);
  border-radius: calc(var(--wz-notification-indicator-size) / 2);
  display: inline-flex;
  height: var(--wz-notification-indicator-size);
  justify-content: center;
  min-width: var(--wz-notification-indicator-size);
}
wz-overline.digits {
  --wz-notification-indicator-size: 16px;
  box-sizing: border-box;
  color: var(--on_primary, #ffffff);
  line-height: 1;
  padding: 0 var(--space-always-xxs, 4px);
}
```
