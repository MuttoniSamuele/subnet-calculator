import React, { useState } from "react";
import DownloadPopup from "./DownloadPopup";

interface Props {

}

const DownloadBtn: React.FC<Props> = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpen = (): void => {
    setPopupOpen(true);
  }

  const handleClose = (): void => {
    setPopupOpen(false);
  }

  return (
    <>
      <button
        className="primary-btn download-btn"
        onClick={handleOpen}
      >Download</button>
      {isPopupOpen &&
        <DownloadPopup
          onClose={handleClose}
        />
      }
    </>
  );
}

export default DownloadBtn;
