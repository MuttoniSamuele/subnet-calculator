import React, { useState, useEffect } from "react";
import { IpAddr } from "../../logics/addrUtils";

interface Props {
  label: string;
  value?: IpAddr | null;
  disabled?: boolean
  onChange: (octects: IpAddr | null) => void;
}

const IpInput: React.FC<Props> = (props) => {
  type RawIpAddr = [number | null, number | null, number | null, number | null];

  const [octects, setOctects] = useState<RawIpAddr>(
    props.value ? props.value : Array(4).fill(null) as RawIpAddr
  );

  useEffect(() => {
    if (props.value !== undefined) {
      setOctects(props.value !== null ? props.value : Array(4).fill(null) as RawIpAddr);
    }
  }, [props.value]);

  // Converts the given string to an acceptable octect.
  // Returns null if the octect is not acceptable.
  const strToOctect = (octect: string): number | null => {
    const octectNum = parseInt(octect);
    if (isNaN(octectNum) || octectNum > 255 || octectNum < 0) {
      return null;
    }
    return octectNum;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, octectIndex: number): void => {
    const octect = strToOctect(e.target.value);
    if ((octect === null || isNaN(Number(e.target.value))) && e.target.value.length > 0) {
      return;
    }
    const octectsTemp: RawIpAddr = [...octects];
    octectsTemp[octectIndex] = octect;
    if (!octectsTemp.some((o) => o === null)) {
      props.onChange(octectsTemp as IpAddr);
    } else {
      props.onChange(null);
    }
    setOctects(octectsTemp);
  }

  return (
    <div className="input-wrapper">
      <div className="input-label">{props.label}</div>
        {octects.map((octect, i) =>
          <React.Fragment key={i}>
            <input
              type="text"
              value={octect !== null ? octect : ""}
              disabled={props.disabled}
              onChange={(e) => handleChange(e, i)}
            />
          </React.Fragment>
        )}
    </div>
  );
}

export default IpInput;
