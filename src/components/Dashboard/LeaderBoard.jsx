import React, { useEffect, useState } from "react";
import arrowdown from "../../assets/Dashboard/arrowdown.png";
import leaderboard from "../../actions/Hackthon/leaderboard";

function LeaderBoard() {
  const [leaderData, setLeaderData] = useState([]);
  const [leaderHackathonData, setLeaderHackathonData] = useState({});
  const [errors, setErrors] = useState(false);

  const getLeaderboardData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await leaderboard(data);
      if (response?.data?.code === 1000)
        setLeaderData(response?.data?.hackathon.students);
      setLeaderHackathonData(response?.data?.hackathon);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

  return (
    <div className="  bg-white min-h-full rounded-2xl p-4 flex flex-col gap-4">
      <div className="flex justify-between h-14">
        <span className="font-semibold">Leaderboard</span>
        <div className="text-sm flex flex-col gap-2">
          <span className="text-[#1C4481]">Hackathon Name</span>
          <div className="text-center flex items-center justify-center rounded-md shadow-allBorder ">
            <span>{leaderHackathonData.hackthon_title}</span>
            <img src={arrowdown} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <span className="font-medium">Top Five</span>
        <div className="flex flex-col items-center text-[#0A2E89] font-medium bg-[#C9DCF8] p-1 px-2 rounded-md">
          <span>Total Candidate</span>
          <span className="text-xl">{leaderData.length}</span>
        </div>
      </div>
      <div className="bg-[#1C4481] h-12 w-full rounded-t-xl">
        <div className="text-white flex p-4 items-center  gap-8 justify-around">
          <span className="w-1/12">Rank</span>
          <span className="w-2/3">Candidate</span>
          {/* {data.student_name} */}
          <span className="w-1/5">Location</span>
          <span className="w-1/12 mr-7">Marks%</span>
          {/* {data.total_marks} */}
        </div>
        <div className="flex flex-col">
          {leaderData &&
            leaderData.map((data) => (
              <div className="flex items-center justify-center">
                <span className="w-1/12 text-center ml-2">Rank</span>
                <span className="w-2/3 text-center ">{data.student_name}</span>

                <span className="w-1/5 text-center mr-10">Location</span>
                <span className="w-1/12 text-center mr-10">
                  {data.obtain_marks}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
