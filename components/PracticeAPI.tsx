"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define a TypeScript interface for Users
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const PracticeAPI = () => {
  const [buttonText, setButtonText] = useState("Fetch Data");
  const [users, setUsers] = useState<User[]>([]); // ✅ Fixed Type
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      setButtonText("Fetching...");
      const { data } = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users"); // ✅ Typed API response
      setUsers(data);
      setButtonText("Data Fetched ✅");
    } catch (error) {
      console.error("Error fetching users:", error);
      setButtonText("Retry Fetching ❌");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount (optional)
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="p-8 bg-emerald-100 flex items-center">
      <div className="bg-slate-100 text-center w-screen p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-xl mb-2 font-bold text-green-900">API Data</h2>
        <p className="text-sm text-green-700">
          This is where the API data will be displayed.
        </p>

        <button
          onClick={getUsers}
          className={`bg-green-500 text-white px-4 py-2 rounded-md mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
          disabled={loading}
        >
          {buttonText}
        </button>

        <div className="mt-8 mx-4 md:mx-8 lg:mx-12">
          {/* Loader Placeholder */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-300 animate-pulse rounded-2xl shadow-sm" />
              ))}
            </div>
          )}

          {!loading && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user) => (
                <div key={user.id} className="p-6 rounded-lg shadow-md bg-white">
                  ---{" "}
                  <a
                    className="text-sm bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
                    href={`/${user.id}`}
                  >
                    Explore
                  </a>{" "}
                  ---
                  <h3 className="text-xl pt-3 pb-2 font-bold text-green-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-green-600">@{user.username.toLowerCase()}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No users found
              </h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PracticeAPI;
