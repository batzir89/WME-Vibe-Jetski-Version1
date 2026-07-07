# `wz-menu-multi-select-chip` Component Specification

This document provides the specification for the Waze Styleguide `wz-menu-multi-select-chip` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-menu-multi-select-chip`
**Encapsulation:** `shadow`
**Dependencies:** `wz-menu-item`, `wz-checkbox`, `wz-button`, `wz-body2`, `wz-menu-chip-base`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `getMenuOptions` | `(query: string) => IMenuChipItem[] \| Promise<IMenuChipItem[]>` | `null` | returns list of available menu options |
| `placeholder` | `string` | `""` | String that will be displayed in the chip when there's no selection |
| `searchPlaceholder` | `string` | `""` | Placeholder string for search bar |
| `selectAllLabel` | `string` | `""` | Label of the Select All button |
| `selectedOptions` | `IMenuChipOption[]` | `[]` |  |

### Slots
*No slots defined.*

### Events
- `optionsSelected`: Event that fires upon menu item click
This all options that are currently selected

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        var _a;
        const isAllOptionsSelected = this.selectedOptions.length === this.displayedOptions.length;
        const isAnyOptionSelected = this.selectedOptions.length > 0;
        return (h("wz-menu-chip-base", { key: 'b74e7e348005c99fde5aaf50bb231e9e088a58df', ref: (el) => (this.wzMenuChipBase = el), displayName: this.getDisplayName(), searchPlaceholder: this.searchPlaceholder, isOptionSelected: isAnyOptionSelected, closeMenuOnClick: false, onSearchTermChanged: (e) => this.onSearchTermChanged(e.detail) }, h("div", { key: '382be7964aca2ed9797e4267067f571a3ca9bed9', class: "options", slot: "menu-options", ref: (node) => (this.optionsDiv = node) }, ((_a = this.displayedItemsList) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? this.displayedItemsList.map((menuOption) => {
                return this.getMenuItem(menuOption);
            })
            : null), !this.searchTerm && (h("div", { key: '7eac54554ed4d7380a7a7dfa453bd5f877a6867c', class: "select-all", slot: "menu-options" }, h("wz-menu-item", { key: 'bec88d765df20f4d9c84b6817c7b4b489b1723ee', onClick: () => {
                if (isAllOptionsSelected) {
                    this.selectedOptions = [];
                }
                else {
                    this.selectedOptions = [...this.displayedOptions];
                }
            } }, h("wz-checkbox", { key: '99ad8b6fbb551f80e7185adfb58ae82c4f4ebf9d', checked: isAllOptionsSelected }, this.selectAllLabel))))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  --wz-option-height: 36px;
  --wz-menu-max-height: 324px;
  /**
  * @prop --wz-menu-chip-options-max-height: Max height of options menu.
  *       Default:	`216px`
  */
}

.options {
  max-height: var(--wz-menu-chip-options-max-height, 216px);
  overflow-y: scroll;
}
.options wz-checkbox {
  width: 100%;
}
.options .checkbox-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-all {
  border-top: 1px solid var(--hairline, #d5d7db);
  padding-top: var(--space-xs, 8px);
}

.category {
  border-bottom: 1px solid var(--hairline, #d5d7db);
  border-top: 1px solid var(--hairline, #d5d7db);
}
.category .category-header {
  color: var(--content_p2, #55595e);
  display: block;
  line-height: var(--wz-option-height, 36px);
  padding: 0 12px;
}
```
