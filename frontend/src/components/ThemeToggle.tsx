"use client";

import { useLayoutEffect, useState } from "react";

// Reads the same source as the inline head script. Safe as a lazy initializer:
// ThemeToggle only mounts after the board's ready flag flips post-hydration, so
// it never participates in hydration.
function getInitialDark() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  return stored
    ? stored === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  // Keep <html> in sync with state and restore the class after React's dev
  // remount clears <html> attributes; a no-op in production.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function toggle() {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      data-testid="theme-toggle"
      onClick={toggle}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-slate-200 bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue/40 dark:border-slate-700 dark:bg-slate-800"
    >
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white text-navy shadow transition-transform dark:bg-navy dark:text-accent ${
          dark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {dark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
