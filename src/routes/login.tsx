import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useHookForm } from "../hook/useHookForm";
import Input from "../components/auth/Input";

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
      "Password can only contain alphanumeric characters and special characters"
    ),
});

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useHookForm(signupSchema, {
    username: "",
    password: "",
  });

  const submitForm = handleSubmit(async (data) => {
    try {
      await login(data);
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
