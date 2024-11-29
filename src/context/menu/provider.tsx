import { useState } from "react";
import MenuContext from ".";

function MenuProvider({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
