import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import AuthContext from "../../../context/auth";
import MenuContext from "../../../context/menu";

const renderWithProviders = (
  ui: React.ReactElement,
  { authValue = {}, menuValue = {} } = {},
) => {
  return render(
    <AuthContext.Provider
      value={{
        user: null,
        login: vi.fn(),
        isLoading: false,
        logout: vi.fn(),
        ...authValue,
      }}
    >
      <MenuContext.Provider
        value={{ showMenu: false, setShowMenu: vi.fn(), ...menuValue }}
      >
        {ui}
      </MenuContext.Provider>
    </AuthContext.Provider>,
  );
};

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithProviders(<Sidebar />);

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
    renderWithProviders(<Sidebar />, {
      authValue: { logout: mockLogout },
    });

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("applies correct styling when showMenu is true", () => {
    renderWithProviders(<Sidebar />, {
      menuValue: { showMenu: true, setShowMenu: vi.fn() },
    });

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

    renderWithProviders(<Sidebar />, {
      menuValue: { showMenu: true, setShowMenu: vi.fn() },
    });

    expect(mockSetStyle).toHaveBeenCalledWith("hidden");
  });
});
