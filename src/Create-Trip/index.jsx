import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { Input } from "C:/CODING/Project1/travel-itinerary-planner/src/components/ui/input.jsx";
// import { Input } from "/Project1/travel-itinerary-planner/src/components/ui/input.jsx";
import { Input } from "../components/ui/input.jsx";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
// import { Button } from "C:/CODING/Project1/travel-itinerary-planner/src/components/ui/button.jsx";
import { Button } from "../components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components/Footer";
import Header from "@/components/ui/custom/Header.jsx";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const final = FINAL_PROMPT.toString();
    const result = await chatSession.sendMessage(final);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    // Add a new document in collection "cities"
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData), //TO GET FIREBASE DATA IN JSON FORMAT***(IMP)
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <>
      <Header />
      <div className="xs:px-2 s:px-3 sm:px-5 md:px-12 lg:px-24 xl:px-10 px-4 mt-10">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#927440]">
          Tell me about your Travel Preferences
        </h2>
        <p className="mt-3 text-white text-sm sm:text-xl md:text-lg">
          Share a few details with me, and I'll craft the perfect Trip for you
        </p>
        <div className="mt-6 flex flex-col gap-8 sm:gap-10">
          {/* Destination Input */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#927440] my-3">
              What's your Destination?
            </h2>
            <Input
              placeholder={"Ex-Delhi"}
              type="text"
              className="text-black"
              onChange={(v) => handleInputChange("location", v.target.value)}
            />
          </div>

          {/* Number of Days Input */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#927440] my-3">
              How many Days is your Trip?
            </h2>
            <Input
              placeholder={"Ex-3"}
              type="number"
              className="text-black"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  handleInputChange("noOfDays", value); // Allow empty input
                } else {
                  const number = parseInt(value, 10);
                  if (number > 0 && number < 8) {
                    handleInputChange("noOfDays", number);
                  } else {
                    alert("Please enter a number between 1-7 (within a week)");
                  }
                }
              }}
            />
          </div>



          {/* Budget Selection */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#927440] my-3">
              What's your Budget?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border border-white rounded-3xl hover:shadow-lg
                ${formData?.budget === item.title
                      ? "shadow-lg border-black bg-white text-black"
                      : ""
                    } 
                hover:scale-105 transition-all cursor-pointer rounded-3xl`}
                >
                  <h5 className="text-3xl sm:text-4xl">{item.icon}</h5>
                  <h5 className="font-bold text-lg">{item.title}</h5>
                  <h5 className="text-sm text-gray-500">{item.desc}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Selection */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-[#927440] my-3">
              Who's joining you on this Adventure?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border border-white rounded-3xl hover:shadow-lg
                ${formData?.traveler === item.people
                      ? "shadow-lg border-black bg-white text-black"
                      : ""
                    }
                hover:scale-105 transition-all cursor-pointer rounded-3xl`}
                >
                  <h5 className="text-3xl sm:text-4xl">{item.icon}</h5>
                  <h5 className="font-bold text-lg">{item.title}</h5>
                  <h5 className="text-sm text-gray-500">{item.desc}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Trip Button */}
          <div className="my-8 justify-center flex">
            <Button
              disabled={loading}
              onClick={OnGenerateTrip}
              className="text-sm sm:text-base"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>
        </div>

        {/* Dialog for Google Sign-in */}
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/Elogo.jpg" alt="Logo" className="mx-auto h-[100px] rounded-full"/>
                <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                <p>Sign In to the App with Google Authentication</p>
                <Button onClick={login} className="bg-[#092744] mt-3 gap-3 items-center">
                  <FcGoogle className=" h-7 w-7" /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
export default CreateTrip;
