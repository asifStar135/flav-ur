"use client";

import React, { useEffect, useState } from "react";
import { GrSearchAdvanced } from "react-icons/gr";
import { MdOutlineMenuBook, MdOutlineFoodBank } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathName]);

  return (
    <nav className="text-yel">
      <div className="flex items-center justify-between px-10 xl:px-40 pt-10">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="h-12 xl:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
          <NavLinks pathName={pathName} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden flex flex-col items-end gap-5 py-6 pr-11 transition-all w-full ${
          menuOpen ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <NavLinks pathName={pathName} />
      </div>
    </nav>
  );
};

// Component for navigation links
const NavLinks = ({ pathName }: { pathName: string }) => {
  return (
    <>
      <Link
        href="/discover"
        className={
          "flex items-center gap-2 text-2xl p-1 rounded " +
          (pathName == "/discover" && " border-b-2 border-yel")
        }
      >
        <GrSearchAdvanced />
        Discover
      </Link>
      <Link
        href="/cookbook"
        className={
          "flex items-center gap-2 text-2xl p-1 rounded " +
          (pathName == "/cookbook" && " border-b-2 border-yel")
        }
      >
        <MdOutlineMenuBook />
        CookBook
      </Link>
      <Link
        href="/profile"
        className={
          "flex items-center gap-2 text-2xl p-1 rounded " +
          (pathName == "/profile" && " border-b-2 border-yel")
        }
      >
        <RiShieldUserFill />
        Profile
      </Link>
    </>
  );
};

export default Header;
