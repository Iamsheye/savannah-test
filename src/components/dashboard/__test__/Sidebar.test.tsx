import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Sidebar />);

    expect(screen.getByText("ARYON")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Recommendations")).toBeInTheDocument();
    expect(screen.getByText("Policies")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    const mockLogout = vi.fn();
    render(<Sidebar />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("applies correct styling when showMenu is true", () => {
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("active");
  });

  it("updates recommendations list overflow style based on showMenu", () => {
    const mockSetStyle = vi.fn();
    const mockRecommendationsList = document.createElement("div");
    mockRecommendationsList.style.overflow = "";
    Object.defineProperty(mockRecommendationsList.style, "overflow", {
      get: () => "",
      set: mockSetStyle,
    });

    vi.spyOn(document, "querySelector").mockReturnValue(
      mockRecommendationsList,
    );

    render(<Sidebar />);

    expect(mockSetStyle).toHaveBeenCalledWith("hidden");
  });
});
