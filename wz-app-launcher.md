# `wz-app-launcher` Component Specification

This document provides the specification for the Waze Styleguide `wz-app-launcher` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-app-launcher`
**Encapsulation:** `shadow`
**Dependencies:** `wz-menu`

### Properties
*No exposed properties.*

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const iconClass = {
            "app-launcher-icon": true,
            expanded: this.expanded,
        };
        return (h("div", { key: '24662029bc560b32eee58b4680068e8e7da94d04', class: "wz-app-launcher" }, h("div", { key: 'bc8ef46517243ef3292e781d4995a83cfb32bdeb', class: iconClass, onClick: () => (this.expanded = !this.expanded), tabIndex: 1 }, getAppLauncherIcon()), h("wz-menu", { key: '9c761dbbd774f7193d88877d160c58abb88b36dc', expanded: this.expanded }, h("slot", { key: '1fab545f97a3411169d148eaab92933975aed896' }))));
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

:host {
  display: inline-block;
}
```
