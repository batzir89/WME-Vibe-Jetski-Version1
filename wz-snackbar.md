# `wz-snackbar` Component Specification

This document provides the specification for the Waze Styleguide `wz-snackbar` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-snackbar`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `align` | `"center" \| "default"` | `"default"` | Whether the snackbar is at the center of the screen. |
| `closeAutomatically` | `boolean` | `true` | Whether the snackbar closes automatically after the delay configured in closeDelay. |
| `closeButton` | `boolean` | `true` | Whether the snackbar has a close button. |
| `closeDelay` | `number` | `3000` | The delay in milliseconds before the snackbar will close automatically. |
| `position` | `"bottom" \| "top"` | `"bottom"` | Whether the snackbar is at the top or bottom of the screen. |
| `shouldPositionBasedOnWindowSize` | `boolean` | `false` | Whether to position the snackbar based on window size.  When set to true, the align and position props will position the snackbar based on the window as its container.  When set to false, the default container will be used. (If any parent element has a transform css rule, it will be considered as the default container for the snackbar with css position set to "fixed"). |

### Slots
*No slots defined.*

### Events
- `closeSnackbars`: Emits when interaction occurs
- `snackbarHidden`: Emits when interaction occurs
- `snackbarShown`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        if (!this.isVisible) {
            return;
        }
        const positionClass = this.position === "top" ? POSITION_CLASS.TOP : POSITION_CLASS.BOTTOM;
        const translation = getFixedPositionContainerTranslation(this.el);
        const style = this.shouldPositionBasedOnWindowSize
            ? {
                transform: translation !== null && translation !== void 0 ? translation : "",
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight}px`,
            }
            : {};
        const alignClass = this.align === "center" ? ALIGN_CLASS.CENTER : ALIGN_CLASS.DEFAULT;
        const closeButton = this.closeButton && (h("button", { onClick: () => this.hideSnackbar(), class: "close-button", tabIndex: 0 }, h("span", null, xIcon())));
        return (h("div", { class: `snackbar-wrapper ${positionClass}`, style: style }, h("div", { class: `wz-snackbar ${alignClass}`, onMouseOver: () => this.onUserInteraction(), onMouseDown: () => this.onUserInteraction() }, h("slot", null), closeButton)));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.snackbar-wrapper {
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.snackbar-wrapper.top-snackbar {
  align-items: flex-start;
}
.snackbar-wrapper.bottom-snackbar {
  align-items: flex-end;
}

.wz-snackbar {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-snackbar :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-snackbar :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-snackbar {
  align-items: center;
  background-color: var(--wz-snackbar-background-color, var(--always_dark, #202124));
  border: none;
  border-radius: 6px;
  bottom: var(--wz-snackbar-bottom, initial);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  box-sizing: border-box;
  color: var(--wz-snackbar-color, var(--always_white, #ffffff));
  display: flex;
  font-size: 14px;
  font-weight: 400;
  justify-content: space-between;
  left: var(--wz-snackbar-left, initial);
  letter-spacing: 0.2px;
  margin: var(--space-l, 24px) var(--space-always-l, 24px);
  min-height: 48px;
  min-width: var(--wz-snackbar-min-width, 195px);
  padding: var(--space-m, 16px) var(--space-always-m, 16px);
  pointer-events: all;
  position: var(--wz-snackbar-position, fixed);
  right: var(--wz-snackbar-right, initial);
  top: var(--wz-snackbar-top, initial);
  translate: var(--wz-snackbar-translate, none);
  white-space: normal;
}
.wz-snackbar.center-snackbar {
  left: 50%;
  translate: -50%;
  margin-inline: 0;
}
.wz-snackbar slot {
  align-items: center;
  display: flex;
  gap: var(--space-always-l, 24px);
  line-height: 20px;
  max-width: 640px;
  word-break: break-word;
}
.wz-snackbar .close-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-inline-end: 0;
  margin-inline-start: var(--space-always-l, 24px);
  position: relative;
  width: 16px;
}
.wz-snackbar .close-button path {
  fill: var(--wz-snackbar-color, var(--always_white, #ffffff));
}
.wz-snackbar .close-button span {
  left: 0;
  position: absolute;
  top: calc(var(--space-xs, 8px) * -1);
}
.wz-snackbar ::slotted(wz-snackbar-actions) {
  display: flex;
  gap: var(--space-always-l, 24px);
  order: 1;
  position: relative;
  top: var(--space-xxxs, 2px);
}

:host {
  /**
  * @prop --wz-snackbar-position
  * @prop --wz-snackbar-top
  * @prop --wz-snackbar-bottom
  * @prop --wz-snackbar-left
  * @prop --wz-snackbar-right
  * @prop --wz-snackbar-background-color
  * @prop --wz-snackbar-color
  * @prop --wz-snackbar-min-width
  * @prop --wz-snackbar-translate
  */
  bottom: 0;
  display: inline-block;
  left: 0;
  pointer-events: none;
  position: var(--wz-snackbar-position, fixed);
  right: 0;
  top: 0;
  z-index: 1003;
}
```
