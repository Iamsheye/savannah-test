import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { User } from "../types";

export const Route = createFileRoute("/_auth_routes")({
  beforeLoad: () => {
    const user = localStorage.getItem("user");

    if (user) {
      const { token } = JSON.parse(user) as User;

      if (!token) {
        throw redirect({
          to: "/login",
          replace: true,
        });
      }
    }
  },
  pendingComponent: () => {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold text-form_text md:text-[1.5rem]">
          loading...
        </p>
      </div>
    );
  },
  errorComponent: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    return (
      <div className="flex h-[75vh] items-center justify-center">
        <p className="text-center text-[1rem] font-semibold text-form_text md:text-[1.5rem]">
          <span>An error occured😞, please</span>{" "}
          <button
            className="text-primary underline"
            onClick={() => {
              router.invalidate();
            }}>
            retry
          </button>
        </p>
      </div>
    );
  },
  component: () => <Outlet />,
});
