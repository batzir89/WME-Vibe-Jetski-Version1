# `wz-list-item` Component Specification

This document provides the specification for the Waze Styleguide `wz-list-item` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-list-item`
**Encapsulation:** `shadow`
**Dependencies:** `wz-subhead4`, `wz-body2`, `wz-caption`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `clickable` | `boolean` | `false` | The list item is clickable and hoverable. |
| `disabled` | `boolean` | `false` | The list item is disabled. |
| `expanded` | `boolean` | `false` |  |
| `imageSrc` | `string` | `` | The url of the item avatar image. |
| `itemKey` | `string` | `` | The key of the item |
| `selected` | `boolean` | `false` | The list item is selected. |
| `subtitle` | `string` | `` | The subtitle of the item key |
| `value` | `string` | `` | The value of the item |

### Slots
| Slot | Description |
| :--- | :--- |
| `actions` | The actions section of the list item |
| `default (no slot name)` | The subItems of the list item - Should use wz-list-item as subitem |
| `icon` | The icon of the list item |
| `image` | The image of the list item |
| `item-key` | The key of the list item |
| `subtitle` | The subtitle of the list item key |
| `value` | The value of the list item |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const hasIcon = this.hasSlot("icon");
        const iconPart = hasIcon && (h("div", { key: 'aad36548c0f8c14898349bcda8c671fc555df011', class: "icon" }, h("slot", { key: '45180e4a7a8226cf7149049e16312aa5edfc3a55', name: "icon" })));
        const hasSlottedImage = this.hasSlot("image");
        const hasImage = hasSlottedImage || Boolean(this.imageSrc);
        const imagePart = hasImage && (h("div", { key: '44164da7681e953b941f7cd69933f2be732df2e6', class: "image" }, h("slot", { key: '6958b18333c8e87e317e8a3605d8ad6cc362378a', name: "image" }, !hasSlottedImage && h("img", { key: '1d4c80762e964fcdba6ad3bea09242ca9531cd89', src: this.imageSrc }))));
        const hasSlottedSubtitle = this.hasSlot("subtitle");
        const hasSubtitle = hasSlottedSubtitle || Boolean(this.subtitle);
        const subtitlePart = hasSubtitle && (h("wz-caption", { key: '125465fe7ac0344c6d92b5888ef6c2d5cb44a7f7', class: "subtitle" }, h("slot", { key: 'f6374d0ce96be8f6edc926b62756fd631f6a7a87', name: "subtitle" }, !hasSlottedSubtitle && this.subtitle)));
        const hasSlottedValue = this.hasSlot("value");
        const hasValue = hasSlottedValue || Boolean(this.value);
        const valuePart = hasValue && (h("wz-body2", { key: '4e59017e7ddc98d84ba8d5d10c3463466edf4cdd', class: "value" }, h("slot", { key: '36156f58de71d6860ab6408f279638362b8824ce', name: "value" }, !hasSlottedValue && this.value)));
        const keyPart = this.getKeyPart(hasValue);
        const actionsPart = this.hasSlot("actions") && (h("div", { key: 'be2669e9cc53e16cfce77b75ce29d4f45bca0753', class: "actions" }, h("slot", { key: '10183d3e6750c17c833c8d5776c9ee53e9ba263c', name: "actions" })));
        const hasSubItems = this.getSubItems().length > 0;
        const subItemsPart = hasSubItems && (h("div", { key: '608428acd7eaf041eed222baeb616e0a5af4a45a', class: "sub-items-wrapper" }, h("slot", { key: 'c3103c25120f1e03bcc9ffdb4e79268e931bddb7' })));
        const isClickable = Boolean(this.clickable);
        const isSelected = Boolean(this.selected);
        const isDisabled = Boolean(this.disabled);
        const componentClass = {
            "wz-list-item": true,
            "with-subtitle": hasSubtitle,
            "with-image": hasImage,
            "with-icon": hasIcon,
            "with-sub-items": hasSubItems,
            clickable: isClickable,
            selected: isSelected,
            disabled: isDisabled,
            expanded: this.expanded,
        };
        return (h("div", { key: 'ebd65a611b9fcbd6dae58c936ee5504403dd6ce0', class: componentClass, tabIndex: this.clickable ? -1 : null }, h("div", { key: '0313888b51119ab463fdf5ffcfcabafad012d461', class: "list-item-wrapper", onClick: () => (hasSubItems ? this.toggleListItem() : {}) }, h("div", { key: 'c6d9ef72e2e6781f9b2ee89c995ccc4e8ac84706', class: "key-with-actions-wrapper" }, h("div", { key: '24625798bddf7fec5253549a02c2746f86aad012', class: "key-with-image-wrapper" }, hasSubItems && getChevronDownIcon(), iconPart, imagePart, h("div", { key: '5e6983865b5e1a7c04ca24fe91b9cedcb0c6a443', class: "key-wrapper" }, keyPart, subtitlePart)), !hasValue && actionsPart), hasValue && (h("div", { key: 'c16c73b83388f165f7c2bae9f5e933ef22dd0c90', class: "value-wrapper" }, valuePart, actionsPart))), subItemsPart));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.wz-list-item {
  --wz-list-item-vertical-padding: var(--space-m, 16px);
}
.wz-list-item.with-image {
  --wz-list-item-vertical-padding: var(--space-xs, 8px);
}
.wz-list-item.with-icon {
  --wz-list-item-vertical-padding: var(--space-m, 16px);
}
.wz-list-item.with-sub-items {
  --wz-list-item-vertical-padding: var(--space-m, 16px);
}
.wz-list-item.with-sub-items .list-item-wrapper {
  cursor: pointer;
}
.wz-list-item.with-subtitle {
  --wz-list-item-vertical-padding: var(--space-m, 16px);
}
.wz-list-item.with-subtitle.with-image {
  --wz-list-item-vertical-padding: var(--space-xs, 8px);
}
.wz-list-item.expanded svg {
  transform: rotate(180deg);
}
.wz-list-item.expanded .sub-items-wrapper {
  height: auto;
}
.wz-list-item.clickable:hover {
  background-color: var(--ink_on_primary_hovered, rgba(32, 33, 36, 0.04));
}
.wz-list-item.clickable:active {
  background-color: var(--ink_on_primary_pressed, rgba(32, 33, 36, 0.1));
}
.wz-list-item.selected {
  background-color: var(--surface_alt, #e5f6ff);
}
.wz-list-item.disabled * {
  color: var(--disabled_text, #72767d);
}
.wz-list-item .list-item-wrapper {
  display: flex;
  padding: var(--wz-list-item-padding, calc(var(--wz-list-item-vertical-padding, var(--space-m, 16px)) + var(--wz-list-item-vertical-padding-offset, 0px)) 0);
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper {
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: max-content;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper svg {
  color: var(--content_p1, #3c4043);
  margin-inline-end: var(--space-always-xs, 8px);
  transition: 0.2s transform ease-in-out;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper .icon {
  align-self: baseline;
  color: var(--content_p1, #3c4043);
  font-size: 24px;
  height: 24px;
  margin-inline-end: var(--space-always-m, 16px);
  width: 24px;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper .image {
  height: 40px;
  margin-inline-end: var(--space-always-m, 16px);
  width: 40px;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper .key-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper .key-wrapper .key {
  color: var(--content_default, #202124);
  line-height: 20px;
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .key-with-image-wrapper .key-wrapper .subtitle {
  color: var(--content_p3, #72767d);
  margin-top: var(--space-xxxs, 2px);
}
.wz-list-item .list-item-wrapper .key-with-actions-wrapper .actions {
  align-self: center;
}
.wz-list-item .list-item-wrapper .value-wrapper {
  color: var(--content_default, #202124);
  display: flex;
  flex: 2;
  justify-content: space-between;
  margin-inline-start: var(--space-always-m, 16px);
}
.wz-list-item .list-item-wrapper .value-wrapper .value {
  line-height: 20px;
}
.wz-list-item .list-item-wrapper .actions {
  margin-inline-start: var(--space-always-m, 16px);
}
.wz-list-item .sub-items-wrapper {
  --wz-list-item-vertical-padding-offset: calc(var(--space-xxs, 4px) * -1);
  display: flex;
  flex-direction: column;
  height: 0;
  overflow: hidden;
}

.icon ::slotted(img),
.icon ::slotted(.w-icon) {
  height: 24px;
  width: 24px;
}

.image img,
.image ::slotted(img) {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
```
