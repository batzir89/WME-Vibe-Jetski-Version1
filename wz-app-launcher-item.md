# `wz-app-launcher-item` Component Specification

This document provides the specification for the Waze Styleguide `wz-app-launcher-item` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-app-launcher-item`
**Encapsulation:** `shadow`
**Dependencies:** `wz-menu-item`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `"academy" \| "ads" \| "carpool" \| "editor" \| "forums" \| "livemap" \| "partners" \| "wazeopedia"` | `` |  |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        return (h("wz-menu-item", { key: '1d8010c7b997fd25d9343bf46a8ca403b6b058d7', class: "wz-app-launcher-item" }, h("div", { key: 'f5d8b8fe5dba56defbd4ba0b5242970dc2ce866c', class: "app-launcher-item" }, this.getAppLauncherItemIcon(this.icon), h("span", { key: 'bdf405eeffbff1ad24555fb41decea517c600934', class: "option-text" }, h("slot", { key: '52366803ef3d775807bcc9d70b4650e72db81ca2' })))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-app-launcher {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  width: 36px;
}
.wz-app-launcher .app-launcher-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  outline-color: transparent;
  width: 36px;
}
.wz-app-launcher .app-launcher-icon path {
  fill: var(--content_p1, #3c4043);
}
.wz-app-launcher .app-launcher-icon:hover, .wz-app-launcher .app-launcher-icon:active, .wz-app-launcher .app-launcher-icon:focus, .wz-app-launcher .app-launcher-icon.expanded {
  background-color: var(--background_variant, #f2f4f7);
  border-radius: 50%;
}
.wz-app-launcher wz-menu {
  --wz-menu-option-height: 54px;
  --wz-menu-margin-top: var(--space-xxs, 4px);
  --wz-menu-max-height: 400px;
  --wz-menu-options-wrapper-padding: var(--space-xs, 8px) 0;
  --wz-menu-option-padding: 0 var(--space-always-m, 16px);
  width: 240px;
}
.wz-app-launcher {
  /* last item without border-bottom */
}
.wz-app-launcher ::slotted(wz-app-launcher-item:last-child) {
  --wz-app-launcher-item-text-border-bottom: 0;
}

.app-launcher-item {
  align-items: center;
  display: flex;
  height: 54px;
}
.app-launcher-item .option-text {
  font-family: var(--wz-font-family, Waze Boing, Waze Boing HB, Rubik, sans-serif);
}
.app-launcher-item .option-text :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.app-launcher-item .option-text :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.app-launcher-item .option-text {
  border-bottom: var(--wz-app-launcher-item-text-border-bottom, 1px solid var(--separator_default, #e8eaed));
  box-sizing: border-box;
  font-size: 16px;
  height: 54px;
  margin-inline-start: var(--space-always-m, 16px);
  width: 160px;
}
```
