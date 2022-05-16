import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Calculator />
      <Footer />
    </>
  );
}

export default App;
