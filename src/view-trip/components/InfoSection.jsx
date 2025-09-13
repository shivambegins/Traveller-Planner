import React from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Adjust the path based on your project structure.

function InfoSection({ trip }) {
  const { userSelection } = trip || {};

  return (
    <div>
      {/* Image with responsive class */}
      <img
        src="/front.jpg"
        alt="Travel destination"
        className="h-[250px] xs:h-[150px] s:h-[200px] sm:h-[300px] w-full object-cover rounded-3xl border border-white"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1">
        <div className="my-5 flex flex-col gap-2">
          {/* Location */}
          <h2 className="font-bold text-xl sm:text-2xl text-[#927440]">
            {userSelection?.location || "Unknown Location"}
          </h2>

          <div className="flex flex-wrap gap-3">
            {/* Days */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs sm:text-sm">
              🗓️ Days-{userSelection?.noOfDays || "N/A"}
            </h2>

            {/* Budget */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs sm:text-sm">
              💵 Budget-{userSelection?.budget || "N/A"}
            </h2>

            {/* No. of Travelers */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs sm:text-sm">
              ✈️ No. of Travelers-{userSelection?.traveler || "N/A"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
