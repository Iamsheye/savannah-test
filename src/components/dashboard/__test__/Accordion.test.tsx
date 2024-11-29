import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../Accordion";

describe("Accordion", () => {
  const mockItems = [
    { title: "Item 1", children: <p>Content 1</p> },
    { title: "Item 2", children: <p>Content 2</p> },
  ];

  it("renders all accordion items", () => {
    render(<Accordion items={mockItems} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("expands first item by default", () => {
    render(<Accordion items={mockItems} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("toggles content when clicking on title", async () => {
    render(<Accordion items={mockItems} />);

    fireEvent.click(screen.getByText("Item 2"));
    expect(screen.getByText("Content 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Item 2"));
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("shows correct chevron icons", () => {
    render(<Accordion items={mockItems} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0].querySelector(".lucide-chevron-up")).toBeInTheDocument();
    expect(
      buttons[1].querySelector(".lucide-chevron-down"),
    ).toBeInTheDocument();
  });
});
