Understood. I will remove all light theme-related content from the document, ensuring it exclusively details the dark mode for the Rayovi project.

Here's the revised combined document, focusing solely on the dark theme:

-----

# Rayovi Project Architecture

## Overview

Rayovi is a personal project for YouTube lovers who want to create, rank, and share lists of videos, with features missing from YouTube itself. This is sort of like a ripoff from letterboxd.com site but instead of movies we rank youtube videos. The project is split into a modern React frontend and an Express/Prisma/PostgreSQL backend, with deployment via Docker and Railway.

-----

## Style Guide

  - **Language:** TypeScript (frontend), JavaScript/TypeScript (backend)
  - **Formatting:** Prettier, ESLint, consistent 2-space indentation
  - **Naming:**
      - Components: `PascalCase`
      - Variables/functions: `camelCase`
      - Database tables: `snake_case`
  - **State Management:** React hooks, React Query for async data
  - **API:** RESTful, JSON responses, error handling with standard HTTP codes

-----

## UI

### **🎨 Colors: Rayovi Dark Mode Palette**

This section outlines the specific color values and their application within our UI, designed exclusively for a dark theme to ensure a consistent and harmonious visual experience.

**I. Color Palette Principles**

Our color strategy is built on the following foundational principles for a dark interface:

  * **Neutral Colors for Core Elements:** Backgrounds, text, and borders primarily utilize neutral, darker shades to provide a stable and readable base for the user interface. This minimizes visual clutter and allows important content to stand out.
  * **Brand/Primary Color for Actions & Character:** Our designated primary color (`--primary`) is reserved for key interactive elements like buttons, active states, and to inject the application's unique personality.
  * **Semantic Colors for States:** Specific colors are used consistently to communicate different states or provide immediate feedback to the user, such as success, error, warning, and informational messages.
  * **Emphasis on Shades (Lightness/Luminosity):** We leverage variations in lightness (in HSL) or luminosity (in OKLCH) to create different shades of a color. This is essential for subtle visual cues like hover effects, layered elements, and gradient backgrounds, creating depth within the dark theme.
  * **Intuitive Color Formats (HSL & OKLCH):** We utilize HSL as a fallback and OKLCH as the primary color format. These formats are chosen for their intuitive control over hue, saturation/chroma, and lightness/luminosity, which allows for more perceptually uniform and predictable color palettes, especially in a dark context.

**II. Color Formats Explained**

We define our colors using both HSL (Hue, Saturation, Lightness) and OKLCH (Lightness, Chroma, Hue). OKLCH is the preferred modern format for its perceptual uniformity and better behavior in dark ranges.

  * **HSL (Hue, Saturation, Lightness):**
      * **Hue (H):** Represents the actual color (e.g., red, blue, green) on a color wheel, ranging from 0 to 360 degrees.
      * **Saturation (S):** Controls the intensity or purity of the color, from 0% (grayscale) to 100% (full color). For neutral colors, saturation is typically 0%.
      * **Lightness (L):** Determines how light or dark the color is, from 0% (black) to 100% (white). This is our primary tool for creating shades within a neutral palette.
  * **OKLCH (Lightness, Chroma, Hue):**
      * **Lightness (L):** Represents perceived lightness, ranging from 0 (black) to 1 (white).
      * **Chroma (C):** Similar to saturation, it quantifies the colorfulness. For UI work, values typically range from 0 to around 0.4, but can go higher. OKLCH's chroma is designed to be perceptually uniform, meaning equal changes in chroma lead to equally perceived changes in color intensity.
      * **Hue (H):** The same as HSL's hue, ranging from 0 to 360 degrees.

**III. CSS Color Variables**

Our dark mode color palette is defined using CSS Custom Properties (variables) for easy management and consistency. Fallback HSL values are provided for broader browser support.

