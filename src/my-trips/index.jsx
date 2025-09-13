import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import Footer from "@/view-trip/components/Footer";
import Header from "@/components/ui/custom/Header";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * used to get all user trips
   * @returns
   */

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <>
      <Header />
      <div className="xs-px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-[#927440]">My Trips</h2>

        <div className="grid grid-cols-2 mt-10 xs:grid-cols-2 s:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {userTrips?.length > 0
            ? userTrips.map((trip, index) => (
                <UserTripCardItem trip={trip} key={index} />
              ))
            : [1, 2, 3, 4, , 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[200px] w-[200px] bg-slate-200 animate-pulse rounded-xl"
                ></div>
              ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyTrips;
