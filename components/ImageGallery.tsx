"use client";
import React, { useState} from "react";
import axios from "axios";
// import Image from "next/image";

const ImageGallery = () => {
  const [images, setImages] = useState([]); // Renamed 'image' to 'images' for clarity


  const getImages = async () => {
    try {
      const response = await axios.get("https://picsum.photos/v2/list");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-200 py-10">
      <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>

      <div className="p-4 bg-slate-300 rounded-md columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid mb-4 group relative">
            <img
              src={img.download_url}
              alt={`Image ${i + 1}`}
              width={300} // ✅ Set proper width & height for Next.js Image optimization
              height={200}
              className="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
          </div>
        ))}
      </div>

      <button
        onClick={getImages}
        className="mt-6 px-6 py-3 bg-orange-500 text-white text-lg rounded-lg shadow-md hover:bg-orange-400 transition-all"
      >
        Refresh Images
      </button>
    </div>
  );
};

export default ImageGallery;
