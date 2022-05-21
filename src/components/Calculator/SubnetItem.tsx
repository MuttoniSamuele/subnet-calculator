import React from "react";

interface Props {
  netAddr: number[];
  hostId: number;
  subnetIndex: number;
}

const SubnetItem: React.FC<Props> = (props) => {
  const addrToStr = (addr: number[]): string => {
    return `${addr[0]}.${addr[1]}.${addr[2]}.${addr[3]}`;
  }

  const addrSum = (addr: number[], n: number): number[] => {
    addr = [...addr];
    let i = 3;
    while (true) {
      addr[i] += n;
      if (addr[i] <= 255) {
        break;
      }
      addr[i] = n % 256;
      n = Math.floor(n / 256);
      i--;
    }
    return addr;
  }

  const addressesCnt = Math.pow(2, props.hostId);
  const subnetAddr = addrSum(props.netAddr, addressesCnt*props.subnetIndex);

  return (
    <div className="row">
      <div className="cell">
        {/* Subnet */}
        {props.subnetIndex + 1}
      </div>
      <div className="cell">
        {/* Network address */}
        {addrToStr(subnetAddr)}
      </div>
      <div className="cell">
        {/* First host */}
        {addrToStr(addrSum(subnetAddr, 1))}
        </div>
      <div className="cell">
        {/* Last host */}
        {addrToStr(addrSum(subnetAddr, addressesCnt-2))}
      </div>
      <div className="cell">
        {/* Broadcast address */}
        {addrToStr(addrSum(subnetAddr, addressesCnt-1))}
      </div>
    </div>
  );
}

export default SubnetItem;
