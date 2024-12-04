import { useEffect } from "react";
import { useOutsideClick } from "@/hook/useOutsideClick";
import useStore from "@/store";

const Sidebar = () => {
  const { logout, showMenu, setShowMenu } = useStore.getState();

  useEffect(() => {
    const recommendationsList = document.querySelector(
      ".recommendations-list",
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
      className={`sidebar sticky top-0 z-10 h-screen shrink-0 basis-[225px] border-r border-r-slate-200 bg-white p-4 ${showMenu ? "active" : ""}`}
    >
      <div className="mb-3">
        <h1 className="text-center font-serif text-5xl font-semibold text-teal-600">
          ARYON
        </h1>
      </div>

      <p className="mb-1.5 text-xs font-medium text-slate-600">Platform</p>
      <div className="flex h-[calc(100dvh-114px)] flex-col justify-between">
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-teal-100 p-2 text-sm font-medium text-teal-600">
            <span>Recommendations</span>
          </div>
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <span>Policies</span>
          </div>
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <span>Events</span>
          </div>
        </nav>

        <button
          className="flex w-fit items-center gap-2 self-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-600"
          onClick={logout}
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
