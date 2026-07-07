# `wz-feature-tooltip` Component Specification

This document provides the specification for the Waze Styleguide `wz-feature-tooltip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-feature-tooltip`
**Encapsulation:** `none`
**Dependencies:** `wz-button`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `caretPosition` | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "left-bottom" \| "left-center" \| "left-top" \| "right-bottom" \| "right-center" \| "right-top" \| "top-center" \| "top-left" \| "top-right"` | `"top-center"` | Preferred placement of the caret. Note: The tooltip itself must be positioned by the consumer. This prop only controls the visual arrow direction/placement style. |
| `onHide` | `() => void` | `` | (Optional) Callback triggered when the 'X' button is clicked. |
| `onShow` | `() => void` | `` | (Optional) Callback triggered when show transitions to true. |
| `show` | `boolean` | `false` | Whether the tooltip is currently visible. |
| `showDismissButton` | `boolean` | `true` | (Optional) Whether to show the 'X' dismiss button. Defaults to true. |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        if (!this.show) {
            return null;
        }
        return (h("div", { class: "wz-feature-tooltip-container", "data-caret-position": this.caretPosition }, this.showDismissButton && (h("wz-button", { class: "wz-feature-tooltip-close", color: "clear-icon", size: "xs", onClick: this.handleClose }, h("i", { class: "w-icon w-icon-x" }))), h("div", { class: "wz-feature-tooltip-content" }, h("slot", null)), h("div", { class: "wz-feature-tooltip-caret" })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: block;
  position: relative;
}

.wz-feature-tooltip-container {
  background: var(--primary_variant, #0075e3);
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  box-sizing: border-box;
  color: var(--on_primary, #ffffff);
  opacity: 1;
  padding: 24px 24px;
  position: relative;
  width: 368px;
}

.wz-feature-tooltip-close {
  --content_p1: var(--on_primary, #ffffff);
  --wz-button-height: 24px;
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 1;
}

.wz-feature-tooltip-content {
  min-height: 40px;
}

.wz-feature-tooltip-caret {
  background: var(--primary_variant, #0075e3);
  border-radius: 2px;
  height: 16px;
  position: absolute;
  transform: rotate(45deg);
  width: 16px;
}

.wz-feature-tooltip-container[data-caret-position^=top] .wz-feature-tooltip-caret {
  box-shadow: -2px -2px 4px 0 rgba(0, 0, 0, 0.1);
  top: -8px;
}

.wz-feature-tooltip-container[data-caret-position=top-left] .wz-feature-tooltip-caret {
  left: 24px;
  transform: translateX(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=top-center] .wz-feature-tooltip-caret {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=top-right] .wz-feature-tooltip-caret {
  right: 24px;
  transform: translateX(50%) rotate(45deg);
}

/* BOTTOM side caret: Tooltip above */
.wz-feature-tooltip-container[data-caret-position^=bottom] .wz-feature-tooltip-caret {
  bottom: -8px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.wz-feature-tooltip-container[data-caret-position=bottom-left] .wz-feature-tooltip-caret {
  left: 24px;
  transform: translateX(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=bottom-center] .wz-feature-tooltip-caret {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=bottom-right] .wz-feature-tooltip-caret {
  right: 24px;
  transform: translateX(50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position^=left] .wz-feature-tooltip-caret {
  box-shadow: -2px 2px 4px 0 rgba(0, 0, 0, 0.1);
  left: -8px;
}

.wz-feature-tooltip-container[data-caret-position=left-top] .wz-feature-tooltip-caret {
  top: 24px;
  transform: translateY(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=left-center] .wz-feature-tooltip-caret {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=left-bottom] .wz-feature-tooltip-caret {
  bottom: 24px;
  transform: translateY(50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position^=right] .wz-feature-tooltip-caret {
  box-shadow: 2px -2px 4px 0 rgba(0, 0, 0, 0.1);
  right: -8px;
}

.wz-feature-tooltip-container[data-caret-position=right-top] .wz-feature-tooltip-caret {
  top: 24px;
  transform: translateY(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=right-center] .wz-feature-tooltip-caret {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.wz-feature-tooltip-container[data-caret-position=right-bottom] .wz-feature-tooltip-caret {
  bottom: 24px;
  transform: translateY(50%) rotate(45deg);
}
```
