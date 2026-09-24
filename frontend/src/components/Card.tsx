"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function Card({ card, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={card.id}
      className={`group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-[#16273f] ${
        isDragging ? "opacity-40" : "cursor-grab active:cursor-grabbing"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-navy dark:text-slate-100">
            {card.title}
          </h3>
          {card.details ? (
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {card.details}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={`Delete ${card.title}`}
          data-testid={`delete-card-${card.id}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(card.id)}
          className="rounded p-1 text-muted transition-colors hover:bg-slate-100 hover:text-navy focus:outline-none focus:ring-2 focus:ring-blue/40 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
