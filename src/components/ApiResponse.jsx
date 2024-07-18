import React, { useState, useEffect } from "react";

const SlidingMessage = ({ message, setError }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      // Reset error message after 1 second
      const resetTimeout = setTimeout(() => {
        setError("");
      }, 100);

      return () => {
        clearTimeout(resetTimeout);
      };
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setError]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-10 w-fit transition-all duration-500 ${
        isVisible ? "opacity-100 right-8" : "opacity-0 right-[500px]"
      }`}
    >
      <div className="bg-red-900 text-white px-7 py-3 font-semibold rounded-md shadow-md">
        {message}
      </div>
    </div>
  );
};

export default SlidingMessage;
