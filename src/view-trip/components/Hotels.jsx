import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h3 className="font-bold mt-3 text-[#927440]">Recommended Hotels</h3>
      <div className="grid xs:grid-cols-2 s:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(hotel?.name || "") +
              "," +
              encodeURIComponent(hotel?.address || "")
            }
            target="_blank"
            style={{ textDecoration: "none" }}
            className="text-black"
            key={hotel?.name || index} // Use `hotel?.name` or fallback to `index`
          >
            <div className="border rounded-3xl hover:scale-110 transition-all hover:shadow cursor-pointer">
              <img
                src={`/hotel${index + 1}.jpg`}
                alt={hotel?.name || "Hotel Image"}
                onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback image
                className="rounded-3xl border border-white"
              />
              <div className="my-2 flex flex-col gap-1">
                <h6 className="font-bold ml-3 mr-3 text-white">
                  {hotel?.name || "Hotel Name Unavailable"}
                </h6>
                <h6 className="text-xs ml-3 mr-3 text-white">
                  ⭐{hotel?.rating || "N/A"}
                </h6>
                <h6 className="text-xs ml-3 mr-3 text-white">
                  📌{hotel?.address || "Address Unavailable"}
                </h6>
                <h6 className="text-xs ml-3 mr-3 text-white">
                  💵{hotel?.price || "Price Unavailable"}
                </h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
