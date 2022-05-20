import React, { useState } from "react";
import InputsController from "./InputsController";

const Calculator: React.FC = () => {
  return (
    <main>
      <div className="main-inner container">
        <InputsController onCalculate={
          (netAddr, maskBits) => console.log(netAddr, maskBits)
        }/>
      </div>
    </main>
  );
}

export default Calculator;
