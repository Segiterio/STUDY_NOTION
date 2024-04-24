import React from "react";

const Loader = ({ isCategoryLoader }) => {
  return (
    <div className={isCategoryLoader ? "bg-richblack-5" : "bg-richblack-900"}>
      <div
        className={
          (isCategoryLoader ? " h-32 w-32 " : " h-screen w-screen ") +
          " flex justify-center items-center "
        }
      >
        <div
          className={
            (isCategoryLoader ? " w-14 h-14 " : " w-20 h-20 ") + " lds-ring "
          }
        >
          <div className={isCategoryLoader ? "w-10 h-10" : "w-16 h-16"}></div>
          <div className={isCategoryLoader ? "w-10 h-10" : "w-16 h-16"}></div>
          <div className={isCategoryLoader ? "w-10 h-10" : "w-16 h-16"}></div>
          <div className={isCategoryLoader ? "w-10 h-10" : "w-16 h-16"}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
