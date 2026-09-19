import type { BoardState } from "./types";

export const initialBoard: BoardState = {
  columns: [
    {
      id: "col-backlog",
      title: "Backlog",
      cards: [
        {
          id: "card-brand",
          title: "Refresh marketing site",
          details: "Update homepage copy and product screenshots for launch.",
        },
        {
          id: "card-research",
          title: "Interview beta customers",
          details: "Schedule five calls to capture onboarding friction.",
        },
      ],
    },
    {
      id: "col-ready",
      title: "Ready",
      cards: [
        {
          id: "card-pricing",
          title: "Finalize pricing page",
          details: "Confirm annual vs monthly plans with finance.",
        },
      ],
    },
    {
      id: "col-progress",
      title: "In Progress",
      cards: [
        {
          id: "card-checkout",
          title: "Checkout flow polish",
          details: "Tighten error states and loading on the payment step.",
        },
        {
          id: "card-email",
          title: "Welcome email sequence",
          details: "Draft the three-message sequence for new workspaces.",
        },
      ],
    },
    {
      id: "col-review",
      title: "Review",
      cards: [
        {
          id: "card-docs",
          title: "Launch documentation",
          details: "Legal and support review of the help center articles.",
        },
      ],
    },
    {
      id: "col-done",
      title: "Done",
      cards: [
        {
          id: "card-name",
          title: "Product name lock",
          details: "Name, domain, and trademark search signed off.",
        },
      ],
    },
  ],
};
