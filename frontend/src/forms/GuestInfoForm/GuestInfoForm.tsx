import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const navigate = useNavigate();
  const location = useLocation();

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };
  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">₹{pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="grid grid-cols-1 gap-4 items-center"
      >
        <div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded-md"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded-md"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="flex bg-white px-2 py-1 gap-2 rounded-md">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one result",
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button className="p-1 bg-yellow-500 h-full text-white font-bold hover:bg-green-700 text-xl">
            Book Now
          </button>
        ) : (
          <button className="p-1 bg-red-400 h-full text-white font-bold hover:bg-red-500 text-xl">
            Sign In to Book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
