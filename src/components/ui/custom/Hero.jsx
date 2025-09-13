// import { Button } from "C:/CODING/Project1/travel-itinerary-planner/src/components/ui/button";
import React, { useRef } from "react";
import Footer from "@/view-trip/components/Footer";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  const audioRef = useRef(null); // Create a reference for the audio element

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play the audio when called
    }
  };

  return (
    <div className="flex flex-col items-center mx-4 gap-6 md:gap-9 md:mx-20 lg:mx-40">
      {/* Audio Element */}
      <audio ref={audioRef} src="/Evoice.mp3" preload="auto" />

      {/* Main Heading */}
      <h1 className="font-extrabold mt-[30px] text-[40px] md:text-[50px] lg:text-[60px] text-center text-[#927440]">
        Hello! I'm...
      </h1>

      {/* Image */}
      <img
        src="/Eintro.jpg"
        alt="Image not found"
        className="w-full max-w-[300px] md:max-w-[500px] lg:max-w-[600px] mt-0"
      />

      {/* Play Audio Button */}
      <button
        onClick={playAudio}
        className="py-2 px-4 border border-white bg-[#000000] text-white font-bold text-sm md:text-base lg:text-lg rounded-lg hover:!text-[#092744] hover:bg-[#ffffff] transition duration-300"
      >Enchantress🔊
      </button>

      {/* AI Trip Planner Heading */}
      <h1 className="font-extrabold mt-2 text-[30px] md:text-[40px] lg:text-[60px] text-center text-[#927440]">
        Your AI Trip Planner
      </h1>

      {/* Subtitle */}
      <h1 className="font-extrabold mt-2 text-[20px] md:text-[30px] lg:text-[40px] text-center text-[#ffffff] leading-tight">
        Get Your Dream Trip Ready in Seconds...
        <br />
        Quick, Simple, and Effortless!
      </h1>

      {/* Get Started Button */}
      <Link to={"/Create-Trip"}>
        <Button className="py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 text-sm md:text-base lg:text-lg">
          Let's Go!
        </Button>
      </Link>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Hero;
