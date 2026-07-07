# WME Vibe Design System Rules

**1. STRICTLY PROTECT THE DESIGN SYSTEM**
Do NOT modify, edit, or refactor ANY files within the `/components/design-system/` directory unless the user explicitly requests a change to the design system itself. The design system is locked and considered stable.

**2. MANDATORY COMPONENT USAGE**
When building new views, features, or UI elements in the main app, you MUST exclusively use the existing `Wz*` components exported from the design system (e.g., `WzButton`, `WzCard`, `WzTextInput`, `WzSectionHeader`, etc.). Do NOT build raw HTML/Tailwind alternatives (like `<button className="...">`) if a valid `Wz*` component exists.

**3. STRICT FOUNDATION TOKENS**
When styling elements and layouts that require raw Tailwind classes, you MUST use the custom design system utility classes provided. 
- Use custom text colors (e.g., `text-content-default`, `text-hint-text`, `text-content-p2`).
- Use custom background and border colors (e.g., `bg-surface-default`, `bg-surface-variant`, `border-hairline`).
- Avoid generic default Tailwind colors (like `text-gray-700` or `bg-blue-500`) unless there is absolutely no system token available for the specific use case.
