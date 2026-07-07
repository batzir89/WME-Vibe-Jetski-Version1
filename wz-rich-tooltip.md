# `wz-rich-tooltip` Component Specification

This document provides the specification for the Waze Styleguide `wz-rich-tooltip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-rich-tooltip`
**Encapsulation:** `scoped`
**Dependencies:** `wz-tooltip`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `hideDelayMs` | `number` | `0` | The milliseconds delay before closing the tooltip content By default, it closes async with 0 timeout |
| `targetSelector` | `string` | `"wz-tooltip-target"` | The tooltip target selector which will be queried for in order to position the tooltip By default, it looks for a wz-tooltip-target tag under the tooltip element |
| `trigger` | `"click" \| "hover" \| "manual"` | `"hover"` | Whether the tooltip opens by hover over the source element or click on it Can be one of the following: 'hover' | 'click' By default, the tooltip opens on hover |

### Slots
*No slots defined.*

### Events
- `tooltipClosed`: Fired when the tooltip has closed.
- `tooltipOpened`: Fired when the tooltip has opened.

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("wz-tooltip", { key: '2f7032c8dc26916c039d6a1c0467758119e36b51', trigger: this.trigger, hideDelayMs: this.hideDelayMs, targetSelector: this.targetSelector, onTooltipOpened: (event) => this.tooltipOpened.emit(event.detail), onTooltipClosed: (event) => this.tooltipClosed.emit(event.detail) }, h("slot", { key: '8ccbefae019fe00a3013a2ec2709dd869c6fc3d9' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  --wz-tooltip-content-background-color: #ffffff;
  --wz-tooltip-content-border-radius: 8px;
  --wz-tooltip-content-box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  --wz-tooltip-content-min-width: 220px;
  --wz-tooltip-content-padding-x: var(--wz-tooltip-content-padding, var(--space-always-l, 24px));
  --wz-tooltip-content-padding-y: var(--wz-tooltip-content-padding, var(--space-l, 24px));
  --wz-tooltip-content-width: 420px;
}
```
