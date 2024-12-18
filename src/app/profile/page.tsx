"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("data:", res.data);
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("data:", res.data.data._id);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to fetch user details");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Profile</h1>
        <hr className="mb-4" />
        <p className="text-lg text-gray-600 mb-4 text-center">Profile page</p>
        <h2 className="text-xl text-gray-700 mb-4 text-center">
          {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">{data}</Link>}
        </h2>
        <hr className="mb-4" />
        <div className="flex flex-col space-y-4">
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}