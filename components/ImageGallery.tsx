"use client";
import React, { useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [image, setimage] = useState([]);

  // useEffect(() => { automatic call to getImages() on page load
  //   getImages();
  // }, []);

  const getImages = async () => {
    try {
      const response = await axios.get("https://picsum.photos/v2/list");
      const data = response.data;
      setimage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex bg-zinc-200 flex-col gap-4 items-center min-screen">

        <div className="text-center mt-10">
          <h1 className="text-2xl pt-6 pb-2 font-bold">Image Gallery</h1>

          <div className="p-4 bg-slate-300 m-4 rounded-md columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {image.map((user, i) => (
              <div key={i} className="break-inside-avoid mb-4 group relative">
                <img
                  title="image"
                  src={user.download_url}
                  className="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
              </div>
            ))}
          </div>

          <button
            onClick={getImages}
            className="px-4 py-2 m-8 bg-orange-300 hover:bg-orange-200 rounded-md"
          >
            Get Images
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
