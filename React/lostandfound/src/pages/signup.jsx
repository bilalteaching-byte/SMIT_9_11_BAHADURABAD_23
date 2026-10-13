import { useForm } from "react-hook-form";
import FormField from "../components/FormField";
import Layout from "../components/Layout";

export default function Signup({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout user={user}>
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
              error={errors.name}
              registration={register("name", {
                required: "Name field is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              registration={register("email", {
                required: "Email field is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              registration={register("password", {
                required: "Password field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
