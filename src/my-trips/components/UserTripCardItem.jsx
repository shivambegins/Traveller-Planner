import React from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  return (
    <Link to={"/view-trip/" + trip?.id} style={{ textDecoration: "none" }}>
      <div className="hover:scale-105 transition-all rounded-2xl">
        <img
          src="/trips.jpg"
          className="h-[200px] xs:h-[120px] s:h-[150px] sm:h-[170px] object-cover rounded-3xl h-[200px] border border-white"
        />
        <div className="ml-4 mr-4 mb-4 text-black">
          <h5 className="font-bold mt-2 text-[#927440]">
            {trip?.userSelection?.location}
          </h5>
          <h6 className="text-white">
            {trip?.userSelection?.noOfDays}-days{" "}
          </h6>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
