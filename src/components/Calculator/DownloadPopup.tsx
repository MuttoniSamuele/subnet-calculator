import React from "react";
import ReactDOM from "react-dom";
import WarningNote from "./WarningNote";

interface Props {
  onClose: () => void;
}

const DownloadPopup: React.FC<Props> = (props) => {
  return ReactDOM.createPortal(
    <div className="popup-background">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={props.onClose}>
          <i className="cross"></i>
        </button>
        <div className="popup-title">Download as CSV</div>
        {false &&
          <WarningNote
            content={"The network you are trying to download has too many subnets. " +
            "For performance reasons the number of subnets is limited to 1024."}
          />
        }
        <WarningNote
          content={"CSV files might not work properly on some windows devices. " +
          "If that's the case it is recomended to toggle the option below."}
        />
        <label className="popup-checkbox-container">
          <input type="checkbox" />
          <i className="checkmark"></i>
          Use semicolon as separator
        </label>
        <div className="download-btn-wrapper">
          <button
            className="primary-btn download-btn"
            onClick={() => {}}
          >Download</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DownloadPopup;
