import React, { useState } from "react";

interface Props {
  label: string;
  onChange: (num: number) => void;
}

const PosNumInput: React.FC<Props> = (props) => {
  const [num, setNum] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNum: number | null = parseInt(e.target.value);
    if (e.target.value.length === 0) {
      newNum = null;
    } else if (isNaN(newNum) || newNum <= 0) {
      return;
    } else {
      props.onChange(newNum);
    }
    setNum(newNum);
  }

  return (
    <div className="input-wrapper">
      <div className="input-label">{props.label}</div>
      <input
        type="text"
        value={num !== null ? num : ""}
        onChange={handleChange}
      />
    </div>
  );
}

export default PosNumInput;
