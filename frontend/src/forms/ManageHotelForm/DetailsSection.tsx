import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import TypeSection from "./TypeSection";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* left div */}
      <div className="flex flex-col gap-4 w-full md:w-1/2 p-2">
        <h1 className="text-3xl font-bold mb-3 text-green-400">Add Hotels</h1>
        <label className="text-gray-700 text-sm font-bold flex flex-col">
          Name
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
        <div className="flex gap-4">
          <label className="text-gray-700 text-sm font-bold flex-1">
            City
            <input
              type="text"
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Country
            <input
              type="text"
              className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
              {...register("country", { required: "This field is required" })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold">
          Description
          <textarea
            rows={10}
            className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border rounded-md w-full py-2 px-3 font-normal bg-blue-100 mt-1"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Star Rating
          <select
            {...register("starRating", { required: "This field is required" })}
            className="border rounded w-full p-2 text-gray-700 font-normal bg-blue-100 mt-1"
          >
            <option value="" className="text-sm font-bold">
              Select Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>

      {/* right div */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <TypeSection />
      </div>
    </div>
  );
};

export default DetailsSection;
