import React from "react";
import { GrSearchAdvanced } from "react-icons/gr";
import { MdOutlineFoodBank, MdOutlineMenuBook } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";

const Header = () => {
  return (
    <div className="xl:flex px-20 py-5 justify-between">
      <div className="flex w-1/6">
        <Link href="/">
          <img src="/assets/logo.png" className="" alt="" />
        </Link>
      </div>
      <div className="xl:flex gap-10 text-yel">
        <Link href="/discover" className="flex items-center gap-3 text-2xl">
          <GrSearchAdvanced />
          Discover
        </Link>
        <Link href="/cookbook" className="flex items-center gap-3 text-2xl">
          <MdOutlineMenuBook />
          CookBook
        </Link>
        <Link href="/profile" className="flex items-center gap-3 text-2xl">
          <RiShieldUserFill />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
