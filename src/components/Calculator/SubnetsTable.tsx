import React, { useState, useEffect } from "react";
import SubnetItem from "./SubnetItem";
import { calcSubnet, addrToStr } from "../../logics/addrUtils";
import DownloadBtn from "./DownloadBtn";

const MAX_SUBNETS = 128; // max number of subnets to load at a time

interface Props {
  netAddr: number[];
  subnetId: number;
  hostId: number;
}

const SubnetsTable: React.FC<Props> = (props) => {
  const [maxSubnets, setMaxSubnets] = useState(MAX_SUBNETS);
  const subnetsCnt = Math.pow(2, props.subnetId);

  useEffect(() => {
    setMaxSubnets(MAX_SUBNETS);
  }, [props.netAddr, props.subnetId]);

  const buildSubnetItem = (subnetIndex: number): JSX.Element => {
    const subnet = calcSubnet(props.netAddr, props.hostId, subnetIndex);
    return (
      <SubnetItem
        key={addrToStr(subnet.network)}
        subnet={subnet}
        subnetIndex={subnetIndex}
      />
    );
  }

  return (
    <section>
      <div className="desc-download-wrapper">
        <div className="subnets-desc">
          {props.subnetId === 0 ? "Showing the only possible subnet"
          : `Showing all ${subnetsCnt} of the possible subnets`
          }{
            ` for ${props.netAddr[0]}.${props.netAddr[1]}.${props.netAddr[2]}.` +
            `${props.netAddr[3]}/${32-props.hostId}`
          }
        </div>
        <DownloadBtn />
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <div className="subnets-table">
            <div className="row heading">
              <div className="cell">Subnet</div>
              <div className="cell">Network address</div>
              <div className="cell">First host</div>
              <div className="cell">Last host</div>
              <div className="cell">Broadcast address</div>
            </div>
            {[...Array(subnetsCnt > maxSubnets ? maxSubnets : subnetsCnt)].map(
              (v, i) => buildSubnetItem(i)
            )}
          </div>
        </div>

        {subnetsCnt > maxSubnets &&
          <button
            className="show-more-btn"
            onClick={() => setMaxSubnets((prevMax) => prevMax + MAX_SUBNETS)}
          >Show more</button>
        }
      </div>
    </section>
  );
}

export default SubnetsTable;
