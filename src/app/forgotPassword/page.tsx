"use client"
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function forgotpassword(){
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        oldPassword:"",
        newPassword: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const ChangePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", {token, ...user});
            console.log("passwordchanged Successfully", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("password change failed", error.message);
        } finally{
        setLoading(false);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return(
<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="OldPassword">Old Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="OldPassword"
            type="text"
            value={user.oldPassword}
            onChange={(e) => setUser({...user, oldPassword : e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.newPassword}
            onChange={(e) => setUser({...user, newPassword: e.target.value})}
            placeholder="password"
            />
          <button
            onClick={ChangePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Change Password</button>
        </div>
    )
}