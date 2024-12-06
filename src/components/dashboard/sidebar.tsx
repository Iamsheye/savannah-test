import { useEffect } from "react";
import { useOutsideClick } from "@/hook/useOutsideClick";
import useStore from "@/store";
import { Button } from "../ui/button";
import {
  FileSearch2,
  LayoutDashboard,
  NotepadText,
  Sparkles,
} from "lucide-react";

const Sidebar = () => {
  const { logout, showMenu, toggleMenu } = useStore();

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

  const ref = useOutsideClick(() => toggleMenu(false));

  return (
    <div
      ref={ref}
      data-testid="sidebar"
      className={`sidebar sticky top-0 z-10 h-screen shrink-0 basis-[225px] border-r border-r-slate-200 bg-white p-4 ${showMenu ? "active" : ""}`}
    >
      <div className="mb-3">
        <h1>
          <span className="syne text-center font-serif text-4xl font-semibold tracking-tight text-teal-600">
            ARYON
          </span>
          <span className="block text-xs leading-none text-gray-700">
            Enterprise
          </span>
        </h1>
      </div>

      <p className="mb-1.5 text-xs font-medium text-slate-600">Platform</p>
      <div className="flex h-[calc(100dvh-114px)] flex-col justify-between">
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-teal-100 p-2 text-sm font-medium text-teal-600">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <span>Recommendations</span>
          </div>
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <NotepadText className="h-5 w-5" />
            <span>Policies</span>
          </div>
          <div className="flex items-center gap-2 rounded-md p-2 text-sm font-medium">
            <FileSearch2 className="h-5 w-5" />
            <span>Events</span>
          </div>
        </nav>

        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
