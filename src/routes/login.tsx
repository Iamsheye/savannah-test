import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../hook/useAuth";
import { useHookForm } from "../hook/useHookForm";
import Input from "../components/auth/Input";
import { User } from "../types";

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
      "Password can only contain alphanumeric characters and special characters",
    ),
});

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: () => {
    const user = localStorage.getItem("user");

    if (user) {
      const { token } = JSON.parse(user) as User;

      if (token) {
        throw redirect({
          to: "/dashboard",
          replace: true,
        });
      }
    }
  },
});

function Login() {
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useHookForm(signupSchema, {
    username: "",
    password: "",
  });

  const submitForm = handleSubmit(async (data) => {
    await login(data);
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submitForm}>
          <div className="space-y-4">
            <Input
              type="text"
              label="Username"
              name="username"
              register={register}
              errors={errors}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
