import React, { useState, useEffect } from "react";
import blurredImage from "../../assets/LoginScreen/blurredImage.png";
import expandRight from "../../assets/LoginScreen/Expand_right.png";
import dots from "../../assets/LoginScreen/dots.png";
import books from "../../assets/LoginScreen/bookCorner.png";
import star from "../../assets/LoginScreen/star.png";
import cap from "../../assets/LoginScreen/cap.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import fetchPhotoSlider from "../../actions/LoginScreens/fetchPhotoSlider";

function AboutPareekshn() {
  const [photo, setPhoto] = useState([]);
  const [errors, setErrors] = useState(null);

  const getFetchPhotoSliderData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const response = await fetchPhotoSlider();
      if (response?.data?.code === 1000) setPhoto(response?.data?.photos);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getFetchPhotoSliderData();
  }, []);

  return (
    <div className="w-1/2 p-10 flex h-screen relative">
      <img
        src={books}
        alt=""
        className="absolute top-0 right-0 h-20 grayscale"
      />
      <img src={star} alt="" className="absolute top-0 left-1/2 h-24" />
      <img src={cap} alt="" className="absolute h-16 bottom-36 left-2" />

      <div className="flex flex-col text-xl text-[#1C4481]">
        <span className="font-medium">About</span>
        <span className="font-bold text-2xl">Pareekshn</span>
      </div>

      <Carousel
        className="mt-40"
        autoPlay
        infiniteLoop
        interval={1300}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {Array.isArray(photo) &&
          photo.map((data, index) => (
            <>
              <div
                key={index}
                className="overflow-hidden flex flex-col justify-center items-center w-full "
              >
                <div className="flex justify-center items-center relative mr-10 ">
                  <img src={data.photo_url} alt="" className="h-80" />
                  <div className="h-[290px] bg-[#CBD9FF] rounded-3xl w-[420px] absolute z-[-1]"></div>
                  <div className="h-[240px] bg-[#9CB8FF87] rounded-3xl w-[450px] absolute z-[-2]"></div>
                </div>
              </div>
              <p className="text-center text-sm py-9">
                <span className="font-semibold ">{data.photo_text}</span>
              </p>
            </>
          ))}
      </Carousel>
    </div>
  );
}

export default AboutPareekshn;
