import React from "react";
import IpInput from "./IpInput";
import PosNumInput from "./PosNumInput";

const Calculator: React.FC = () => {
  return (
    <main>
      <div className="main-inner container">
        <section className="inputs-wrapper">
          <IpInput label="IP Address" onChange={(octects) => console.log(octects)} />
          <IpInput label="Subnet Mask" isMask onChange={(octects) => console.log(octects)} />
          <PosNumInput label="Subnets" onChange={(num) => console.log(num)} />
          <PosNumInput label="Hosts" onChange={(num) => console.log(num)} />
        </section>
      </div>
    </main>
  );
}

export default Calculator;
