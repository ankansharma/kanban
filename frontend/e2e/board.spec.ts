import { expect, test } from "@playwright/test";

test.describe("kanban board", () => {
  test("loads dummy data", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Launch workspace" })).toBeVisible();
    await expect(page.getByTestId("column-title-col-backlog")).toHaveText("Backlog");
    await expect(page.getByTestId("column-title-col-ready")).toHaveText("Ready");
    await expect(page.getByTestId("column-title-col-progress")).toHaveText("In Progress");
    await expect(page.getByTestId("column-title-col-review")).toHaveText("Review");
    await expect(page.getByTestId("column-title-col-done")).toHaveText("Done");
    await expect(page.getByTestId("card-checkout")).toContainText("Checkout flow polish");
  });

  test("renames a column", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("column-title-col-backlog").click();
    const input = page.getByTestId("column-title-input-col-backlog");
    await input.fill("Ideas");
    await input.press("Enter");
    await expect(page.getByTestId("column-title-col-backlog")).toHaveText("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    await page.goto("/");
    const form = page.getByTestId("add-card-form-col-ready");
    await form.getByLabel("Card title").fill("Ship launch checklist");
    await form.getByLabel("Card details").fill("Walk through support, sales, and product.");
    await form.getByRole("button", { name: "Add card" }).click();
    await expect(page.getByTestId("column-col-ready")).toContainText("Ship launch checklist");
    await expect(page.getByTestId("column-col-ready")).toContainText(
      "Walk through support, sales, and product.",
    );
  });

  test("deletes a card", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("card-brand")).toBeVisible();
    await page.getByTestId("delete-card-card-brand").click();
    await expect(page.getByTestId("card-brand")).toHaveCount(0);
  });

  test("drags a card to another column", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("card-brand");
    const review = page.getByTestId("column-col-review");
    await expect(page.getByTestId("column-col-backlog")).toContainText("Refresh marketing site");

    const from = await card.boundingBox();
    const to = await review.boundingBox();
    if (!from || !to) {
      throw new Error("missing drag coordinates");
    }

    await page.mouse.move(from.x + from.width / 2, from.y + 12);
    await page.mouse.down();
    await page.mouse.move(to.x + 48, to.y + 140, { steps: 25 });
    await page.mouse.up();

    await expect(page.getByTestId("column-col-review")).toContainText("Refresh marketing site");
    await expect(page.getByTestId("column-col-backlog")).not.toContainText(
      "Refresh marketing site",
    );
  });
});
