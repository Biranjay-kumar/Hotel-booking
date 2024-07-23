import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-clients";
import {
  FaMapMarkerAlt,
  FaRegBuilding,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";
import { BiHotel } from "react-icons/bi";

const MyHotel = () => {
  const { data: hotelData, error } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error) => {
        console.error("Error fetching hotels:", error);
      },
    }
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500">Error fetching hotels</span>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <span className="text-gray-500 text-lg">No Hotels Found</span>
        <Link
          to="/add-hotel"
          className="bg-blue-700 text-white px-4 py-2 text-lg font-semibold rounded-md hover:bg-blue-500 transition"
        >
          Add Hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-green-500 font-bold text-3xl">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-700 text-white px-4 py-2 text-lg font-semibold rounded-md hover:bg-blue-500 transition"
        >
          Add Hotels
        </Link>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hotelData?.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-5 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-3">{hotel.name}</h2>
            <div className="whitespace-pre-line mb-3">{hotel.description}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <div className="flex items-center bg-gray-100 rounded p-2">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <span>
                  {hotel.city}, {hotel.country}
                </span>
              </div>
              <div className="flex items-center bg-gray-100 rounded p-2">
                <FaRegBuilding className="text-blue-500 mr-2" />
                <span>{hotel.type}</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded p-2">
                <FaRupeeSign className="text-blue-500 mr-2" />
                <span>{hotel.pricePerNight} Per night</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded p-2">
                <BiHotel className="text-blue-500 mr-2" />
                <span>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
              <div className="flex items-center bg-gray-100 rounded p-2">
                <FaStar className="text-blue-500 mr-2" />
                <span>{hotel.starRating} Star Rating</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-700 text-white px-4 py-2 text-lg font-semibold rounded-md hover:bg-blue-500 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
