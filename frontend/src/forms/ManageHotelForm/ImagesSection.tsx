import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="ml-4">
      <h2 className="text-2xl font-bold mb-3 text-green-400 ">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4 bg-blue-100">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imagesFiles) => {
              const totalLength = imagesFiles.length;
              if (totalLength === 0) {
                return "at least One image should be added";
              }
              if (totalLength > 6) {
                return "You can upload maximum 6 images";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
