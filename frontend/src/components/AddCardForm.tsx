"use client";

import { useState } from "react";

type AddCardFormProps = {
  columnId: string;
  onAdd: (columnId: string, title: string, details: string) => void;
};

export function AddCardForm({ columnId, onAdd }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextTitle = title.trim();
    if (!nextTitle) return;
    onAdd(columnId, nextTitle, details.trim());
    setTitle("");
    setDetails("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-2"
      data-testid={`add-card-form-${columnId}`}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
        aria-label="Card title"
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-muted/80 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30"
      />
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Details"
        aria-label="Card details"
        rows={2}
        className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-muted/80 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30"
      />
      <button
        type="submit"
        className="w-full rounded-md bg-purple px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-purple/90 focus:outline-none focus:ring-2 focus:ring-purple/40"
      >
        Add card
      </button>
    </form>
  );
}
