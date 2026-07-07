# `wz-section-header` Component Specification

This document provides the specification for the Waze Styleguide `wz-section-header` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-section-header`
**Encapsulation:** `shadow`
**Dependencies:** `wz-button`, `wz-menu`, `wz-overline`, `wz-subhead4`, `wz-h6`, `wz-caption`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `backButton` | `boolean` | `false` | Should the section header have a back button |
| `headline` | `string` | `` | Main headline of the section header |
| `hideBottomBorder` | `boolean` | `false` | Should the border on the bottom of the section header be hidden |
| `imageSrc` | `string` | `` | Image url of leading image |
| `size` | `"section-header1" \| "section-header2" \| "section-header3"` | `"section-header1"` | Size permutation of the section header |
| `subtitle` | `string` | `` | Secondary text of the section header |

### Slots
| Slot | Description |
| :--- | :--- |
| `actions` | The action buttons on the end of the section header |
| `dropdown-items` | The list of items in dropdown menu |
| `icon` | Icon positioned before back and text |

### Events
- `backClicked`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const hasIcon = this.hasSlot("icon");
        const hasImage = !hasIcon && Boolean(this.imageSrc);
        const hasActions = this.hasSlot("actions");
        const hasDropdown = this.hasSlot("dropdown-items");
        const componentClass = {
            "wz-section-header": true,
            sh1: this.size === "section-header1",
            "wz-section-header-bottom-border": !this.hideBottomBorder,
        };
        return (h("div", { key: 'e08c47489c002847b554d9aee750da7a65854a86', class: componentClass }, this.backButton && this.renderBackButton(), hasIcon && this.renderIcon(), hasImage && h("img", { key: 'a639a14a2a9d8da27dc12a89ae6afd0418be03ed', src: this.imageSrc }), h("div", { key: 'a00d2283a9137cdb4b854be7284294d5eaec22e1', class: "text-wrapper" }, this.renderHeadline(), !!this.subtitle && this.renderSubtitle()), hasDropdown && (h(Fragment, { key: '19a0c786c8ceeee1a9cbac2cf4716aec9298913b' }, this.renderDropdownButton(), this.renderDropdownMenu())), hasActions && this.renderActions()));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
wz-section-header {
  color: var(--content_p1, #3c4043);
}

svg {
  color: var(--content_p1, #3c4043);
}

/**
  * @prop --wz-section-header-horizontal-padding
  */
.wz-section-header {
  --wz-menu-margin-top: 0;
  align-items: center;
  background-color: var(--background_default, #ffffff);
  border-bottom: 1px solid transparent;
  color: var(--content_p1, #3c4043);
  display: flex;
  height: 47px;
  padding: 0 var(--wz-section-header-horizontal-padding, var(--space-always-m, 16px));
  position: relative;
}
.wz-section-header.wz-section-header-bottom-border {
  border-bottom-color: var(--separator_default, #e8eaed);
}
.wz-section-header.sh1 {
  height: 67px;
}
.wz-section-header .text-wrapper {
  overflow: hidden;
}
.wz-section-header .text-wrapper .headline {
  color: var(--content_p1, #202124);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wz-section-header .text-wrapper .headline.headline-sh1 {
  color: var(--content_default, #3c4043);
}
.wz-section-header .text-wrapper .subtitle {
  color: var(--content_p3, #72767d);
  display: block;
  overflow: hidden;
  padding-top: var(--space-xxs, 4px);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wz-section-header .text-wrapper .subtitle.subtitle-sh3 {
  padding-top: var(--space-xxxs, 2px);
}
.wz-section-header .dropdown-button {
  flex: 1;
}
.wz-section-header .wz-menu-dropdown {
  --wz-menu-max-width: 100%;
  box-sizing: border-box;
  left: calc(0px - var(--wz-section-header-horizontal-padding, var(--space-always-m, 16px)));
  padding: inherit;
  position: absolute;
  top: 100%;
  width: 100%;
}
.wz-section-header .icon {
  color: var(--leading_icon, #90959c);
  font-size: 22px;
  height: 22px;
  margin-inline-end: var(--space-always-xs, 8px);
  width: 22px;
}
.wz-section-header svg {
  color: var(--content_p1, #3c4043);
}
.wz-section-header img {
  height: 32px;
  margin-inline-end: var(--space-always-xs, 8px);
  width: 32px;
}
.wz-section-header ::slotted(wz-button:not(:last-child)) {
  margin-inline-end: var(--space-always-xxs, 4px);
}
.wz-section-header .actions {
  display: block;
  margin-inline-start: var(--space-always-xs, 8px);
  margin-left: auto;
  white-space: nowrap;
}
```
