# Rich Text Editor (TipTap + React + Tailwind)

A beautiful, modern rich text editor built with [TipTap](https://tiptap.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). Supports drag & drop images, dark mode, and more.

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   React Version (18.3.1)

### Installation

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## ✨ Features (Completed)

-   **Rich text formatting:** Bold, italic, underline
-   **Headings:** H1, H2, H3
-   **Lists:** Ordered and unordered
-   **Code blocks & blockquotes**
-   **Horizontal rules**
-   **Image support:**
    -   Drag & drop images into the editor
    -   Paste images from clipboard
    -   Insert images via toolbar button
-   **Link management:** Add/remove links
-   **Undo/Redo**
-   **Dark mode:** Toggle with the button
-   **Live output preview:**
    -   View editor content as HTML or JSON
-   **Responsiveness:**

---

## 📦 Libraries & Tools Used

-   [TipTap](https://tiptap.dev/) (core, starter-kit, underline, image, link, horizontal-rule)
-   [React](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Lucide React](https://lucide.dev/icons/) (for icons)
-   [Vite](https://vitejs.dev/) (build tool)
-   [TypeScript](https://www.typescriptlang.org/)

---

## 📝 Assumptions & Notes

-   Images are stored as base64 data URLs (no backend/upload integration).
-   The editor is fully client-side; no authentication or persistence.
-   The UI is styled with Tailwind CSS and supports both light and dark themes.
-   No custom plugins beyond TipTap's official extensions.

---

## 📂 Project Structure

-   `src/` — Main source code
    -   `components/` — Editor UI components
    -   `App.tsx` — Main app logic
    -   `index.css` — Tailwind and custom styles
-   `index.html` — App entry point
-   `package.json` — Scripts and dependencies

---

## 🙏 Credits

-   [TipTap](https://tiptap.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Lucide Icons](https://lucide.dev/)

---

## 📧 Contact

For questions or feedback, please open an issue or contact the maintainer.
