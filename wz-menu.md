# `wz-menu` Component Specification

This document provides the specification for the Waze Styleguide `wz-menu` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-menu`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `autoFocusOnOpen` | `boolean` | `true` | Whether the menu autofocuses when opened. by default it does. |
| `closeMenuOnClick` | `boolean` | `true` | Whether the menu auto closes when clicked when opened. by default it does. |
| `expanded` | `boolean` | `false` | Whether the menu is currently open or not. |
| `fixed` | `boolean` | `false` | Whether the menu should open at the mouse click location. |
| `upperMenu` | `boolean` | `false` | Whether the menu should be forced to open upwards. By default, the menu will check if it has enough space downwards, and if it does not, it will open upwards. By passing "true" to this prop the menu will open upwards regardless to it's position. |

### Slots
*No slots defined.*

### Events
- `didUpdate`: The event 'didUpdate' is fired after the component updates
- `menuToggled`: The event 'menuToggled' is fired with an expanded boolean on menu toggle,
to notify other components when the menu's state is changing.
- `subMenuClosedFromClick`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "upper-menu": this.verticalOpenDirection === "up",
            "wz-menu": true,
            expanded: this.expanded,
        };
        const shouldRenderMenuContent = this.isAnimating || this.expanded;
        const menuStyle = this.fixed
            ? this.getFixedMenuStyle()
            : { display: "contents" };
        return (h("div", { key: 'c3d468bb471257517c204549593bd21f2acf1470', class: componentClass }, h("div", { key: '223dad8ea3d41d0e0d36dc86e529fc59db5233ed', style: menuStyle, class: "options-container" }, h("div", { key: '1e0a533d542d0f10b42f350eb278b645b6597abc', class: "options-wrapper", onMouseOver: () => this.unHighlightAllItems(), tabIndex: this.autoFocusOnOpen ? 0 : -1 }, shouldRenderMenuContent && h("slot", { key: '119ac0ee2d6a202e12093fa257666e800d80d651' })))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.options-wrapper {
  background-color: var(--background_default, #ffffff);
  border-radius: 6px;
  box-shadow: 0 2px 6px 2px rgba(0.15, 0.24, 0.25, 0.26);
  box-sizing: border-box;
  height: auto;
  margin-top: var(--wz-menu-margin-top, var(--space-xxs, 4px));
  max-height: 0;
  max-width: inherit;
  min-width: inherit;
  opacity: 0;
  outline: none;
  padding: var(--wz-menu-options-wrapper-padding, var(--space-xs, 8px) 0);
  scroll-behavior: smooth;
  transition: opacity 80ms cubic-bezier(0.25, 0.1, 0.25, 1), max-height 80ms cubic-bezier(0.25, 0.1, 0.25, 1);
  width: inherit;
  z-index: 999;
}

.wz-menu {
  font-family: var(--wz-font-family, Rubik, sans-serif);
}
.wz-menu :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-menu :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-menu {
  color: var(--content_default, #202124);
  display: none;
  font-size: 14px;
  font-weight: 400;
  left: var(--wz-menu-left, unset);
  max-width: var(--wz-menu-max-width, 240px);
  min-width: var(--wz-menu-min-width, 112px);
  position: absolute;
  top: var(--wz-menu-top, unset);
  width: inherit;
  z-index: 999;
}
.wz-menu.expanded {
  display: initial;
}
.wz-menu.expanded .options-wrapper {
  max-height: var(--wz-menu-max-height, 256px);
  opacity: 1;
  transition: opacity 150ms cubic-bezier(0.14, 0.77, 0.41, 1), max-height 150ms cubic-bezier(0.14, 0.77, 0.41, 1);
}
.wz-menu.upper-menu {
  bottom: var(--wz-menu-upper-menu-bottom, 0);
}

.wz-menu-option-divider {
  background-color: var(--separator_default, #e8eaed);
  height: var(--wz-menu-option-divider-height, 1px);
  width: 100%;
}

.wz-menu-title {
  background-color: var(--background_default, #ffffff);
  box-sizing: border-box;
  line-height: var(--wz-menu-option-height, var(--wz-option-height, 40px));
  min-height: var(--wz-menu-option-height, var(--wz-option-height, 40px));
  overflow: hidden;
  padding: var(--wz-menu-option-padding, 0 var(--space-always-s, 12px));
  text-overflow: ellipsis;
  user-select: none;
  color: var(--content_p3, #72767d);
  font-size: 13px;
}

.wz-menu-item,
.wz-menu-sub-menu {
  background-color: var(--background_default, #ffffff);
  box-sizing: border-box;
  line-height: var(--wz-menu-option-height, var(--wz-option-height, 40px));
  min-height: var(--wz-menu-option-height, var(--wz-option-height, 40px));
  overflow: hidden;
  padding: var(--wz-menu-option-padding, 0 var(--space-always-s, 12px));
  text-overflow: ellipsis;
  user-select: none;
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: var(--wz-menu-item-spacing, 12px);
}
.wz-menu-item:hover, .wz-menu-item.highlighted,
.wz-menu-sub-menu:hover,
.wz-menu-sub-menu.highlighted {
  background-color: var(--wz-menu-option-hover-color, var(--background_variant, #f2f4f7));
}
.wz-menu-item.disabled, .wz-menu-item.disabled .helper-text,
.wz-menu-sub-menu.disabled,
.wz-menu-sub-menu.disabled .helper-text {
  color: var(--disabled_text, #b7babf);
  cursor: not-allowed;
}
.wz-menu-item .content,
.wz-menu-sub-menu .content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  width: max-content;
}
.wz-menu-item .trailing,
.wz-menu-sub-menu .trailing {
  display: contents;
  line-height: 1;
  margin-left: auto;
}
.wz-menu-item .actions,
.wz-menu-sub-menu .actions {
  display: contents;
}
.wz-menu-item:not(:hover) .actions,
.wz-menu-sub-menu:not(:hover) .actions {
  display: none;
}

.wz-menu-item .content {
  display: flex;
  gap: 12px;
}

.helper-text {
  color: var(--content_p3, #72767d);
  font-size: 12px;
  min-width: 16px;
  text-align: center;
}

.wz-menu-sub-menu {
  --wz-menu-margin-top: 0;
  --wz-menu-options-wrapper-padding: 0 0;
}
.wz-menu-sub-menu .icon {
  align-items: center;
  display: flex;
  fill: var(--content_p1, #3c4043);
  margin-inline-start: auto;
}
.wz-menu-sub-menu .options-wrapper {
  height: initial;
  max-height: inherit;
  opacity: 1;
  position: absolute;
  right: 0;
  width: initial;
}
.wz-menu-sub-menu .options-wrapper.hidden {
  display: none;
}
.wz-menu-sub-menu.disabled {
  color: var(--disabled_text, #b7babf);
  cursor: not-allowed;
}
.wz-menu-sub-menu.disabled .icon {
  fill: var(--disabled_text, #b7babf);
}
.wz-menu-sub-menu:hover:not(.timedOut):not(.disabled)::after {
  background-color: var(--wz-menu-diagonal-background-color, transparent);
  bottom: 0;
  box-sizing: border-box;
  clip-path: polygon(var(--wz-menu-sub-menu-side-offset) var(--wz-menu-sub-menu-item-top-distance), var(--wz-menu-sub-menu-item-width) var(--wz-menu-sub-menu-item-top-distance), var(--wz-menu-sub-menu-item-width) var(--wz-menu-sub-menu-container-height), var(--wz-menu-sub-menu-side-offset) var(--wz-menu-sub-menu-item-bottom-distance));
  content: "";
  height: 100%;
  position: absolute;
  right: 0;
  width: 100%;
}

.wz-menu-item.mobile {
  font-size: 16px;
}

:host {
  /**
  * @prop --wz-menu-left: how much to offset the menu content from the left
  * @prop --wz-menu-top: how much to offset the menu content from the top
  */
  position: relative;
  width: inherit;
}
```
