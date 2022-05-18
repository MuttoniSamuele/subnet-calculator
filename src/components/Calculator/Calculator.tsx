import React from "react";
import IpInput from "./IpInput";
import PosNumInput from "./PosNumInput";

const Calculator: React.FC = () => {
  return (
    <main>
      <div className="main-inner container">
        <section className="inputs-wrapper">
          <IpInput label="IP Address" onChange={(octects) => console.log(octects)} />
          <PosNumInput label="Mask bits" max={30} onChange={(num) => console.log(num)} />
          <IpInput label="Subnet Mask" onChange={(octects) => console.log(octects)} />
          <PosNumInput label="Number of Subnets" max={Math.pow(2, 32)} onChange={(num) => console.log(num)} />
          <PosNumInput label="Hosts per Subnet" max={Math.pow(2, 32)} onChange={(num) => console.log(num)} />
        </section>
      </div>
    </main>
  );
}

export default Calculator;
