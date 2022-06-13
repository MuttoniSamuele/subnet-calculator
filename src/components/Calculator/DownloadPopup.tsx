import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import WarningNote from "./WarningNote";
import { calcSubnet } from "../../logics/addrUtils";
import { downloadCsv } from "../../logics/csv";

const MAX_SUBNETS = 8192; // max number of subnets in the CSV

interface Props {
  netAddr: number[];
  subnetId: number;
  hostId: number;
  onClose: () => void;
}

const DownloadPopup: React.FC<Props> = (props) => {
  const [hasSemicolon, setHasSemicolon] = useState(false);
  const subnetsCnt = Math.pow(2, props.subnetId);

  const addrToStrArr = (addr: number[]) => {
    return addr.map((v): string => v.toString());
  }

  const handleDownload = (): void => {
    const tableHeading: string[] = ["Network address", "First host", "Last host", "Broadcast address"].reduce(
      (r: string[], e) => {
        r.push(e, ...Array(3).fill(""));
        return r;
      }, []
    );
    tableHeading.unshift("Subnet");
    const subnetsTable = [...Array(subnetsCnt > MAX_SUBNETS ? MAX_SUBNETS : subnetsCnt)].map(
      (v, i): string[] => {
        const subnet = calcSubnet(props.netAddr, props.hostId, i);
        return [
          (i + 1).toString(),
          ...addrToStrArr(subnet.network),
          ...addrToStrArr(subnet.firstHost),
          ...addrToStrArr(subnet.lastHost),
          ...addrToStrArr(subnet.broadcast)
        ];
      }
    );
    downloadCsv([tableHeading, ...subnetsTable], hasSemicolon);
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    setHasSemicolon(e.currentTarget.checked);
  }

  return ReactDOM.createPortal(
    <div className="popup-background">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={props.onClose}>
          <i className="cross"></i>
        </button>
        <div className="popup-title">Download as CSV</div>

        {subnetsCnt > MAX_SUBNETS &&
          <WarningNote
            content={"The network you are trying to download has too many subnets. " +
            `For performance reasons the number of subnets is limited to ${MAX_SUBNETS}.`}
          />
        }
        <WarningNote
          content={"CSV files might not work properly on some windows devices. " +
          "If that's the case it is recomended to toggle the option below."}
        />

        <label className="popup-checkbox-container">
          <input
            type="checkbox"
            checked={hasSemicolon}
            onChange={handleCheck}
          />
          <i className="checkmark"></i>
          Use semicolon as separator
        </label>

        <div className="download-btn-wrapper">
          <button
            className="primary-btn download-btn"
            onClick={handleDownload}
          >Download</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DownloadPopup;
