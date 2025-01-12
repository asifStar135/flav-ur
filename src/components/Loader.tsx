"use client";

import React from "react";

const Loader = ({ classn }: any) => {
  return (
    <div
      className={
        "flex gap-5 items-center justify-center animate-pulse " + classn
      }
    >
      <h1 className="text-lg xl:text-2xl text-gray-300">
        Hang on, it's on the way...
      </h1>
      <img src="/assets/loader.gif" alt="" className="w-32" />
    </div>
  );
};

export default Loader;