```css
:root {
  /* Dark Mode */

  /* HSL (fallback color) */
  --bg-dark-hsl: hsl(1 37% 2%);
  --bg-hsl: hsl(1 23% 5%);
  --bg-light-hsl: hsl(2 13% 9%);
  --text-hsl: hsl(2 100% 96%);
  --text-muted-hsl: hsl(2 12% 71%);
  --highlight-hsl: hsl(2 8% 40%);
  --border-hsl: hsl(2 10% 29%);
  --border-muted-hsl: hsl(1 14% 19%);
  --primary-hsl: hsl(0 66% 75%);
  --secondary-hsl: hsl(183 52% 57%);
  --danger-hsl: hsl(9 26% 64%);
  --warning-hsl: hsl(52 19% 57%);
  --success-hsl: hsl(146 17% 59%);
  --info-hsl: hsl(217 28% 65%);

  /* oklch */
  --bg-dark: oklch(0.1 0.01 20);
  --bg: oklch(0.15 0.01 20);
  --bg-light: oklch(0.2 0.01 20);
  --text: oklch(0.96 0.02 20);
  --text-muted: oklch(0.76 0.02 20);
  --highlight: oklch(0.5 0.02 20);
  --border: oklch(0.4 0.02 20);
  --border-muted: oklch(0.3 0.02 20);
  --primary: oklch(0.76 0.1 20);
  --secondary: oklch(0.76 0.1 200);
  --danger: oklch(0.7 0.05 30);
  --warning: oklch(0.7 0.05 100);
  --success: oklch(0.7 0.05 160);
  --info: oklch(0.7 0.05 260);
}
```

**Naming Convention Notes:**

  * For neutral backgrounds: `--bg-dark`, `--bg`, `--bg-light` indicate a progression from darker to lighter shades *within the dark mode palette*. `--bg-dark` is the deepest background, while `--bg-light` is for elevated elements like cards.
  * For HSL fallbacks, a `-hsl` suffix is used to clearly distinguish them from the preferred OKLCH variables.

**IV. Application of Colors in UI Elements**

This section describes how the defined color variables are applied to common UI components within the dark theme.

  * **Backgrounds (`--bg`, `--bg-light`, `--bg-dark`):**
      * The `body` will use `--bg` for the main page background.
      * `--bg-light` will be used for elevated surfaces like `🧱 Cards`, modals, and raised elements. This subtle shift in lightness creates depth.
      * `--bg-dark` might be used for deeper background areas or the `🧭 Navigation Bar` background, providing a strong contrast to lighter foreground elements or emphasizing depth.
  * **Text (`--text`, `--text-muted`):**
      * `--text` is for primary content, headings (`🔤 Typography - Heading`, `H1`, `H2`), and important labels, ensuring high contrast and legibility.
      * `--text-muted` (`🔤 Typography - Caption`) is for secondary information, descriptions, and less prominent text, providing visual hierarchy without being difficult to read.
  * **Borders (`--border`, `--border-muted`, `--highlight`):**
      * `--border` for general element outlines.
      * `--border-muted` for subtle dividers or less emphasized borders, like the `🧭 Navigation Bar` bottom border.
      * `--highlight` is specifically for top borders or subtle shines, creating a sense of light coming from above, which is particularly effective in dark mode.
      * `Inputs` will have a focus border using `--primary`.
  * **Gradients:**
      * Gradients should primarily use subtle shifts between `--bg`, `--bg-light`, and `--bg-dark` to create depth and visual interest without being distracting. Consider applying these on hover for interactive elements to add a dynamic effect.
  * **Shadows:**
      * `Shadow: shadow-md shadow-black/20` for `🧱 Cards` will be implemented using a very dark, semi-transparent color (e.g., `oklch(0 0 0 / 0.2)`).
      * Shadows are crucial for adding depth. Combine a darker, shorter shadow with a lighter, more diffused long shadow for a realistic effect, hinting at ambient light.
  * **Primary Actions (`--primary`):**
      * Buttons designated as `Primary` will use `--primary` for their background. The hover state will be a slightly adjusted shade of `--primary` (e.g., `hover:bg-[oklch(from_var(--primary)_l_c_h_/_0.9)]` for a slightly darker shade). Text will be `--text`.
  * **Secondary Actions (`--secondary`):**
      * Buttons designated as `Secondary` will use `--border` for their background, with `hover:bg-[oklch(from_var(--border)_l_c_h_/_1.1)]` being a slightly lighter version for hover. Text will be `--text`, and border will be `--border-muted`.
  * **Semantic Colors (`--danger`, `--warning`, `--success`, `--info`):**
      * Applied consistently to communicate specific states to the user (e.g., error messages, form validation feedback, success notifications). Badges with a red background will use `--primary`.
  * **Hover Effects (Material 3 Integration):**
      * All interactive components (`Cards`, `List Items`, `Member Cards`, `Video Cards`, `Category Cards`, `Buttons`, `Icons`, `Nav items`) will use a **state layer** for hover, focus, and pressed states.
      * Overlay color is typically the primary color (`[var(--primary)]`) or on-surface color (`[var(--text)]` or a neutral color appropriate for the overlay).
      * Opacity for hover is usually `~8%` (e.g., `bg-[var(--primary)]/8` or `bg-[var(--text)]/8`).
      * The overlay should be softly clipped to the component’s shape (e.g., `rounded-[inherit]`).
      * **Implementation:** Use CSS like `after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[var(--primary)]/8 after:pointer-events-none` for state layers.
      * **No scale/zoom or large shadow on hover for Cards/List Items**—only a soft elevation and overlay.
      * Buttons may have slight scale/active effects, as noted in the `🔘 Buttons` section.

