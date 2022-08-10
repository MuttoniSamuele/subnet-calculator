import React, { useState, useRef } from "react";
import DownloadPopup from "./DownloadPopup";
import { IpAddr } from "../../logics/addrUtils";

interface Props {
  netAddr: IpAddr;
  subnetId: number;
  hostId: number;
}

const DownloadBtn: React.FC<Props> = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const downloadBtnElem = useRef<HTMLButtonElement>(null);

  const handleOpen = (): void => {
    setPopupOpen(true);
  }

  const handleClose = (): void => {
    setPopupOpen(false);
    if (downloadBtnElem.current) {
      downloadBtnElem.current.focus();
    }
  }

  return (
    <>
      <button
        className="primary-btn download-btn"
        onClick={handleOpen}
        ref={downloadBtnElem}
      >Download</button>
      {isPopupOpen &&
        <DownloadPopup
          netAddr={props.netAddr}
          subnetId={props.subnetId}
          hostId={props.hostId}
          onClose={handleClose}
        />
      }
    </>
  );
}

export default DownloadBtn;
