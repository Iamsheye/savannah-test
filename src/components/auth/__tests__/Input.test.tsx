import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "../Input";

describe("Input component", () => {
  it("renders input", () => {
    render(<Input label="Email" name="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    const errors = {
      email: {
        type: "required",
        message: "Email is required",
      },
    };

    render(<Input label="Email" name="email" errors={errors} />);

    const errorMessage = screen.getByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("applies custom props to input element", () => {
    render(
      <Input
        label="Email"
        name="email"
        data-testid="email-input"
        type="email"
      />
    );

    const input = screen.getByTestId("email-input");
    expect(input).toHaveAttribute("type", "email");
  });
});
