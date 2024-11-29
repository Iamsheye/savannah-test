import { createContext } from "react";

interface MenuContextVal {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextVal | undefined>(undefined);

export default MenuContext;
