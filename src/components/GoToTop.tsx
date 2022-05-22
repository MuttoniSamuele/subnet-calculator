import React, { useState, useEffect } from "react";

const GoToTop: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);

  const handleScroll = (): void => {
    setIsHidden(window.scrollY === 0);
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, []);
  
  return (
    <button
      className={"go-to-top" + (isHidden ? " hidden" : "")}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <i className="arrow-up"></i>
    </button>
  );
}

export default GoToTop;
