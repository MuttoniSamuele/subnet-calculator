import React from "react";

interface Props {
  content: string;
}

const WarningNote: React.FC<Props> = (props) => {
  return (
    <div className="warn-note-container">
      <div className="warn-note-title">Warning</div>
      <p className="warn-note-content">
        {props.content}
      </p>
    </div>
  );
}

export default WarningNote;
