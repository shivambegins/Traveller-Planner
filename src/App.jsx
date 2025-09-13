import { useState } from "react";
import Hero from "./components/ui/custom/Hero";
import Header from "./components/ui/custom/Header";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default App;
