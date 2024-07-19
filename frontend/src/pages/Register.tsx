import { useForm } from "react-hook-form";
import hotel1 from "../../public/hotel1.jpg";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col md:flex-row justify-center bg-blue-50 p-5">
      <form
        className="flex flex-col gap-5 p-5 w-full md:w-1/2 bg-white shadow-md"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold">Register</h2>
        <div className="flex flex-col gap-3">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100"
              {...register("firstname", { required: "This field is required" })}
            />
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100"
              {...register("lastname", { required: "This field is required" })}
            />
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <span>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 font-bold hover:bg-green-600 text-xl w-full"
            >
              Register
            </button>
          </span>
        </div>
      </form>
      <div className="flex justify-center items-center w-full md:w-1/2 mt-5 md:mt-0">
        <div className="mx-auto">
          <img src={hotel1} alt="Hotel 1" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Register;
