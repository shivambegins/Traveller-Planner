import React from "react";
import { Link } from "react-router-dom";

function Itinerary({ trip }) {
  // Map time values to specific images
  const timeImages = {
    BREAKFAST: "/breakfast.jpg",
    MORNING: "/morning.jpg",
    LUNCH: "/lunch.jpg",
    AFTERNOON: "/afternoon.jpg",
    EVENING: "/evening.jpg",
    DINNER: "/dinner.jpg",
    NIGHT: "/night.jpg",
  };

  return (
    <div>
      <h2 className="font-bold mt-3 text-[#927440]">Travel Itinerary</h2>
      <div className="mt-5">
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(
            ([day, item], dayIndex) => (
              <div key={dayIndex} className="">
                {" "}
                {/* Added key for the day */}
                <h3 className="font-bold mt-5">{day}</h3>
                {/* TIME */}
                {item &&
                  Object.entries(item).map(([time, details], timeIndex) => (
                    <div key={timeIndex} className="ml-4">
                      {" "}
                      {/* Added key for the time */}
                      <h6 className="font-bold text-[#927440] mt-3">{time}</h6>
                      <Link
                        to={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          details?.name +
                          "," +
                          details?.address
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                      >
                        <div className="border rounded-3xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all hover:shadow cursor-pointer">
                          <img
                            src={timeImages[time] || "/placeholder.jpg"}
                            className="w-[130px] h-[130px] rounded-3xl border border-white"
                            alt={time + " image"}
                          />
                          <div className="ml-1">
                            <h4 className="text-white font-bold text-sm xs:text-xs s:text-sm sm:text-base md:text-lg">
                              {details?.name} &nbsp;&nbsp;&nbsp;&nbsp; ⭐
                              {details?.rating}
                            </h4>
                            <p className="text-xs sm:text-sm text-white">
                              📍Address: {details?.address}
                            </p>
                            <p className="text-xs sm:text-sm text-white">
                              📜{details?.description}
                            </p>
                            <p className="text-xs sm:text-sm text-white">
                              🪙Price: {details?.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default Itinerary;
