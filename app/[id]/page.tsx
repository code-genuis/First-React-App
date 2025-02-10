"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// Define the type correctly
interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  // Ensure id is properly extracted
  const id = await params.id;

  const [users, setUsers] = useState("");
  const [userId, setUserId] = useState("");
  const [website, setWebsite] = useState("");

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUsers(data.name);
      setUserId(data.id);
      setWebsite(data.website);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (id) getUsers();
  }, [id]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-green-800 mb-5 text-center border-b pb-3">
            User Details
          </h1>
          <div className="space-y-3 text-gray-800">
            <p className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="font-semibold">{users}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-gray-600">ID:</span>
              <span className="font-mono text-green-700">{userId}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Website:</span>
              {website ? (
                <a
                  href={`https://${website}`}
                  className="text-blue-600 hover:underline hover:text-blue-800 break-all max-w-[60%] text-right"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {website}
                </a>
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
