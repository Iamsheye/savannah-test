import { createLazyFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import Sidebar from "@/components/dashboard/Sidebar";

export const Route = createLazyFileRoute("/_auth_routes")({
  pendingComponent: () => {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold md:text-[1.5rem]">
          loading...
        </p>
      </div>
    );
  },
  errorComponent: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold md:text-[1.5rem]">
          <span>An error occured😞, please</span>{" "}
          <button
            className="text-primary underline"
            onClick={() => {
              router.invalidate();
            }}
          >
            retry
          </button>
        </p>
      </div>
    );
  },
  component: () => (
    <section className="flex overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="mx-10 mt-8 grow">
        <Outlet />
      </div>
    </section>
  ),
});
