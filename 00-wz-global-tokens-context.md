# Waze Design System - Global Tokens & Context

This document contains the required global CSS custom properties (design tokens) and typography definitions needed for the Waze `wz-*` components to render accurately. 
**Crucial Context for AI Implementers:** The component specification files contain fallbacks (e.g. `var(--primary_variant, #0075e3)`), but importing these global tokens guarantees system-wide consistency across states, themes, and layouts.

## 1. Global CSS Variables (Tokens)

Below are the base (Light theme) CSS variables mapped to the `:root`. 

```css
:root {
  /* Alarming (Red) */
  --alarming: #ff5252;
  --alarming_variant: #e42828;

  /* Neutrals / Backgrounds */
  --always_white: #ffffff;
  --always_black: #000000;
  --always_dark: #202124;
  --background_default: #ffffff;
  --background_modal: rgba(32, 33, 36, 0.6);
  --background_variant: #f2f4f7;
  
  /* Brand */
  --brand_carpool: #1ee592;
  --brand_waze: #33ccff;

  /* Cautious (Yellow/Orange) */
  --cautious: #ffc400;
  --cautious_variant: #e37400;

  /* Content / Text */
  --content_default: #202124;
  --content_p1: #3c4043;
  --content_p2: #55595e;
  --content_p3: #72767d;
  --disabled_text: #b7babf;
  --hint_text: #72767d;

  /* Borders / Lines */
  --hairline: #d5d7db;
  --hairline_strong: #90959c;
  --separator_default: #e8eaed;

  /* Safe (Green) */
  --safe: #23cc68;
  --safe_variant: #118742;

  /* Primary (Blue) */
  --primary: #33ccff;
  --primary_variant: #0075e3;
  
  /* Focus State */
  --focus: #33ccff;
  
  /* Theme specific variant overrides */
  --surface_default: #ffffff;
  --surface_variant_blue: #edf8ff;
  --surface_variant_green: #eff9f3;
  --surface_variant_red: #fff1f1;
  --surface_variant_yellow: #fffaeb;
}
```

## 2. Spacing Tokens

```css
:root {
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-s: 12px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  --space-xxl: 40px;
  --space-xxxl: 48px;

  /* "Always" variables exist to maintain spacing regardless of density overrides */
  --space-always-xxs: 4px;
  --space-always-xs: 8px;
  --space-always-s: 12px;
  --space-always-m: 16px;
  --space-always-l: 24px;
  --space-always-xl: 32px;
  --space-always-xxl: 40px;
  --space-always-xxxl: 48px;
}
```

## 3. Typography Core Rules

The components rely on specific Font Families depending on the text type:

**Header Font Family (Headlines, H1-H7):**
`font-family: var(--wz-font-family, "Waze Boing", "Waze Boing HB", "Rubik", sans-serif);`

**Body Font Family (Subheads, Body text, Captions):**
`font-family: var(--wz-font-family, "Rubik", sans-serif);`

*(Note: Provide the standard Google Font for "Rubik" if "Waze Boing" is not available locally for your implementation).*
