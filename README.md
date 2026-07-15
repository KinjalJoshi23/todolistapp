# To Do List App

A simple, responsive to-do list app built with React, Tailwind CSS, and Vite. Tasks are saved to `localStorage` so they persist across page refreshes.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete with a checkbox (strikes through the text)
- Tasks persist in the browser via `localStorage`
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite 7](https://vitejs.dev/)
- [React Router DOM v7](https://reactrouter.com/)

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## Deployment

This project is configured for [GitHub Pages](https://pages.github.com/) via `gh-pages`.

```bash
npm run deploy
```

## Project Structure

```
src/
├── App.jsx       # Main app logic and todo list UI
├── Navbar.jsx    # Top navigation bar
├── main.jsx      # React entry point
└── main.css      # Global styles (Tailwind import)
```

## Live Demo

[https://kinjaljoshi23.github.io/todolistapp](https://kinjaljoshi23.github.io/todolistapp)
