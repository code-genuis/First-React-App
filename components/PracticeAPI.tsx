"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PracticeAPI = () => {
  const [button, setbutton] = useState("Fetch Data");
  const [Users, setUsers] = useState([]);

  const getUsers = async () => {
    setbutton("Data Fetched ✅");
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(data);
    setUsers(data);
  };

  // useEffect(() => {
  //   // API ka data default ma le lena, yani bar bar fetch ni krna perhe ga
  //   getUsers();
  // }, []);

  return (
    <>
      <main className="p-8 bg-emerald-100 flex items-center">
        <div className="bg-slate-100 text-center w-screen p-8 rounded-lg shadow-md mt-8">
          <h2 className="text-xl mb-2 font-bold text-green-900">API Data</h2>
          <p className="text-sm text-green-700">
            This is where the API data will be displayed
          </p>

          <button
            onClick={getUsers}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
          >
            {button}
          </button>

          <div className="mt-8 mx-4 md:mx-8 lg:mx-12">
            {!Users.length && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 bg-slate-300 animate-pulse rounded-2xl shadow-sm"
                  />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* {Users.map((user) => (
                <article key={user.id} className="relative group isolate">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-100 border-2 border-transparent">

                    <header className="flex items-start gap-4 mb-6">

                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 transition-all group-hover:scale-110">
                          {user.name.charAt(0)}
                          <span className="absolute inset-0 border-2 border-indigo-100/30 rounded-xl animate-ping-slow" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">
                          @{user.username.toLowerCase()}
                        </p>
                      </div>
                    </header>

                    <div className="space-y-3">
                      <div className="flex items-center hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                        <a
                          href={`mailto:${user.email}`}
                          className="truncate text-gray-600 hover:text-indigo-600 transition-colors"
                          title={user.email}
                        >
                          {user.email}
                        </a>
                      </div>

                      <div className="flex items-center hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                        <div className="flex flex-col">
                          <a
                            href={`tel:${user.phone}`}
                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                          >
                            {user.phone}
                          </a>
                          <button
                            className="text-xs text-indigo-500 hover:text-indigo-700 mt-1"
                            onClick={() => handleCall(user.phone)}
                          >
                            Schedule Call
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          {user.website}
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                            🔒 Secure
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"></button>
                    </div>
                  </div>
                </article>
              ))} */}
              {Users.map((e) => {
                return (
                  <div key={e.id} className="p-6 rounded-lg shadow-md bg-white">
                    ---{" "}
                    <a
                      className="text-sm bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
                      href={`/${e.id}`}
                    >
                      Explore
                    </a>{" "}
                    ---
                    <h3 className="text-xl pt-3 pb-2 font-bold text-green-800">
                      {e.name}
                    </h3>
                    <p className="text-sm text-green-600">
                      @{e.username.toLowerCase()}
                    </p>
                  </div>
                );
              })}
            </div>

            {!Users.length && (
              <div className="text-center py-12">
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  No users found
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PracticeAPI;