### V. Theme Implementation (CSS)

  * **CSS Structure:**
      * All color variables are defined within the `:root` selector, establishing them as the global dark theme for the application.
  * **No Toggling:** Since only dark mode is supported, no specific JavaScript toggle or media queries for theme switching are necessary. The application will consistently display the dark theme.

### **📐 Layout**

  - Max width: `max-w-6xl mx-auto` (for main content containers)
  - Page padding: `px-4 md:px-8 pt-6` (consistent spacing around content)
  - Section spacing: `space-y-6` (vertical spacing between major content blocks)
  - Use `flex` or `grid` with gap: `gap-4 md:gap-6` (for spacing between elements within sections)

### **🧱 Cards**

  - Background: `bg-[var(--bg-light)]` (using the defined CSS variable for card surface)
  - Border-radius: `rounded-lg`
  - Shadow: `shadow-md shadow-[oklch(0_0_0_/_0.2)]` (using OKLCH for consistent shadow color with transparency)
  - Padding: `p-4 md:p-6`

### **🔘 Buttons**

### Primary

  - Background: `bg-[var(--primary)] hover:bg-[oklch(from_var(--primary)_l_c_h_/_0.9)]` (using CSS variable for primary, slightly darker OKLCH for hover, or a calculated slight adjustment to primary's lightness/luminosity)
  - Text: `text-[var(--text)]` (main text color, ensuring contrast)
  - Padding: `px-4 py-2`
  - Rounded: `rounded-full`
  - Font-weight: `font-semibold`
  - Shadow: `shadow` (standard shadow)

### Secondary

  - Background: `bg-[var(--border)] hover:bg-[oklch(from_var(--border)_l_c_h_/_1.1)]` (using CSS variable for border color, slightly lighter OKLCH for hover, or a calculated slight adjustment)
  - Text: `text-[var(--text)]`
  - Border: `border border-[var(--border-muted)]`
  - Rounded: `rounded-full`

### **🔤 Typography**

  - Font: `Roboto`, fallback `sans-serif` (defined via CSS import)
  - Heading: `text-[var(--text)] font-bold`
  - H1: `text-3xl md:text-4xl`
  - H2: `text-2xl md:text-3xl`
  - Body: `text-base text-[var(--text)]`
  - Caption: `text-sm text-[var(--text-muted)]`

### **🧭 Navigation Bar**

  - Background: `bg-[var(--bg-dark)] border-b border-[var(--border-muted)]`
  - Logo: `text-[var(--primary)]` (or a variation using --text depending on design)
  - Item hover: `hover:text-[var(--primary)]`
  - Active item: `text-[var(--primary)] font-semibold`

### **🎥 Media Thumbnails / Cards**

  - Aspect ratio: `aspect-video`
  - Rounded: `rounded-lg`
  - Hover effect: This will be implemented using Material 3 state layers as described in `🟣 Material 3 Hover Effects`. The `hover:scale-[1.02] transition` should be reconsidered/replaced for cards to align with Material 3 principles of no scaling for cards. Instead, subtle elevation via shadow changes and state layers should be preferred.

### **🧩 Components**

  - **Inputs:** `bg-[var(--bg-light)]` field, `placeholder:text-[var(--text-muted)]`, `focus:border-[var(--primary)]`
  - **Tabs:** Underlined with `[var(--primary)]` when active
  - **Badges:** `bg-[var(--primary)] text-[var(--text)] rounded-full px-2 py-0.5 text-xs`

### **🎬 Animation Utilities**

  - **Card animations:** `transition-all duration-300 ease-out` for general property changes. **Remove `hover:scale-[1.02] hover:shadow-xl` for cards if strictly adhering to Material 3 hover guidelines for cards.**
  - **Button animations:** `transition-all duration-200 ease-out hover:scale-105 active:scale-95` (Slight scale/active effects are acceptable for buttons).
  - **List item animations:** `transition-all duration-200 ease-out hover:bg-[var(--primary)]/8` (using state layer for hover)
  - **Staggered animations:** Use `delay-[50ms]`, `delay-[100ms]`, `delay-[150ms]` for sequential effects
  - **Loading animations:** `animate-pulse` for skeleton states
  - **Fade in animations:** `animate-in fade-in duration-500` for page transitions
  - **Slide animations:** `animate-in slide-in-from-bottom duration-300` for modals

### **⚙️ Design Language**

  - Follow Material 3 expressive physics:
      - **Spring animations:** Natural, bouncy transitions with easing curves
      - **Staggered animations:** Sequential element animations for visual flow
      - **Micro-interactions:** Subtle feedback on hover, focus, and click
      - **Elevation changes:** Dynamic shadows that respond to interaction
      - **Ripple effects:** Material-style touch feedback (requires specific implementation, e.g., Radix UI's `hover-layer` or custom JS)
      - **Smooth transitions:** 200-300ms duration with ease-out curves
  - **Animation Principles:**
      - Use `transform` and `opacity` for 60fps performance
      - Implement `will-change` for GPU acceleration
      - Stagger child animations with `delay-[50ms]` increments
      - Use `transition-all duration-300 ease-out` for smooth interactions

### **🟣 Material 3 Hover Effects — Key Characteristics**

  - **State Layer:**

      - All interactive components (Cards, List Items, Member Cards, Video Cards, Category Cards, Buttons, Icons, Nav items) use a semi-transparent overlay (state layer) for hover, focus, pressed, or dragged states.
      - Overlay color is typically the primary color (`[var(--primary)]`) or on-surface color (`[var(--text)]` or a neutral color appropriate for the overlay).
      - Opacity for hover is usually `~8%` (e.g., `bg-[var(--primary)]/8` or `bg-[var(--text)]/8`).
      - The overlay should be softly clipped to the component’s shape (e.g., `rounded-[inherit]`).
      - **Implementation:** Use CSS like `after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[var(--primary)]/8 after:pointer-events-none` for state layers.

  - **Opacity-Based Feedback:**

      - On hover, apply a color overlay with the correct opacity, not just a full color background change.

  - **Soft, Subtle Animations:**

      - Hover transitions should be smooth (100–200ms) with standard easing (`ease-in-out`, `ease-out`, or Material’s `cubic-bezier(0.4,0,0.2,1)`).
      - **No scale/zoom or large shadow on hover for Cards/List Items**—only a soft elevation and overlay.
      - Avoid harsh or abrupt changes.

  - **Component-Specific Examples (Reiterated with Material 3 lens):**

      - **Buttons:** Slight elevation and a hover state layer overlay.
      - **Cards, List Items, Member Cards, Video Cards, Category Cards:** Subtle tonal elevation (via shadow changes) and a hover overlay (`bg-[var(--primary)]/8`). **No scale/zoom on hover.**
      - **FABs:** On web/desktop, may scale slightly or apply a translucent state layer.
      - **Icons:** May scale up slightly or animate color/elevation on hover.

  - **Material Motion Integration:**

      - Use motion to reinforce interaction (e.g., animate elevation, fade overlays).
      - All motion should be soft and reinforce focus, not distract.

  - No neumorphism or glassmorphism

  - Prefer solid dark surfaces and light typography

### **🌗 Theme Mode**

  - Dark mode only (All UI elements will be designed and implemented for this single theme).

-----

## Frontend

  - **Framework:** React 18 + Vite
  - **UI:** shadcn/ui, Radix UI, Tailwind CSS (Leveraging Tailwind's utility classes with our defined CSS variables for colors, layout, and spacing.)
  - **Routing:** React Router DOM
  - **State/Data:** React Query, React Hook Form
  - **Structure:**
      - `src/pages/` — Main pages (Index, Lists, NewList, Profile, etc.)
      - `src/components/` — Shared and UI components
      - `src/hooks/` — Custom hooks
      - `src/lib/` — Utilities
      - `src/styles/` — Global styles, CSS variables, and Tailwind configuration (where our `:root` color definitions will live).
  - **Key Features to Implement:**
      - List creation/editing UI (`/lists/new`)
      - List viewing and sharing
      - Video search and add-to-list
      - User authentication (Google OAuth)
      - Profile management
      - Responsive, accessible design (adhering to specified `📐 Layout` and `🔤 Typography` rules)

-----

## Backend

  - **Framework:** Express.js
  - **ORM:** Prisma
  - **Database:** PostgreSQL
  - **Structure:**
      - `src/index.js` — App entry point
      - `src/lists.js` — List API routes
      - `prisma/schema.prisma` — Data models
  - **Key Functions/APIs to Implement:**
      - `GET /api/lists` — List all lists
      - `GET /api/lists/:id` — Get a single list
      - `POST /api/lists` — Create a new list
      - `PUT /api/lists/:id` — Update a list
      - `DELETE /api/lists/:id` — Delete a list
      - `POST /api/lists/:id/videos` — Add video to list
      - `DELETE /api/lists/:id/videos/:videoId` — Remove video from list
      - User authentication endpoints (if not handled by frontend)

-----

## Database Relations (Prisma)

  - **User**
      - `id`, `email`, `name`, `avatar`, ...
      - 1-to-many: User has many Lists
  - **List**
      - `id`, `name`, `description`, `tags`, `visibility`, `ranked`, `createdAt`, `userId`
      - many-to-many: List has many Videos (with order/rank)
  - **Video**
      - `id`, `youtubeId`, `title`, `thumbnail`, ...
      - many-to-many: Video can be in many Lists
  - **ListVideo** (join table)
      - `id`, `listId`, `videoId`, `position` (for ranked lists)

-----

## API/DB TODOs

  - [ ] Implement all List CRUD endpoints
  - [ ] Implement add/remove video to/from list
  - [ ] Implement user authentication and protect endpoints
  - [ ] Implement video search (YouTube API or local cache)
  - [ ] Implement user profile endpoints
  - [ ] Add pagination, filtering, and sorting to APIs
  - [ ] Write migrations for all models/relations

-----

## Deployment

  - **Docker:** Containerize frontend and backend
  - **Railway:** Deploy containers and managed PostgreSQL

-----

## How to Use This File

  - Update this file as you add features, change APIs, or update the database schema.
  - Use the TODOs to track backend/frontend/API/database work.
  - Refer to this file for consistent project direction and onboarding.
  - **Always refer to the CSS Color Variables section (III.) for the definitive color definitions.**
  - When implementing UI components, prioritize Material 3 hover effects and animation principles (especially state layers).