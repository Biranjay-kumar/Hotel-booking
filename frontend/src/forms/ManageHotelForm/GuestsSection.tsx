import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-4 p-4 ">
      <h2 className="text-2xl font-bold mb-3 text-green-400">Guests</h2>
      <div className="p-2 pb-3 flex flex-col md:flex-row md:space-x-4 justify-center items-center  shadow-sm">
        <label className="flex flex-col md:flex-1 mb-4 md:mb-0 text-sm font-semibold">
          <span className="text-gray-700">Adults</span>
          <input
            className="p-2 mt-1 bg-blue-100 rounded-md"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This Field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold mt-1">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex flex-col md:flex-1 text-sm font-semibold">
          <span className="text-gray-700">Children</span>
          <input
            className="p-2 mt-1 bg-blue-100 rounded-md"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This Field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 mt-1">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
