import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMenu } from "../useMenu";
import MenuContext from "../../context/menu";
import { ReactNode } from "react";

describe("useMenu", () => {
  const wrapper = ({
    children,
    value,
  }: {
    children: ReactNode;
    value?: { showMenu: boolean; setShowMenu: () => void };
  }) => (
    <MenuContext.Provider
      value={value || { showMenu: false, setShowMenu: () => {} }}>
      {children}
    </MenuContext.Provider>
  );

  it("should return menu context when used within MenuProvider", () => {
    const mockContext = {
      showMenu: true,
      setShowMenu: () => {},
    };

    const { result } = renderHook(() => useMenu(), {
      wrapper: ({ children }) => wrapper({ children, value: mockContext }),
    });

    expect(result.current).toEqual(mockContext);
  });

  it("should throw error when used outside of MenuProvider", () => {
    expect(() => {
      renderHook(() => useMenu());
    }).toThrow("useMenu must be used within an AuthProvider");
  });
});
