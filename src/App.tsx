import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator/Calculator";
import GoToTop from "./components/GoToTop";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <GoToTop />
      <Calculator />
      <Footer />
    </>
  );
}

export default App;
