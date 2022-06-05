import React from "react";
import { addrToStr, Subnet } from "../../logics/addrUtils";

interface Props {
  subnet: Subnet;
  subnetIndex: number;
}

const SubnetItem: React.FC<Props> = (props) => {
  return (
    <div className="row">
      <div className="cell">
        {props.subnetIndex + 1}
      </div>
      <div className="cell">
        {addrToStr(props.subnet.network)}
      </div>
      <div className="cell">
        {addrToStr(props.subnet.firstHost)}
        </div>
      <div className="cell">
        {addrToStr(props.subnet.lastHost)}
      </div>
      <div className="cell">
        {addrToStr(props.subnet.broadcast)}
      </div>
    </div>
  );
}

export default SubnetItem;
