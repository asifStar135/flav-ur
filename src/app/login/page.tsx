"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/store";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { setUser } = store();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/user/login", userData);
      if (response.data.success) {
        toast.success("User login successful");
        //  setting user
        setUser(response.data.user);
        router.push("/");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 text-xl w-1/2 my-20 mx-auto bg-gray-800 rounded-xl shadow">
      <h2 className="text-center text-3xl my-4">Login Page </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around gap-5 w-2/3 mx-auto"
      >
        <div>
          <p>Username</p>
          <input
            className="rounded p-1 w-full bg-gray-700"
            placeholder="Enter your username..."
            type="text"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="rounded p-1 w-full bg-gray-700"
            type="password"
            required
            placeholder="Enter password..."
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <button
          disabled={isLoading}
          className="border disabled:bg-gray-500 disabled:cursor-not-allowed border-gray-300 rounded-lg p-2 px-4 w-auto mx-auto text-center"
          type="submit"
        >
          Login
        </button>

        <Link href="/signup" className="text-lg text-center underline">
          go to signup page
        </Link>
      </form>
    </div>
  );
}
