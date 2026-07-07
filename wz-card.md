# `wz-card` Component Specification

This document provides the specification for the Waze Styleguide `wz-card` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-card`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether this card is disabled or not. |
| `elevation` | `"0" \| "1" \| "2" \| "3" \| "4" \| "5"` | `"0"` | Card's elevation level, ranging from 0 to 5. |
| `elevationOnHover` | `"0" \| "1" \| "2" \| "3" \| "4" \| "5"` | `` | Card's elevation level on hover, ranging from 0 to 5. |
| `read` | `boolean` | `false` | Whether this card is read or not. |
| `selected` | `boolean` | `false` | Whether this card is selected. |
| `size` | `"lg" \| "md" \| "sm"` | `"sm"` | Card's size. Controls the card's font size |

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
            "wz-card": true,
            disabled: this.disabled,
            selected: this.selected,
            read: this.read,
            [getCardClassBySize(this.size)]: true,
            [getCardClassByElevation(this.elevation)]: true,
            [getCardClassByElevationOnHover(this.elevationOnHover)]: Boolean(this.elevationOnHover),
        };
        return (h("div", { key: '637061d1e5ecbd79f90103b277f8635099049f30', class: componentClass }, h("slot", { key: '6700844c6c9a1b4e749a9b416d30b0c313eb34af' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-card {
  align-items: center;
  background-color: var(--background_default);
  border-radius: var(--card-border-radius, 6px);
  box-sizing: var(--wz-card-box-sizing, initial);
  margin: var(--wz-card-margin, 8px 8px);
  padding: var(--wz-card-padding, 16px 16px);
  transition: 0.2s box-shadow ease-in-out;
  width: var(--wz-card-width, initial);
}
.wz-card.sm {
  font-size: 12px;
}
.wz-card.md {
  font-size: 14px;
}
.wz-card.lg {
  font-size: 16px;
}
.wz-card.elevation0 {
  box-shadow: 0 0 0 1px #d5d7db;
}
.wz-card.elevation1 {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation2 {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation3 {
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation4 {
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation5 {
  box-shadow: 0 4px 4px 0 rgba(60, 64, 67, 0.3), 0 8px 12px 6px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation0-on-hover:hover {
  box-shadow: 0 0 0 1px #d5d7db;
}
.wz-card.elevation1-on-hover:hover {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation2-on-hover:hover {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation3-on-hover:hover {
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation4-on-hover:hover {
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15);
}
.wz-card.elevation5-on-hover:hover {
  box-shadow: 0 4px 4px 0 rgba(60, 64, 67, 0.3), 0 8px 12px 6px rgba(60, 64, 67, 0.15);
}
.wz-card.selected {
  background-color: var(--wz-card-selected-background, var(--background_default));
  outline: var(--wz-card-selected-outline, 2px solid #0099ff);
}
.wz-card.read {
  background-color: var(--surface_default);
  border-color: var(--hairline);
  color: var(--content_p3);
}
.wz-card.disabled {
  border-color: var(--hairline, #d5d7db);
  color: var(--disabled_text, #b7babf);
  cursor: not-allowed;
}

:host {
  /**
  * @prop --wz-card-padding: The card padding value. Default: `"16px"`
  * @prop --wz-card-margin: The card margin value. Default:	`"8px"`
  * @prop --wz-card-width: The card width value. Default:	`"initial"`
  * @prop --card-border-radius: The card border-radius value. Default:	`"6px"`
  * @prop --wz-card-box-sizing: The card box sizing value. Default:	If not specified, the box sizing is css default.
  * @prop --wz-card-selected-outline: Outline of the selected card. Default: `"2px solid $blue-500"`
  * @prop --wz-card-selected-background: Background color of the selected card. Default: `--background_default` (white)
  */
  display: inline-flex;
  flex-direction: column;
}

:host([disabled]) {
  pointer-events: none;
}
```
