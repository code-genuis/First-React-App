"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-6 py-4 bg-slate-400 flex justify-between items-center shadow-md">
      
      <Link href={"/"} className="text-xl font-bold">CodeGenius.Dev</Link>

      <div className="flex space-x-6">
        <Link href={"/Dashboard"}>Dashboard</Link>
        <Link href={"/About"}>About</Link>
        <Link href={"/Service"}>Service</Link>
        <Link href={"/Contact"}>Contact</Link>
      </div>
    </header>
  );
};

export default Header;
