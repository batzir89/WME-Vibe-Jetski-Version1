# `wz-alert` Component Specification

This document provides the specification for the Waze Styleguide `wz-alert` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-alert`
**Encapsulation:** `shadow`
**Dependencies:** `wz-subhead4`, `wz-body2`, `wz-alert-dismiss`, `wz-button`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `colored` | `boolean` | `false` |  |
| `dismissed` | `boolean` | `false` |  |
| `grouped` | `boolean` | `false` | Used by wz-alerts-group component Shouldn't be set manually |
| `level` | `"page" \| "product"` | `"product"` |  |
| `multiline` | `boolean` | `false` |  |
| `variant` | `"danger" \| "info" \| "success" \| "tip" \| "warning"` | `"info"` |  |

### Slots
| Slot | Description |
| :--- | :--- |
| `action` | Action button content |
| `body` | Body content |
| `dismiss` | Dismiss button content |
| `header` | Header content |
| `icon` | Custom icon |

### Events
- `actionClicked`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-alert": true,
            basic: this.isBasicLayout(),
            [this.getLevelClass(this.level)]: true,
            [this.getVariantClass(this.variant)]: true,
            colored: this.colored,
            dismissed: this.dismissed,
            multiline: this.multiline,
            grouped: this.grouped,
        };
        return (h("div", { key: '6342155d46f5c57d46c88bde8b2967d1aea30f5b', class: componentClass }, !this.grouped && this.getIcon(), this.hasContent() && (h("div", { key: 'fd6539c4a6055716e00183919d02ae5f3eea77bc', class: "content" }, this.hasSlot("header") && (h("wz-subhead4", { key: '0c3263c1f5cbf6cf53a1335ea39a7eaf93575df8' }, h("slot", { key: '50de061fef54097cd96b7440cffe12a900ce9497', name: "header" }))), this.hasSlot("body") && (h("wz-body2", { key: 'a3cbda5a0a910cc2ccccee82ae7a8b80ad3fa497' }, h("slot", { key: '5a53abfa176df9ebdd6c79644aaf72b1510789cb', name: "body" }))))), h("slot", { key: 'dcf7da0fd0a148d671b0638d7fe04075e411b2e0' }), this.hasButtonsSlot() && (h("div", { key: 'd262aea9d3a62fb2221789399e810ac510d6d2fa', class: "buttons" }, this.hasSlot("dismiss") && (h("wz-alert-dismiss", { key: 'ff2d5ad72d2c7aa01edfebb866b1038dc9a5927d', class: "dismiss" }, h("slot", { key: 'cf1e427cda428c82f27fea6bfb7858363b32eebe', name: "dismiss" }))), this.hasSlot("action") && (h("div", { key: '580a8f35563bd5a233eacbc11bf0d5b976f4dff2', class: "action" }, h("wz-button", { key: '39cc9b4951b3ef4ded1127f1d136a1f3ea470416', size: "sm", color: this.hasSlot("dismiss") ? "primary" : "text", onClick: () => this.actionClicked.emit() }, h("slot", { key: '602ba1cb31c61b43b7b0e1c66726c97edf668adf', name: "action" }))))))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-alert {
  display: flex;
  gap: var(--space-s, 12px);
  padding: var(--space-xs, 8px) var(--space-always-s, 12px);
}
.wz-alert svg,
.wz-alert ::slotted([slot=icon]) {
  font-size: 24px;
  min-height: 24px;
  min-width: 24px;
  text-align: center;
}
.wz-alert.dismissed {
  display: none;
}
.wz-alert .content {
  flex: 1;
}
.wz-alert .buttons {
  align-items: center;
  display: flex;
  gap: var(--space-always-xs, 8px);
  justify-content: flex-end;
}
@media (max-width: 1023px) {
  .wz-alert .buttons {
    flex-basis: 100%;
  }
}
.wz-alert.basic {
  align-items: center;
}
@media (max-width: 1023px) {
  .wz-alert.basic {
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
.wz-alert.basic wz-subhead4 {
  display: inline;
  line-height: 25px;
  padding-inline-end: var(--space-always-xs, 8px);
}
.wz-alert.basic wz-body2 {
  line-height: 25px;
}
.wz-alert.multiline {
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-xs, 8px);
  padding: var(--space-xs, 8px) var(--space-always-xs, 8px);
}
.wz-alert.multiline .buttons {
  flex-basis: 100%;
}
.wz-alert wz-alert-dismiss {
  font-family: var(--wz-font-family, Waze Boing, Waze Boing HB, Rubik, sans-serif);
}
.wz-alert wz-alert-dismiss :lang(vi) {
  font-family: var(--wz-font-family, Noto Sans, sans-serif);
}
.wz-alert wz-alert-dismiss :lang(th) {
  font-family: var(--wz-font-family, Noto Sans Thai, sans-serif);
}
.wz-alert wz-alert-dismiss {
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
}
.wz-alert.info {
  background-color: var(--primary_variant, #0075e3);
  color: var(--on_primary, #ffffff);
}
.wz-alert.info svg g {
  fill: var(--on_primary, #ffffff);
}
.wz-alert.danger {
  background-color: var(--alarming_variant, #e42828);
  color: var(--on_primary, #ffffff);
}
.wz-alert.danger svg g {
  fill: var(--on_primary, #ffffff);
}
.wz-alert.success {
  background-color: var(--safe_variant, #118742);
  color: var(--on_primary, #ffffff);
}
.wz-alert.success svg g {
  fill: var(--on_primary, #ffffff);
}
.wz-alert.warning {
  background-color: var(--cautious, #ffc400);
  color: var(--always_dark, #202124);
}
.wz-alert.warning svg g {
  fill: var(--always_dark, #202124);
}
.wz-alert.tip {
  background-color: var(--background_variant, #f2f4f7);
  color: var(--content_default, #000000);
}
.wz-alert.tip svg g {
  fill: var(--always_dark, #202124);
}
.wz-alert.page:not(.colored) {
  background-color: var(--background_variant, #f2f4f7);
}
.wz-alert.page.colored.info {
  background-color: var(--surface_variant_blue, #edf8ff);
}
.wz-alert.page.colored.danger {
  background-color: var(--surface_variant_red, #fff1f1);
}
.wz-alert.page.colored.success {
  background-color: var(--surface_variant_green, #eff9f3);
}
.wz-alert.page.colored.warning {
  background-color: var(--surface_variant_yellow, #fffaeb);
}
.wz-alert.page.colored.tip {
  background-color: var(--surface_variant_yellow, #fffaeb);
}
.wz-alert.page {
  border-color: var(--separator_default, #e8eaed);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: var(--content_default, #000000);
}
.wz-alert.page .dismiss {
  color: var(--primary_variant, #0075e3);
}
.wz-alert.grouped {
  background: none;
  border: 0;
  color: inherit;
  padding: 0;
}
```
