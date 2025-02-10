"use client"; // ✅ Client Component

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ✅ ImageGallery ko dynamically import karo SSR disable karne ke liye
const ImageGallery = dynamic(() => import("@/components/ImageGallery"), {
  ssr: false,
});

const Page = () => {
  const [marks, setMarks] = useState("?");
  const [user2, setUser2] = useState("Abdullah");

  const [tempMarks, setTempMarks] = useState("");
  const [tempUser, setTempUser] = useState("");

  const changeHandle = () => {
    if (tempMarks) setMarks(tempMarks);
    if (tempUser) setUser2(tempUser);
    setTempMarks(""); // ✅ Clear input after update
    setTempUser(""); // ✅ Clear input after update
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <h1 className="text-2xl font-bold text-orange-600">
          <span className="text-stone-600">{user2}</span> has marks:
          <span className="text-stone-600"> {marks}</span>
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={tempUser}
          onChange={(e) => setTempUser(e.target.value)}
          className="bg-slate-300 px-4 text-black py-2 rounded-md"
        />

        <input
          type="number"
          placeholder="Enter Marks"
          value={tempMarks}
          onChange={(e) => setTempMarks(e.target.value)}
          className="bg-slate-300 px-4 text-black py-2 rounded-md"
        />

        <h2 className="text-sm text-gray-700">
          Click the button to update the marks
        </h2>

        <button
          onClick={changeHandle}
          className="bg-slate-400 px-4 text-white py-2 rounded-md hover:bg-slate-500 transition-colors"
        >
          Update
        </button>
      </div>

      {/* ✅ Dynamically imported component */}
      <ImageGallery />
    </>
  );
};

export default Page;
