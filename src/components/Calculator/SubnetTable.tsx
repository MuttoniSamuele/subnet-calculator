import React from "react";
import SubnetItem from "./SubnetItem";

interface Props {
  netAddr: number[];
  subnetId: number;
  hostId: number;
}

const SubnetsTable: React.FC<Props> = (props) => {
  const subnetsCnt = Math.pow(2, props.subnetId);

  return (
    <section>
      <div className="subnets-desc">
        {props.subnetId === 0 ? "Showing the only possible subnet"
        : `Showing all ${subnetsCnt} of the possible subnets`
        }{
          ` for ${props.netAddr[0]}.${props.netAddr[1]}.${props.netAddr[2]}.` +
          `${props.netAddr[3]}/${32-props.hostId}`
        }
      </div>
      <div className="subnets-table">
        <div className="row heading">
          <div className="cell">Subnet</div>
          <div className="cell">Network address</div>
          <div className="cell">First host</div>
          <div className="cell">Last host</div>
          <div className="cell">Broadcast address</div>
        </div>
        {[...Array(subnetsCnt)].map((v, i) => 
          <SubnetItem
            key={i}
            netAddr={props.netAddr}
            hostId={props.hostId}
            subnetIndex={i}
          />
        )}
      </div>
    </section>
  );
}

export default SubnetsTable;
