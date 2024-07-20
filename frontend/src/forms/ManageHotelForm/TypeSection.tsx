import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotels-options-config";
import { HotelFormData } from "./ManageHotelForm";
import FacilitiesSection from "./FacilitiesSection";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typewatch = watch("type");
  return (
    <>
      <div className="p-2">
        <h2 className="text-2xl font-bold text-green-400">Type</h2>
        <div className="grid grid-cols-3 gap-2 p-2 mt-11 items-center">
          {hotelTypes.map((type) => (
            <label
              className={
                typewatch === type
                  ? "cursor-pointer bg-blue-100 text-sm rounded-full px-4 py-2 font-semibold "
                  : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
              }
            >
              <input
                type="radio"
                value={type}
                {...register("type", {
                  required: "This field is Required",
                })}
                className="hidden "
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors.type && (
          <span className="text-red-500 text-sm font-bold">
            {errors.type.message}
          </span>
        )}
      </div>
      <FacilitiesSection />
    </>
  );
};

export default TypeSection;
