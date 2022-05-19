import React, { useState, useEffect } from "react";

interface Props {
  label: string;
  value?: number | null;
  max?: number;
  disabled?: boolean
  onChange: (num: number | null) => void;
}

const PosNumInput: React.FC<Props> = (props) => {
  const [num, setNum] = useState<number | null>(
    props.value === undefined ? null : props.value
  );

  useEffect(() => {
    if (props.value !== undefined) {
      setNum(props.value);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNum: number | null = parseInt(e.target.value);
    if (e.target.value.length === 0) {
      newNum = null;
    } else if (isNaN(newNum) || isNaN(Number(e.target.value)) ||
        newNum <= 0 || (props.max && newNum > props.max)) {
      return;
    }
    props.onChange(newNum);
    setNum(newNum);
  }

  return (
    <div className="input-wrapper">
      <div className="input-label">{props.label}</div>
      <input
        type="text"
        value={num !== null ? num : ""}
        disabled={props.disabled}
        onChange={handleChange}
      />
    </div>
  );
}

export default PosNumInput;
