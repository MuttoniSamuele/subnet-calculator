import React, { useState } from "react";
import InputsController from "./InputsController";
import SubnetsTable from "./SubnetsTable";
import { IpAddr } from "../../logics/addrUtils";

const Calculator: React.FC = () => {
  const [netAddr, setNetAddr] = useState<IpAddr>();
  const [subnetId, setSubnetId] = useState<number>();
  const [hostId, setHostId] = useState<number>();

  return (
    <main>
      <div className="main-inner container">
        <InputsController onCalculate={
          (netAddr, subnetId, hostId) => {
            setNetAddr(netAddr);
            setSubnetId(subnetId);
            setHostId(hostId);
          }
        }/>
        {netAddr !== undefined && subnetId !== undefined &&
         hostId !== undefined &&
          <SubnetsTable
            netAddr={netAddr}
            subnetId={subnetId}
            hostId={hostId}
          />
        }
      </div>
    </main>
  );
}

export default Calculator;
