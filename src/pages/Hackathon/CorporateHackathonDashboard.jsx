import React from "react";
import hack from "../../assets/Hackathon/hack.png";

function CorporateHackathonDashboard() {
  return (
    <div>
      <div className="bg-[#EDF2FF] min-h-screen mx-6 my-8 rounded-3xl">
        <div className="p-8 w-full flex">
          <div className="full w-9/12">
            <span className="font-semibold text-[#1C4481]">Overview</span>
            <div className="bg-white p-2 rounded-3xl w-full">
              <img src={hack} alt="" className="" />
              <p className="my-8 text-[#6A6A6A] p-4">
                ontrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32. The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham. ontrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC, making it over 2000 years old. Richard
                McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage, and going through the
                cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
                and Evil) by Cicero, written in 45 BC. This book is a treatise
                on the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                comes from a line in section 1.10.32. The standard chunk of
                Lorem Ipsum used since the 1500s is reproduced below for those
                interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914
                translation by H. Rackham.
              </p>
            </div>
          </div>
          <div className="w-3/12 h-96 flex justify-center">
            <div className="mt-20 bg-white w-5/6 p-10 rounded-xl flex flex-col gap-2 shadow-xl">
              <div className="flex flex-col">
                <span className="text-[#3A7CE8] font-semibold">Start from</span>
                <span className="font-semibold text-sm">Jul 1 - 20, 2023</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#3A7CE8] font-semibold">Happening</span>
                <span className="font-semibold text-sm">Online</span>
              </div>
              <div className="flex flex-col bg-[#66C5FA1F] p-2">
                <span className="text-[#3A7CE8] text-sm">
                  Application close in
                </span>
                <span className="text-[#0463FF] font-medium">4d:7h:48m</span>
              </div>
              <button className="bg-[#5715E3] text-xl text-white font-semibold rounded-full h-8">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateHackathonDashboard;
