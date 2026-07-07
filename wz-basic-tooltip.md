# `wz-basic-tooltip` Component Specification

This document provides the specification for the Waze Styleguide `wz-basic-tooltip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-basic-tooltip`
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
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("wz-tooltip", { key: '168be92467fb13ebf4de3e2d5febcc59937a8d3a', ref: (el) => {
                this.wzTooltipEl = el;
                if (this.wzTooltipEl) {
                    this.resolveReadyPromise(true);
                }
            }, trigger: this.trigger, hideDelayMs: this.hideDelayMs, targetSelector: this.targetSelector }, h("slot", { key: '6f2b13e5c4bcd6ddd82c68d6e04da33d8e1dfa83' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  --wz-tooltip-content-background-color: #3c4043;
  --wz-tooltip-content-border-radius: 4px;
  --wz-tooltip-content-color: #ffffff;
  --wz-tooltip-content-margin-y: var(--wz-tooltip-content-margin, var(--space-xs, 8px));
  --wz-tooltip-content-margin-x: var(--wz-tooltip-content-margin, var(--space-always-xs, 8px));
  --wz-tooltip-content-min-width: 40px;
  --wz-tooltip-content-padding-y: var(--wz-tooltip-content-padding, var(--space-xs, 8px));
  --wz-tooltip-content-padding-x: var(--wz-tooltip-content-padding, var(--space-always-xs, 8px));
  --wz-tooltip-content-white-space: nowrap;
}
```
