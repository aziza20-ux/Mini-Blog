# Dev Insights — Mini Blog

## Description

Dev Insights is a React + TypeScript mini blog application. It displays a list of blog posts, each showing a title, author, description, and date. Users can click a post to view its full details and navigate back to the list. Posts authored by "John" are visually highlighted, and posts published within the last 24 hours display a "New!" badge.

---

## Technologies Used

| Technology | Version |
|---|---|
| React | ^19.2.8 |
| TypeScript | ~6.0.2 |
| Vite | ^8.3.0 |
| @vitejs/plugin-react | ^6.1.1 |

No third-party UI or CSS-in-JS libraries are used. Styling is handled with plain CSS files and inline styles.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes bundled with Node.js)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd mini-blog
npm install
```

---

## Running the Application

This project uses **Vite** as the build tool and development server.

```bash
npm run dev
```

Vite will start the development server. By default, the application is available at:

```
http://localhost:5173
```

---

## Building for Production

```bash
npm run build
```

This runs TypeScript compilation (`tsc -b`) followed by `vite build`. The production-ready output is placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Testing / Verification

There is no automated testing framework configured in this project. Functionality can be manually verified in the browser after running `npm run dev`:

- The header displays the "Dev Insights" logo and a "New Post" label.
- Three blog posts are rendered in a row on the home screen.
- The post authored by **John** has a light blue background (conditional styling).
- Posts with a date within the last 24 hours display a red **"New Post"** badge.
- Clicking **"learn more"** on any post navigates to the full post detail view.
- Clicking **"Back"** from the detail view returns to the post list.
- The browser console logs `Component mounted` when the detail view opens and `Component unmounted` when navigating back (HOC behaviour).

---

## Project Structure

```
mini-blog/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Static image assets
│   ├── components/
│   │   ├── App.tsx          # Root component
│   │   ├── HeaderComponent.tsx
│   │   ├── PostListComponent.tsx
│   │   ├── PostComponent.tsx
│   │   └── HocComponent.tsx # withLogger HOC
│   ├── data/
│   │   └── posts.ts         # Hardcoded sample post data
│   ├── styles/
│   │   ├── HeaderStyle.css
│   │   └── PostListStyles.css
│   ├── types/
│   │   └── post.ts          # PostType interface
│   ├── utilies/
│   │   └── NewPostDate.ts   # isNewPost utility function
│   ├── App.css              # (empty, reserved)
│   ├── index.css            # (empty, reserved)
│   └── main.tsx             # Application entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tsconfig.app.json
```

---

## Component Design

All components are **functional components**, which is the current React standard. Functional components are simpler, require less boilerplate than class components, and support React Hooks directly.

| Component | Role |
|---|---|
| `App` | Root component. Renders `HeaderComponent` and `PostListComponent`, passing the `posts` array as a prop. |
| `HeaderComponent` | Displays the site logo and "New Post" label. No props or state. |
| `PostListComponent` | Receives `posts: PostType[]` as a prop. Manages a `selectedPost` state with `useState` to toggle between the list view and the detail view. Renders the `withLogger`-wrapped `PostComponent` when a post is selected. |
| `PostComponent` | Receives a single `post: PostType` and an `onBack` callback as props. Wrapped in `React.memo`. Renders the full post detail. |

### HOC — `withLogger`

`withLogger` is a Higher-Order Component defined in `HocComponent.tsx`. It wraps any component and uses `useEffect` to log `"Component mounted"` to the console on mount and `"Component unmounted"` on unmount. It is applied to `PostComponent`, creating `LoggedPost` inside `PostListComponent`.

### `React.memo`

`PostComponent` is wrapped with `React.memo`. This prevents the component from re-rendering when its parent re-renders but the `post` and `onBack` props have not changed. In this application the benefit is modest given the simple state structure, but it demonstrates the correct usage of memoisation for a presentational component.

---

## Styling Approach

Two styling methods are used:

1. **External CSS files** — `HeaderStyle.css` and `PostListStyles.css` are imported directly into their respective components. These handle layout (flexbox), borders, spacing, and the `.highlighted` and `.new-post-badge` classes.

2. **Inline styles** — Used in `PostListComponent` for the author/date `<small>` element (`fontStyle: "italic"`), demonstrating React's inline style syntax.

### Conditional Styling

- Posts where `post.author === 'John'` receive the `highlighted` CSS class (light blue background) instead of the default `post` class.
- The `isNewPost` utility function checks whether a post's date falls within the last 24 hours. If true, a red **"New Post"** badge is rendered using the `.new-post-badge` class.

---

## Optimization Strategy

- **`React.memo`** — `PostComponent` is memoised so it only re-renders when its `post` or `onBack` props actually change, avoiding unnecessary renders triggered by parent state updates.
- **`key` prop** — Each post in the list uses `post.title` as its `key`, which allows React to efficiently reconcile the list during re-renders. Using a unique and stable identifier (such as an `id` field) would be preferable in a production application.
- **HOC with `useEffect`** — The `withLogger` HOC uses an empty dependency array (`[]`) so the mount/unmount logging runs exactly once per component lifecycle, with no unnecessary effect re-runs.

---

## Development Decisions

- **Vite** was chosen as the build tool for its fast cold-start development server and native ES module support.
- **TypeScript** is used throughout. The `PostType` interface (`src/types/post.ts`) enforces a consistent shape for all post objects across the application.
- **Post data** is hardcoded in `src/data/posts.ts` and passed down via props, keeping data concerns separate from rendering logic.
- **Utility function** `isNewPost` is isolated in `src/utilies/NewPostDate.ts`, making the date-comparison logic reusable and independently testable.

---

## How to Use

1. Run `npm run dev` and open `http://localhost:5173` in your browser.
2. The home screen shows all blog posts as cards.
3. Click **"learn more"** on any card to open the full post detail view.
4. Click **"Back"** to return to the post list.
5. Open the browser DevTools console to observe the HOC mount/unmount log messages.

---

## Notes

- The "New Post" badge will only appear if a post's `date` is within 24 hours of the current time. The sample dates in `posts.ts` are set in the future (September 2026), so the badge will appear once those dates are reached or if the dates are updated to a recent value.
- The "New Post" navigation link in the header is not functional; it is a static label.
- There is no routing library. Navigation between the list and detail view is handled with a `useState` flag inside `PostListComponent`.
