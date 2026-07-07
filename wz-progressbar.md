# `wz-progressbar` Component Specification

This document provides the specification for the Waze Styleguide `wz-progressbar` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-progressbar`
**Encapsulation:** `shadow`
**Dependencies:** `wz-basic-tooltip`, `wz-tooltip-source`, `wz-tooltip-target`, `wz-tooltip-content`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether progressbar is disabled or not. (default: false) |
| `message` | `string` | `` | The message which describes progressbar status. When used with status it appears as error or warning |
| `progress` | `number` | `0` | The current progress. (default: 0) Number in range 0-100 |
| `size` | `"lg" \| "md" \| "sm"` | `"md"` | The size of the progressbar. (default: md) Can be one of the following: 'sm' | 'md' | 'lg' |
| `status` | `"error" \| "warning"` | `` | The status of the progressbar. Can be one of the following: 'error' | 'warning' |

### Slots
| Slot | Description |
| :--- | :--- |
| `progressbar-tooltip` | Tooltip of progressbar which appears under current progress right edge |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const statusClassname = getProgressBarClassByStatus(this.status);
        return (h("div", { key: 'efbae20903ea34c69f6d3296c5f940decbb8263b', class: {
                "wz-progressbar": true,
                [statusClassname]: !!statusClassname,
                disabled: this.disabled,
            } }, this.hasTooltipSlot
            ? this.renderProgressbarWithTooltip()
            : this.renderProgressBar(), this.message && h("div", { key: '0e3607bbe5cfedff10b93ec401b75e757d49b137', class: "wz-progress-message" }, this.message)));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-progressbar .wz-progress-value {
  background-color: #0099ff;
}
.wz-progressbar:hover .wz-progress-value {
  background-color: #0075e3;
}
.wz-progressbar.error .wz-progress-value {
  background-color: #e42828;
}
.wz-progressbar.error:hover .wz-progress-value {
  background-color: #cb0000;
}
.wz-progressbar.error .wz-progress-message {
  color: #e42828;
}
.wz-progressbar.warning .wz-progress-value {
  background-color: #f18200;
}
.wz-progressbar.warning:hover .wz-progress-value {
  background-color: #e37400;
}
.wz-progressbar.warning .wz-progress-message {
  color: #f18200;
}
.wz-progressbar.disabled .wz-progress-value {
  background-color: #d5d7db;
}
.wz-progressbar.disabled:hover .wz-progress-value {
  background-color: #b7babf;
}
.wz-progressbar.disabled .wz-progress-message {
  color: #d5d7db;
}

.wz-progress-fill {
  background-color: #f2f4f7;
  border-radius: 5px;
  position: relative;
  width: 100%;
}
.wz-progress-fill::before, .wz-progress-fill::after {
  content: "";
  height: 15px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
}
.wz-progress-fill::before {
  bottom: 100%;
}
.wz-progress-fill::after {
  top: 100%;
}
.wz-progress-fill.sm {
  height: 4px;
}
.wz-progress-fill.md {
  height: 6px;
}
.wz-progress-fill.lg {
  border-radius: 30px;
  height: 12px;
}

.wz-progress-value {
  border-radius: 5px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
.wz-progress-value.lg {
  border-radius: 30px;
}

wz-tooltip-target {
  position: absolute;
  right: 0;
  top: 100%;
}

.wz-progress-message {
  font-size: 12px;
  line-height: 16px;
  margin-top: var(--space-xxs, 4px);
  position: relative;
  z-index: 3;
}
```
