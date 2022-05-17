import React, { useState } from "react";

interface Props {
  label: string;
  isMask?: boolean;
  onChange: (octects: number[]) => void;
}

const IpInput: React.FC<Props> = (props) => {
  const [octects, setOctects] = useState<(number | null)[]>(Array(4).fill(null));

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
    if (octect === null && e.target.value.length > 0) {
      return;
    }
    const octectsTemp = [...octects];
    octectsTemp[octectIndex] = octect;
    if (!octectsTemp.some((o) => o === null)) {
      props.onChange(octectsTemp as number[]);
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
            onChange={(e) => handleChange(e, i)}
          />
          {i < octects.length-1 && "."}
        </React.Fragment>
      )}
    </div>
  );
}

export default IpInput;
