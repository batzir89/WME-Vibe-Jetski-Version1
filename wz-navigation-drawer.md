# `wz-navigation-drawer` Component Specification

This document provides the specification for the Waze Styleguide `wz-navigation-drawer` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-navigation-drawer`
**Encapsulation:** `shadow`

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isCollapsed` | `boolean` | `false` |  |
| `isCollapsedLabeled` | `boolean` | `false` |  |
| `isHidden` | `boolean` | `false` |  |

### Slots
| Slot | Description |
| :--- | :--- |
| `default (no name)` | Slot for navigation sections |
| `image` | Heading image of the navigation drawer |

### Events
- `drawerMouseEnter`: Emits when interaction occurs
- `drawerMouseLeave`: Emits when interaction occurs

---

## 2. Component Structure (DOM)
The internal DOM structure (usually rendered via Stencil's hyperscript `h`) is provided below. This shows exactly how the HTML elements are nested, what classes are conditionally applied, and where the slots are placed.

```javascript
render() {
        const componentClass = {
            "wz-navigation-drawer": true,
            collapsed: this.isCollapsed,
            "collapsed-labeled": this.isCollapsedLabeled,
            hidden: this.isHidden,
        };
        return (h("div", { key: 'f279578dc4190eb8edc03ceef4207f9b6f9612d6', class: componentClass, onMouseEnter: () => this.drawerMouseEnter.emit(), onMouseLeave: () => this.drawerMouseLeave.emit() }, h("slot", { key: '6574467376088c3eebda4519932db1987715dc3c', name: "image" }), h("slot", { key: '49912cd4473abc52f5b32fdb8280ef86fdbc4eb3' })));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  bottom: 0;
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  top: 0;
  z-index: 3;
}

.wz-navigation-drawer {
  background-color: var(--background_default, #ffffff);
  border-inline-end: 1px solid;
  border-inline-end-color: var(--separator_default, #e8eaed);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 264px;
}
.wz-navigation-drawer ::slotted(img) {
  padding: var(--space-l, 24px) var(--space-always-l, 24px) 0;
  width: 216px;
}
.wz-navigation-drawer.collapsed {
  width: var(--drawer_collapse_width);
}
.wz-navigation-drawer.collapsed.hidden {
  display: none;
}
.wz-navigation-drawer.collapsed ::slotted(img) {
  display: none;
}
.wz-navigation-drawer.collapsed-labeled {
  width: 80px;
}
```
