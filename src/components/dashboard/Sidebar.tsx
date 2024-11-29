import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { useMenu } from "../../hook/useMenu";
import { useOutsideClick } from "../../hook/useOutsideClick";

const Sidebar = () => {
  const { logout } = useAuth();
  const { showMenu, setShowMenu } = useMenu();

  useEffect(() => {
    const recommendationsList = document.querySelector(
      ".recommendations-list"
    ) as HTMLElement;
    if (!recommendationsList) return;
    if (showMenu) {
      recommendationsList.style.overflow = "hidden";
    } else {
      recommendationsList.style.overflow = "auto";
    }
  }, [showMenu]);

  const ref = useOutsideClick(() => setShowMenu(false));

  return (
    <div
      ref={ref}
      data-testid="sidebar"
      className={`bg-white border-r border-r-slate-200 p-4 basis-[225px] shrink-0 sticky top-0 h-screen z-10 sidebar ${showMenu ? "active" : ""}`}>
      <div className="mb-3">
        <h1 className="text-center text-5xl font-serif">ARYON</h1>
      </div>

      <p className="text-xs text-slate-600 font-medium mb-1.5">Platform</p>
      <div className="flex flex-col justify-between h-[calc(100dvh-114px)]">
        <nav className="flex flex-col gap-2">
          <div className="flex gap-2 p-2 items-center rounded-md font-medium text-sm">
            <span>Dashboard</span>
          </div>
          <div className="flex gap-2 p-2 items-center rounded-md font-medium text-sm bg-teal-100 text-teal-600">
            <span>Recommendations</span>
          </div>
          <div className="flex gap-2 p-2 items-center rounded-md font-medium text-sm">
            <span>Policies</span>
          </div>
          <div className="flex gap-2 p-2 items-center rounded-md font-medium text-sm">
            <span>Events</span>
          </div>
        </nav>

        <button
          className="flex gap-2 py-2 px-4 items-center rounded-md font-medium text-sm bg-red-100 text-red-600 w-fit self-center"
          onClick={logout}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
