import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../Sidebar";
import useStore from "@/store";

const mockStore = {
  showMenu: true,
  setShowMenu: vi.fn(),
  logout: vi.fn(),
};

vi.mock("@/store", () => ({
  default: {
    getState: () => mockStore,
    setState: (updater: any) => {
      const newState =
        typeof updater === "function" ? updater(mockStore) : updater;
      Object.assign(mockStore, newState);
    },
    subscribe: vi.fn(),
  },
}));

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.showMenu = true;
    mockStore.logout = vi.fn();
    mockStore.setShowMenu = vi.fn();
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

  it("calls logout when logout button is clicked", async () => {
    const mockLogout = vi.fn();
    useStore.getState().logout = mockLogout;
    useStore.getState().showMenu = false;

    render(<Sidebar />);
    const user = userEvent.setup();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
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
