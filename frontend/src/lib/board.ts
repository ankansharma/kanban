import type { BoardState, Card, Column } from "./types";

export function renameColumn(
  board: BoardState,
  columnId: string,
  title: string,
): BoardState {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, title } : col,
    ),
  };
}

export function addCard(
  board: BoardState,
  columnId: string,
  card: Card,
): BoardState {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, cards: [...col.cards, card] } : col,
    ),
  };
}

export function deleteCard(board: BoardState, cardId: string): BoardState {
  return {
    columns: board.columns.map((col) => ({
      ...col,
      cards: col.cards.filter((card) => card.id !== cardId),
    })),
  };
}

export function moveCard(
  board: BoardState,
  cardId: string,
  toColumnId: string,
  toIndex: number,
): BoardState {
  let moving: Card | undefined;
  let fromColumnId: string | undefined;
  let fromIndex = -1;

  for (const col of board.columns) {
    const idx = col.cards.findIndex((card) => card.id === cardId);
    if (idx !== -1) {
      moving = col.cards[idx];
      fromColumnId = col.id;
      fromIndex = idx;
      break;
    }
  }

  if (!moving || !fromColumnId) {
    return board;
  }

  if (fromColumnId === toColumnId) {
    return {
      columns: board.columns.map((col) => {
        if (col.id !== toColumnId) return col;
        const cards = [...col.cards];
        const [item] = cards.splice(fromIndex, 1);
        cards.splice(toIndex, 0, item);
        return { ...col, cards };
      }),
    };
  }

  return {
    columns: board.columns.map((col) => {
      if (col.id === fromColumnId) {
        return { ...col, cards: col.cards.filter((card) => card.id !== cardId) };
      }
      if (col.id === toColumnId) {
        const cards = [...col.cards];
        cards.splice(toIndex, 0, moving);
        return { ...col, cards };
      }
      return col;
    }),
  };
}

export function findColumn(
  board: BoardState,
  columnId: string,
): Column | undefined {
  return board.columns.find((col) => col.id === columnId);
}

export function findColumnByCardId(
  board: BoardState,
  cardId: string,
): Column | undefined {
  return board.columns.find((col) =>
    col.cards.some((card) => card.id === cardId),
  );
}
