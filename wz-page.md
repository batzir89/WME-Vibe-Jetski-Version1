# `wz-page` Component Specification

This document provides the specification for the Waze Styleguide `wz-page` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-page`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `autoExpandOnHover` | `boolean` | `true` | Whether to expand navigation drawer on hover in collapsed state |
| `collapsedMode` | `"none" \| "side"` | `null` | Whether to display navigation drawer in collapsed mode relative to the page content side: on the side, pushing the content none: not to display |
| `expandedMode` | `"over" \| "side"` | `null` | Whether to display navigation drawer in expanded mode relative to the page content side: on the side, pushing the content over: over the content with a backdrop behind |
| `hoverExpandedMode` | `"over" \| "side"` | `null` | Whether to display navigation drawer in hover expanded mode relative to the page content side: on the side, pushing the content over: over the content with a backdrop behind |
| `isCollapsed` | `boolean` | `false` | Whether the navigation drawer is in expanded or collapsed state |
| `isCollapsedLabeled` | `boolean` | `false` | Whether the navigation drawer in collapsed-labeled state |

### Slots
| Slot | Description |
| :--- | :--- |
| `default (no name)` | Should include wz-navigation-drawer and wz-page-content components |

### Events
*No events defined.*

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const backdropClass = {
            "wz-navigation-backdrop": true,
            shown: !this.isCollapsed && this.currentExpandedMode === "over",
        };
        const shouldWrapperHaveOverClass = this.currentExpandedMode === "over" ||
            (this.isShownByHover && this.hoverExpandedMode === "over");
        const pageWrapperClass = {
            "wz-page-wrapper": true,
            over: shouldWrapperHaveOverClass,
        };
        // Adding a div in the size of the collpased drawer in order to prevent the page-content blinking on expanding/collapsing the drawer
        // in expand 'over' mode and collapsed 'side' mode.
        const hasNavigationBackground = shouldWrapperHaveOverClass && this.currentCollapsedMode === "side";
        return (h(Host, { key: '7ea36a2b9bfc77c8a382abf33e0d9a28186d58c3' }, h("div", { key: '18bdc70408b91d3323d44c12843074c0f41306ba', class: backdropClass, onClick: () => this.backdropClicked() }), h("div", { key: 'd7eec2d5213262bc599e966d7d8276568d7e6494', class: pageWrapperClass }, hasNavigationBackground && h("div", { key: '467f220bbec330e5266282e11dc8952a7f51eb5a', class: "wz-navigation-background" }), h("slot", { key: '6d0dfc34759efb22fd774de4797f0fdefba5401d' }))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  --drawer_button_width: 48px;
  --drawer_collapse_width: calc(var(--drawer_button_width) + var(--wz_drawer_spacing_horizontal) * 2);
  --wz_drawer_spacing_horizontal: 12px;
  display: block;
  overflow: hidden;
  position: relative;
  z-index: 1001;
}

::slotted(img) {
  padding: 0 var(--space-always-l, 24px);
  width: 216px;
}

.wz-page-wrapper {
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.wz-navigation-background {
  height: 100%;
  width: var(--drawer_collapse_width);
}

.wz-navigation-backdrop {
  background-color: var(--always_black, #000000);
  bottom: 0;
  left: 0;
  opacity: 0.5;
  position: absolute;
  right: 0;
  top: 0;
  visibility: hidden;
  z-index: 2;
}
.wz-navigation-backdrop.shown {
  visibility: visible;
}

.over ::slotted(wz-navigation-drawer) {
  position: absolute;
}

/**
* @prop --wz_drawer_spacing_horizontal: Horizontal spacing of the drawer. Default: `"12px"`
*/
```
