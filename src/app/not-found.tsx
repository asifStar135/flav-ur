import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      Page not found, go back to <Link href={process.env.DOMAIN!}>home</Link>{" "}
    </div>
  );
};

export default NotFound;
