import { create } from "zustand";
import { User } from "@/types";
import { loginUser } from "@/services/auth";
import { toastError } from "@/utils";
import { router } from "@/App";

type State = {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  user: User | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthLoading: boolean;
};

const useStore = create<State>()((set) => ({
  user: null,
  isAuthLoading: false,
  showMenu: false,
  setShowMenu: (show) => set({ showMenu: show }),
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
    router.navigate({ to: "/login", replace: true });
  },
  login: async (data) => {
    try {
      const res = await loginUser(data);
      const userData: User = { username: data.username, token: res.token };
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData });
      router.navigate({ to: "/dashboard", replace: true });
    } catch (error) {
      toastError(error);
    }
  },
}));

export default useStore;
