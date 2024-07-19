import { useForm } from "react-hook-form";
import hotel from "../../public/hotelb.jpg";
import * as apiClient from "../api-clients";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SIgnInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SIgnInFormData>();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Welcome Home!", type: "SUCCESS" });
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
    <div className=" flex flex-col md:flex-row mx-auto justify-between items-center">
      {/* left div */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 p-10 m-66 md:w-1/2"
      >
        <h2 className="text-3xl font-bold mb-5">Sign In</h2>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
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
            className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
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
        <span className="items-center justify-between">
          <span className="text-sm ">
            Not Registered?{" "}
            <Link to="/register" className="text-blue-700 underline">
              Create an account here
            </Link>
          </span>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 font-bold hover:bg-green-600 text-xl w-full"
          >
            Login
          </button>
        </span>
      </form>

      {/* right div */}
      <div className="hidden md:block md:w-1/2 h-1/2">
        <img
          src={hotel}
          alt="Hotel"
          className="object-cover h-full w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default SignIn;
