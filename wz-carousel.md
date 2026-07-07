# `wz-carousel` Component Specification

This document provides the specification for the Waze Styleguide `wz-carousel` component, designed to allow AI systems to perfectly clone the visual and structural characteristics of the component.

## 1. Overview & API
**Tag:** `wz-carousel`
**Encapsulation:** `shadow`
**Dependencies:** `wz-button`

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
        const shouldDisplayLeftScroll = this.shouldDisplayLeftScroll();
        const shouldDisplayRightScroll = this.shouldDisplayRightScroll();
        return (h(Host, { key: '82fa63b2476c25de338108f3889ff1583d82b272' }, h("div", { key: '2cb0f5512240705ab2c713ad324c376a82e2228c', class: "carousel-container" }, shouldDisplayLeftScroll && (h("wz-button", { key: '8f8d8857ea175d762e46c13d88637c6bae3f83df', color: "clear-icon", size: "sm", onClick: this.scrollLeftHandler, class: "carousel-scroll carousel-scroll-left" }, chevronLeft())), h("div", { key: '4282930ba1eb707176da5dd34853ca96dd08a00a', ref: this.setCarouselItemsContainer, class: "carousel-items-container" }, h("slot", { key: '7ec2fcb31a9bbdd5b957ba403f9865717f752990' })), shouldDisplayRightScroll && (h("wz-button", { key: '95e27660e29232208d75f53130cedc705142ae48', color: "clear-icon", size: "sm", onClick: this.scrollRightHandler, class: "carousel-scroll carousel-scroll-right" }, chevronRight())))));
    }
```

---

## 3. Styling (CSS / Visuals)
The exact compiled CSS used to style this component. Use this to extract precise dimensions, flexbox layouts, padding variables (`--space-*`), and color tokens.

```css
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

.carousel-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}
.carousel-container .carousel-scroll {
  --wz-button-background-color: white;
  --wz-button-height: 32px;
  position: absolute;
  z-index: 1;
}
.carousel-container .carousel-scroll.carousel-scroll-left {
  left: var(--space-always-xs, 8px);
}
.carousel-container .carousel-scroll.carousel-scroll-right {
  right: var(--space-always-xs, 8px);
}
.carousel-container .carousel-items-container {
  display: flex;
  flex-direction: row;
  gap: var(--space-always-xs, 8px);
  overflow: hidden;
}
```
