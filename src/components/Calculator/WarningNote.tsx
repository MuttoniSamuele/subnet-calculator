import React from "react";

interface Props {
  content: string;
}

const WarningNote: React.FC<Props> = (props) => {
  return (
    <div className="warn-note-container">
      <p className="warn-note-content">
        <div className="warn-note-title">Warning</div>
        {props.content}
      </p>
    </div>
  );
}

export default WarningNote;
