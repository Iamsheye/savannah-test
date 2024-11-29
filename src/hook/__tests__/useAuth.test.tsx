import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuth } from "../useAuth";
import AuthContext from "../../context/auth";
import { ReactNode } from "react";

describe("useAuth", () => {
  const mockAuthValue = {
    user: {
      username: "testuser",
      token: "test-token",
    },
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: true,
    isLoading: false,
  };

  const Wrapper = ({
    children,
    value = mockAuthValue,
  }: {
    children: ReactNode;
    value?: typeof mockAuthValue;
  }) => <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  it("should return auth context when used within AuthProvider", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Wrapper children={children} />,
    });

    expect(result.current).toEqual(mockAuthValue);
    expect(result.current.user).toBeDefined();
    expect(result.current.login).toBeDefined();
    expect(result.current.logout).toBeDefined();
  });

  it("should throw error when used outside of AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");
  });

  it("should provide working auth methods", () => {
    const customMockValue = {
      ...mockAuthValue,
      login: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn().mockResolvedValue(undefined),
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <Wrapper children={children} value={customMockValue} />
      ),
    });

    result.current.login({ username: "admin", password: "password" });
    result.current.logout();

    expect(customMockValue.login).toHaveBeenCalledWith({
      username: "admin",
      password: "password",
    });
    expect(customMockValue.logout).toHaveBeenCalled();
  });

  it("should provide correct user data", () => {
    const customMockValue = {
      ...mockAuthValue,
      user: {
        username: "admin",
        token: "test-token",
      },
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <Wrapper children={children} value={customMockValue} />
      ),
    });

    expect(result.current.user).toEqual({
      username: "admin",
      token: "test-token",
    });
  });
});
