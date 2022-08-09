import React, { useState } from "react";
import IpInput from "./IpInput";
import PosNumInput from "./PosNumInput";
import { decToBin, binToDec } from "../../logics/binary";

interface Props {
  onCalculate: (netAddr: number[], subnetId: number, hostId: number) => void;
}

const InputsController: React.FC<Props> = (props) => {
  enum InputType { IP_ADDR, MASK_BITS, SUB_MASK, SUBNETS, HOSTS, NONE };
  type IpClass = "A" | "B" | "C";

  const [ipAddr, setIpAddr] = useState<number[] | null>(null);
  const [netId, setNetId] = useState<number | null>(null);
  const [subnetId, setSubnetId] = useState<number | null>(null);
  const [focusedInput, setFocusedInput] = useState<InputType>(InputType.NONE);

  const getIpClass = (ip: number[]): IpClass | null => {
    const octect = decToBin(ip[0], 8);
    if (octect[0] === 0) {
      return "A";
    } else if (octect[1] === 0) {
      return "B";
    } else if (octect[2] === 0) {
      return "C";
    }
    return null;
  }

  const calcSubnetMask = (netId: number, subnetId: number): number[] => {
    const mask = [0, 0, 0, 0];
    let maskBits = netId + subnetId;
    for (let i = 0; i < 4; i++) {
      if (maskBits >= 8) {
        mask[i] = 255;
        maskBits -= 8;
      } else {
        mask[i] = binToDec(Array(8).fill(0).fill(1, 0, maskBits));
        maskBits = 0;
      }
    }
    return mask;
  }

  const handleIpChange = (ip: number[] | null): void => {
    if (!ip) {
      setNetId(null);
      setIpAddr(null);
      return;
    }
    const ipClass = getIpClass(ip);
    switch (ipClass) {
      case "A": {
        setNetId(8);
        break;
      }
      case "B": {
        setNetId(16);
        break;
      }
      case "C": {
        setNetId(24);
        break;
      }
      default: {
        setNetId(null);
        setIpAddr(null);
        return;  
      }
    }
    if (subnetId === null || ipAddr === null ||
        ipClass !== getIpClass(ipAddr)) {
      setSubnetId(0);
    }
    setIpAddr(ip);
  }

  const handleMaskBitsChange = (bits: number | null): void => {
    if (!bits || netId === null) {
      setSubnetId(null);
      return;
    }
    const newSubnetId = bits - netId;
    if (newSubnetId < 0 || bits > 30) {
      setSubnetId(null);
      return;
    }
    setSubnetId(newSubnetId);
  }

  const handleSubMaskChange = (mask: number[] | null): void => {
    if (!mask) {
      setSubnetId(null);
      return;
    }
    let maskBits = 0;
    for (const octect of mask) {
      let lastBit = 1;
      for (const bit of decToBin(octect, 8)) {
        if (bit === 1) {
          if (lastBit === 0) {
            setSubnetId(null);
            return;  
          }
          maskBits++;
        }
        lastBit = bit;
      }
    }
    handleMaskBitsChange(maskBits);
  }

  const handleSubnetsChange = (subnets: number | null): void => {
    if (!subnets || netId === null) {
      setSubnetId(null);
      return;
    }
    const newSubnetId = Math.ceil(Math.log(subnets) / Math.log(2));
    handleMaskBitsChange(netId + newSubnetId);
  }

  const handleHostsChange = (hosts: number | null): void => {
    if (!hosts) {
      setSubnetId(null);
      return;
    }
    const newHostId = Math.ceil(Math.log(hosts + 3) / Math.log(2));
    handleMaskBitsChange(32 - newHostId);
  }

  const hasMaskBits = netId !== null && subnetId !== null;

  const handleCalculate = (): void => {
    if (ipAddr === null || !hasMaskBits) {
      return;
    }
    const netAddr = [...ipAddr];
    for (let i = 0; i < 4; i++) {
      if (netId <= i*8) {
        netAddr[i] = 0;
      }
    }
    props.onCalculate(netAddr, subnetId, 32 - netId - subnetId);
  }

  return (
    <section>
      <IpInput
        label="IP Address"
        onChange={(ip) => {
          setFocusedInput(InputType.IP_ADDR);
          handleIpChange(ip);
        }}
      />
      <PosNumInput
        label="Mask Bits"
        value={focusedInput === InputType.MASK_BITS ? undefined
          : hasMaskBits ? netId+subnetId
          : null
        }
        max={30}
        disabled={netId === null}
        onChange={(bits) => {
          setFocusedInput(InputType.MASK_BITS);
          handleMaskBitsChange(bits);
        }}
      />
      <IpInput
        label="Subnet Mask"
        value={focusedInput === InputType.SUB_MASK ? undefined
          : hasMaskBits ? calcSubnetMask(netId, subnetId)
          : null
        }
        disabled={netId === null}
        onChange={(mask) => {
          setFocusedInput(InputType.SUB_MASK);
          handleSubMaskChange(mask);
        }}
      />
      <PosNumInput
        label="Number of Subnets"
        value={focusedInput === InputType.SUBNETS ? undefined
          : hasMaskBits ? Math.pow(2, subnetId)
          : null
        }
        max={Math.pow(2, 32)}
        disabled={netId === null}
        large
        onChange={(subnets) => {
          setFocusedInput(InputType.SUBNETS);
          handleSubnetsChange(subnets);
        }}
      />
      <PosNumInput
        label="Hosts per Subnet"
        value={focusedInput === InputType.HOSTS ? undefined
          : hasMaskBits ? Math.pow(2, 32-netId-subnetId)-3
          : null
        }
        max={Math.pow(2, 32)}
        disabled={netId === null}
        large
        onChange={(hosts) => {
          setFocusedInput(InputType.HOSTS);
          handleHostsChange(hosts);
        }}
      />
      <button
        className="primary-btn calculate-btn"
        disabled={ipAddr === null || !hasMaskBits}
        onClick={handleCalculate}
      >
        Calculate
      </button>
    </section>
  );
}

export default InputsController;
