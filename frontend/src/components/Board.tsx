"use client";

import { useState, useSyncExternalStore } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "./Column";
import {
  addCard,
  deleteCard,
  findColumn,
  findColumnByCardId,
  moveCard,
  renameColumn,
} from "@/lib/board";
import { initialBoard } from "@/lib/dummy-data";
import type { Card as CardType } from "@/lib/types";

const emptySubscribe = () => () => {};

export function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const ready = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleRename(columnId: string, title: string) {
    setBoard((current) => renameColumn(current, columnId, title));
  }

  function handleAdd(columnId: string, title: string, details: string) {
    setBoard((current) =>
      addCard(current, columnId, {
        id: crypto.randomUUID(),
        title,
        details,
      }),
    );
  }

  function handleDelete(cardId: string) {
    setBoard((current) => deleteCard(current, cardId));
  }

  function handleDragStart(event: DragStartEvent) {
    const column = findColumnByCardId(board, String(event.active.id));
    const card = column?.cards.find((c) => c.id === event.active.id);
    setActiveCard(card ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    setBoard((current) => {
      const fromColumn = findColumnByCardId(current, String(active.id));
      const overColumn =
        findColumn(current, String(over.id)) ??
        findColumnByCardId(current, String(over.id));
      if (!fromColumn || !overColumn) return current;

      const overIndex = overColumn.cards.findIndex((card) => card.id === over.id);
      const toIndex = overIndex === -1 ? overColumn.cards.length : overIndex;

      if (fromColumn.id === overColumn.id) {
        const fromIndex = fromColumn.cards.findIndex(
          (card) => card.id === active.id,
        );
        if (fromIndex === toIndex) return current;
      }

      return moveCard(current, String(active.id), overColumn.id, toIndex);
    });
  }

  if (!ready) {
    return <div className="min-h-full bg-[#f4f7fb]" data-testid="board" />;
  }

  return (
    <div className="flex min-h-full flex-col" data-testid="board">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-6 py-6">
          <div>
            <p className="text-sm font-medium text-blue">Project board</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-navy">
              Launch workspace
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              One board. Five columns. Move work forward.
            </p>
          </div>
          <div className="hidden h-1 w-32 rounded-full bg-accent sm:block" />
        </div>
      </header>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveCard(null)}
      >
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-4 overflow-x-auto px-6 py-6">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onRename={handleRename}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
              <h3 className="text-sm font-semibold text-navy">
                {activeCard.title}
              </h3>
              {activeCard.details ? (
                <p className="mt-1 text-sm text-muted">{activeCard.details}</p>
              ) : null}
            </article>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
