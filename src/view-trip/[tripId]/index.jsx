import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import Footer from "../components/Footer";
import Header from "@/components/ui/custom/Header";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // used to get trip information from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No trip found");
    }
  };
  return (
    <>
      <Header />
      <div className="p-1 pt-5 md:px-20 lg:px-44 xl:px-56">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <Itinerary trip={trip} />
        <Footer trip={trip} />
      </div>
    </>
  );
}

export default Viewtrip;
