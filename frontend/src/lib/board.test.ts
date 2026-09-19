import { describe, expect, it } from "vitest";
import { addCard, deleteCard, moveCard, renameColumn } from "./board";
import type { BoardState, Card } from "./types";

const sample: BoardState = {
  columns: [
    {
      id: "col-a",
      title: "A",
      cards: [
        { id: "c1", title: "One", details: "First" },
        { id: "c2", title: "Two", details: "Second" },
      ],
    },
    {
      id: "col-b",
      title: "B",
      cards: [{ id: "c3", title: "Three", details: "Third" }],
    },
    { id: "col-c", title: "C", cards: [] },
    { id: "col-d", title: "D", cards: [] },
    { id: "col-e", title: "E", cards: [] },
  ],
};

describe("renameColumn", () => {
  it("renames the matching column", () => {
    const next = renameColumn(sample, "col-a", "Backlog");
    expect(next.columns[0].title).toBe("Backlog");
    expect(sample.columns[0].title).toBe("A");
  });
});

describe("addCard", () => {
  it("appends a card to the column", () => {
    const card: Card = { id: "c4", title: "Four", details: "Fourth" };
    const next = addCard(sample, "col-b", card);
    expect(next.columns[1].cards).toHaveLength(2);
    expect(next.columns[1].cards[1]).toEqual(card);
  });
});

describe("deleteCard", () => {
  it("removes a card from the board", () => {
    const next = deleteCard(sample, "c2");
    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["c1"]);
  });
});

describe("moveCard", () => {
  it("reorders within a column", () => {
    const next = moveCard(sample, "c1", "col-a", 1);
    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["c2", "c1"]);
  });

  it("moves a card to another column at an index", () => {
    const next = moveCard(sample, "c1", "col-b", 0);
    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["c2"]);
    expect(next.columns[1].cards.map((c) => c.id)).toEqual(["c1", "c3"]);
  });

  it("appends when moving to an empty column", () => {
    const next = moveCard(sample, "c3", "col-c", 0);
    expect(next.columns[1].cards).toHaveLength(0);
    expect(next.columns[2].cards.map((c) => c.id)).toEqual(["c3"]);
  });
});
