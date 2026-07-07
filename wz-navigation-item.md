# `wz-navigation-item` Component Specification

This document provides the specification for the Waze Styleguide `wz-navigation-item` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-navigation-item`
**Encapsulation:** `shadow`
**Dependencies:** `wz-caption`, `wz-body2`, `wz-subhead4`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether the navigation item is disabled |
| `isCollapsed` | `boolean` | `false` |  |
| `isCollapsedLabeled` | `boolean` | `false` |  |
| `isSubItem` | `boolean` | `false` |  |
| `parentWithIcon` | `boolean` | `false` |  |
| `selected` | `boolean` | `false` | Whether the navigation item is selected |
| `startSubItemsExpanded` | `boolean` | `false` | Whether to first render the sub menu opened or closed |

### Slots
| Slot | Description |
| :--- | :--- |
| `default (no name)` | Item text, icon and badge (optional) should go here |
| `subitem` | For nested navigation subitems, rendered in a dropdown |

### Events
- `itemSelected`: Emits when interaction occurs
- `subItemsExpandedEvent`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const hasSubItems = this.hasSubItems();
        const hasIcon = this.hasIcon();
        const wrapperClass = {
            "wz-navigation-item": true,
            collapsed: this.isCollapsed,
            "collapsed-labeled": this.isCollapsedLabeled,
            "subitems-expanded": this.startSubItemsExpanded,
        };
        const componentClass = {
            "navigation-button": true,
            selected: this.selected,
            "with-sub-items": hasSubItems,
            "is-sub-item": this.isSubItem,
            "icon-offset": this.parentWithIcon && !hasIcon,
        };
        const subItems = hasSubItems && (h("div", { key: '25c1b53aae1a8f11ac756c17bdd99e046e9116c3', class: "sub-items-wrapper" }, h("slot", { key: '9df9f78e67a89204b659374b7f5523aa0a9c5546', name: "subitem" })));
        const itemContentPart = this.isCollapsedLabeled ? (h("wz-caption", { class: "item-content" }, h("slot", null))) : this.isSubItem ? (h("wz-body2", { class: "item-content" }, h("slot", null))) : (h("wz-subhead4", { class: "item-content" }, h("slot", null)));
        return (h("div", { key: 'ea7fb109dd72f16f35187ef8e28e82b8a17a4dec', class: wrapperClass }, h("button", { key: 'f7586f0e7912576c8d604b401030559025706e6f', class: componentClass, disabled: this.disabled, onClick: (e) => this.onClick(e) }, h("span", { key: '5670bf258af14574ab72d29f2f62b0d326668bc1', class: "color-layer" }), hasSubItems && getChevronDownIcon(), itemContentPart, h("wz-caption", { key: '61261d6694f359a1b8bf295d8ae8a329dcd59e1c', class: "indicator" }, h("slot", { key: '39a2b6068fb9b04c34aea5fbd37fab99a82a1b79', name: "indicator" }))), subItems));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-navigation-item .navigation-button {
  align-items: center;
  background-color: transparent;
  border: 0;
  color: var(--content_p2, #55595e);
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  height: 48px;
  justify-content: flex-start;
  letter-spacing: 0.3px;
  min-width: 48px;
  outline: none;
  padding-bottom: 0;
  padding-inline-end: var(--space-always-m, 16px);
  padding-inline-start: calc(var(--wz_drawer_spacing_horizontal, var(--space-always-s, 12px)) + var(--space-always-s, 12px));
  padding-top: 0;
  position: relative;
  text-align: center;
  text-decoration: unset;
  user-select: none;
  white-space: nowrap;
  width: calc(100% - 8px);
}
.wz-navigation-item .navigation-button .color-layer {
  border-bottom-right-radius: 24px;
  border-top-right-radius: 24px;
  height: 100%;
  left: 0;
  opacity: 1;
  pointer-events: none;
  position: absolute;
  right: 0;
  width: auto;
}
.wz-navigation-item .navigation-button.with-sub-items {
  padding-inline-start: var(--space-always-xxs, 4px);
}
.wz-navigation-item .navigation-button.with-sub-items .item-content {
  padding-inline-start: var(--space-always-xxs, 4px);
}
.wz-navigation-item .navigation-button.is-sub-item {
  padding-inline-start: var(--space-always-xxl, 40px);
}
.wz-navigation-item .navigation-button.is-sub-item.icon-offset {
  padding-inline-start: var(--space-always-xxxl, 64px);
}
.wz-navigation-item .navigation-button svg {
  transition: 0.2s transform ease-in-out;
  z-index: 4;
}
.wz-navigation-item .navigation-button.selected {
  color: var(--primary_variant, #0075e3);
}
.wz-navigation-item .navigation-button.selected .color-layer {
  background-color: var(--primary_variant, #0075e3);
  opacity: 0.1;
}
.wz-navigation-item .navigation-button.selected ::slotted([slot=indicator]) {
  color: var(--primary_variant, #0075e3);
}
.wz-navigation-item .navigation-button.selected.with-sub-items {
  background-color: var(--background_default, #ffffff);
}
.wz-navigation-item .navigation-button:hover:not(.selected) {
  color: var(--content_default, #202124);
}
.wz-navigation-item .navigation-button:hover:not(.selected) .color-layer {
  background-color: var(--surface_default, #f2f4f7);
  opacity: 1;
}
.wz-navigation-item .navigation-button:hover:not(.selected) ::slotted([slot=indicator]) {
  color: var(--content_default, #202124);
}
.wz-navigation-item .navigation-button:disabled {
  background-color: var(--background_default, #ffffff);
  color: var(--disabled_text, #b7babf);
}
.wz-navigation-item .navigation-button:disabled ::slotted([slot=indicator]) {
  color: var(--disabled_text, #b7babf);
}
.wz-navigation-item.collapsed .navigation-button {
  margin: 0 var(--wz_drawer_spacing_horizontal, var(--space-always-s, 12px));
  padding-inline-end: var(--space-always-s, 12px);
  padding-inline-start: var(--space-always-s, 12px);
  width: var(--drawer_button_width, 48px);
}
.wz-navigation-item.collapsed .navigation-button .color-layer {
  border-radius: 100%;
}
.wz-navigation-item.collapsed svg {
  left: 0;
  position: absolute;
}
.wz-navigation-item.collapsed .item-content {
  visibility: hidden;
}
.wz-navigation-item.collapsed .item-content ::slotted(i.w-icon) {
  visibility: visible;
}
.wz-navigation-item.collapsed .sub-items-wrapper {
  display: none;
}
.wz-navigation-item.collapsed ::slotted([slot=indicator]) {
  display: none;
}
.wz-navigation-item.subitems-expanded svg {
  transform: rotate(180deg);
}
.wz-navigation-item.subitems-expanded ::slotted([slot=subitem]) {
  display: block;
}
.wz-navigation-item.collapsed-labeled .navigation-button {
  height: auto;
  padding: var(--wz-navigation-button-horizontal-padding, var(--space-m, 16px)) var(--space-always-xxs, 4px);
  width: 80px;
}
.wz-navigation-item.collapsed-labeled .navigation-button .color-layer {
  border-radius: 0;
}
.wz-navigation-item.collapsed-labeled .navigation-button:hover:not(.selected) {
  color: var(--content_p2, #55595e);
}
.wz-navigation-item.collapsed-labeled .navigation-button:hover:not(.selected) .color-layer {
  background-color: var(--ink_on_primary, #202124);
  opacity: 0.04;
}
.wz-navigation-item.collapsed-labeled .navigation-button:active:not(.selected) .color-layer {
  background-color: var(--ink_on_primary, #202124);
  opacity: 0.1;
}
.wz-navigation-item.collapsed-labeled .item-content {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-height: 18px;
  overflow-wrap: break-word;
  text-align: center;
  white-space: initial;
}
.wz-navigation-item.collapsed-labeled .item-content ::slotted(i.w-icon) {
  display: block !important;
  margin: auto;
}
.wz-navigation-item .item-content {
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
  width: 100%;
  z-index: 4;
}
.wz-navigation-item ::slotted(i.w-icon) {
  font-size: 24px;
  margin-inline-end: var(--space-always-m, 16px);
}
.wz-navigation-item ::slotted(wz-badge) {
  margin-inline-start: var(--space-always-xs, 8px);
}
.wz-navigation-item ::slotted([slot=indicator]) {
  color: var(--content_p1, #3c4043);
}
.wz-navigation-item ::slotted([slot=subitem]) {
  display: none;
}
.wz-navigation-item .sub-items-wrapper {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  position: relative;
  right: 0;
  top: 0;
}
.wz-navigation-item .indicator {
  margin-inline-start: auto;
  z-index: 4;
}

:host([dir=rtl]) .wz-navigation-item:not(.collapsed-labeled) .navigation-button .color-layer,
:host-context([dir=rtl]) .wz-navigation-item:not(.collapsed-labeled) .navigation-button .color-layer {
  border-radius: 24px 0 0 24px;
}
:host([dir=rtl]) .wz-navigation-item:not(.collapsed-labeled).collapsed .navigation-button svg,
:host-context([dir=rtl]) .wz-navigation-item:not(.collapsed-labeled).collapsed .navigation-button svg {
  left: unset;
  right: 0;
}
```
