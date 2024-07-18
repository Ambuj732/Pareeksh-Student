import React, { useEffect, useState } from "react";
import next from "../../assets/Dashboard/next.png";
import getSectors from "../../actions/Dashboard/getSectors";
import sectorSelection from "../../actions/Dashboard/sectorSelection";

function Sectors() {
  const [sectors, setSectors] = useState([]);

  const getSectorsHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
      }
      const response = await getSectors(data);
      if (response?.data?.code === 1000) {
        setSectors(response?.data?.sector);
        console.log("Sectors :: ", response?.data?.sector);
      }
    } catch (error) {
      console.log("Error while getting sectors :: ", error);
    }
  };

  const selectSectorHandler = async (sectorId, select) => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        id_sector: sectorId,
        select: select === true ? 0 : 1,
      };
      console.log("Data :: ", data);
      const response = await sectorSelection(data);
    } catch (error) {
      console.log("Error while selecting/unselecting sector :: ", error);
    }
  };

  useEffect(() => {
    getSectorsHandler();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {sectors?.map((sector) => (
        <div
          key={sector?.id_sector}
          className="h-20 w-11/12 rounded-full w- p-8 justify-between shadow-allBorder flex items-center"
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={sector?.status}
              onClick={() =>
                selectSectorHandler(sector?.id_sector, sector?.status)
              }
              className="h-4 w-4"
            />
            <span>{sector?.sector_name}</span>
          </div>
          <img src={next} alt="" className="h-12 shadow-2xl" />
        </div>
      ))}
    </div>
  );
}

export default Sectors;
