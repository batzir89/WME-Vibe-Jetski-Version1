# `wz-menu-chip` Component Specification

This document provides the specification for the Waze Styleguide `wz-menu-chip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-menu-chip`
**Encapsulation:** `shadow`
**Dependencies:** `wz-menu-item`, `wz-menu-chip-base`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `getMenuOptions` | `(query: string) => IMenuChipOption[] \| Promise<IMenuChipOption[]>` | `null` | returns list of available menu options |
| `placeholder` | `string` | `""` | String that will be displayed in the chip when there's no selection |
| `selectedOption` | `IMenuChipOption` | `null` |  |
| `shouldAddSearch` | `boolean` | `false` | Boolean to add search and filter abilities to the drop down menu |

### Slots
*No slots defined.*

### Events
- `changedOptions`: Event that fires upon menu item click
This provides the change between the previous state and the new state
For unselect - we will have the last selected values with isSelected=false

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        var _a;
        return (h("wz-menu-chip-base", { key: '10428ad635c90f63bfa919cf878732aa91330482', ref: (el) => (this.wzMenuChipBase = el), displayName: this.getDisplayName(), shouldAddSearch: this.shouldAddSearch, isOptionSelected: this.isOptionSelected(), onSearchTermChanged: (e) => this.filterMenuOptions(e.detail) }, h("slot", { key: 'b024ec7ca3f3d7b04cc9f0b3e48ffd0c33fcbb04', name: "icon", slot: "icon" }), ((_a = this.displayedOptionsList) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? this.displayedOptionsList.map((menuOption) => {
                return this.getMenuItem(menuOption);
            })
            : null));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
.checked {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
```
