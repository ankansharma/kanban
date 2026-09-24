"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AddCardForm } from "./AddCardForm";
import { Card } from "./Card";
import type { Column as ColumnType } from "@/lib/types";

type ColumnProps = {
  column: ColumnType;
  onRename: (columnId: string, title: string) => void;
  onAdd: (columnId: string, title: string, details: string) => void;
  onDelete: (cardId: string) => void;
};

export function Column({ column, onRename, onAdd, onDelete }: ColumnProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(column.title);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  function commitRename() {
    const next = draft.trim() || column.title;
    setDraft(next);
    onRename(column.id, next);
    setEditing(false);
  }

  return (
    <section
      ref={setNodeRef}
      data-testid={`column-${column.id}`}
      className={`flex min-h-0 min-w-[260px] flex-1 flex-col rounded-xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-700 dark:bg-[#0f1e33]/80 ${
        isOver ? "ring-2 ring-blue/40" : ""
      }`}
    >
      <header className="border-b border-slate-100 px-4 pb-3 pt-4 dark:border-slate-700/60">
        <div className="mb-3 h-1 w-12 rounded-full bg-accent" />
        {editing ? (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") {
                setDraft(column.title);
                setEditing(false);
              }
            }}
            autoFocus
            aria-label="Column title"
            data-testid={`column-title-input-${column.id}`}
            className="w-full rounded-md border border-blue bg-white px-2 py-1 text-base font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-blue/30 dark:bg-[#16273f] dark:text-slate-100"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            data-testid={`column-title-${column.id}`}
            className="w-full rounded-md text-left text-base font-semibold text-navy hover:text-blue focus:outline-none focus:ring-2 focus:ring-blue/30 dark:text-slate-100 dark:hover:text-blue"
          >
            {column.title}
          </button>
        )}
        <p className="mt-1 text-xs uppercase tracking-wide text-muted">
          {column.cards.length} {column.cards.length === 1 ? "card" : "cards"}
        </p>
      </header>
      <div className="flex min-h-[120px] flex-1 flex-col gap-2 overflow-y-auto px-3 py-3">
        <SortableContext
          items={column.cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDelete} />
          ))}
        </SortableContext>
      </div>
      <div className="px-3 pb-3">
        <AddCardForm columnId={column.id} onAdd={onAdd} />
      </div>
    </section>
  );
}
