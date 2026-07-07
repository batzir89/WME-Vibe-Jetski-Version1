# `wz-header` Component Specification

This document provides the specification for the Waze Styleguide `wz-header` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-header`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `borderStyle` | `"drop-shadow" \| "solid"` | `"drop-shadow"` | Whether the header has a drop shadow |
| `sticky` | `boolean` | `false` | Whether the header is sticky or not. |

### Slots
*No slots defined.*

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = { "wz-header": true, sticky: this.sticky };
        const contentWrapperClass = {
            "content-wrapper": true,
            [getBorderClassByBorderStyle(this.borderStyle)]: true,
        };
        return (h("div", { key: '22607ecc012d69934438405614c88d13a3a6285b', class: componentClass }, h("div", { key: '0b9ac3995c0bb160bb241725c11858a339154f82', class: contentWrapperClass }, h("slot", { key: '64b358ade1abdd7ddadde9e705dc6bbc57834279', name: "product-icon" }, wazerIcon()), h("slot", { key: '896755e2e0ae1ed4b78b9fceb4bed9e62815e5a3' })), this.sticky && h("div", { key: 'd87a02d4d961d9c9570ed0578933f180a96817e2', class: "wz-sticky-header-background" })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-header {
  min-width: 100%;
  width: 100%;
}
.wz-header .content-wrapper {
  align-items: center;
  background-color: var(--background_default, #ffffff);
  box-sizing: border-box;
  color: var(--content_default, #202124);
  display: flex;
  height: var(--wz-header-content-height, 64px);
  justify-content: space-between;
  padding: var(--space-m, 16px) var(--space-always-m, 16px);
  width: 100%;
}
.wz-header .content-wrapper.drop-shadow {
  border-bottom: var(--wz-header-border-bottom, unset);
  box-shadow: var(--wz-header-box-shadow, 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(60, 64, 67, 0.15));
}
.wz-header .content-wrapper.solid {
  border-bottom: var(--wz-header-border-bottom, 1px solid var(--separator_default));
}
.wz-header .content-wrapper svg {
  min-height: 28px;
  min-width: 28px;
}
.wz-header .wz-sticky-header-background {
  height: var(--wz-header-content-height, 64px);
  width: 100%;
}
.wz-header.sticky .content-wrapper {
  left: 0;
  position: fixed;
  top: 0;
  z-index: 5;
}

::slotted(wz-header-branding) {
  font-family: var(--wz-font-family, Waze Boing, Waze Boing HB, Rubik, sans-serif);
}
::slotted(wz-header-branding) :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
::slotted(wz-header-branding) :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
::slotted(wz-header-branding) {
  flex: 1;
  font-size: 22px;
  font-weight: 400;
  margin-inline-start: var(--space-always-s, 12px);
  white-space: nowrap;
}

::slotted(wz-header-controls) {
  margin: 0 auto;
  padding: 0 var(--space-always-xxl, 40px);
  white-space: nowrap;
  width: 100%;
}

::slotted(wz-header-user-panel) {
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
}

@media only screen and (max-width: 600px) {
  .wz-header .content-wrapper {
    height: 56px;
    padding: calc(var(--space-m, 16px) - 2px) var(--space-always-m, 16px);
  }
  .wz-header .wz-sticky-header-background {
    height: 56px;
  }
}
:host {
  /**
   * @prop --wz-header-content-height
   * @prop --wz-header-border-bottom
   * @prop --wz-header-box-shadow
   * @prop --wz-header-border-bottom
   * @prop --wz-header-content-height
   */
  display: block;
  width: 100%;
}
```
