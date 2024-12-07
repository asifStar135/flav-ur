"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/user/signup", userData);
      if (response.data.success) {
        toast.success("User signup successful. You can login now.");
        router.push("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 text-xl w-1/2 my-16 mx-auto bg-gray-800 rounded-xl shadow">
      <h2 className="text-center text-3xl my-4">Signup Page </h2>
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
          <p>Email</p>
          <input
            className="rounded p-1 w-full bg-gray-700"
            placeholder="Enter your email address"
            type="email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
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

        <div>
          <p>Confirm Password</p>
          <input
            className="rounded p-1 w-full bg-gray-700"
            type="password"
            required
            placeholder="Confirm password..."
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
        </div>

        <button
          className="border disabled:bg-gray-500 disabled:cursor-not-allowed border-gray-300 rounded-lg p-2 px-4 w-auto mx-auto text-center"
          type="submit"
          disabled={isLoading}
        >
          Sign Up
        </button>
        <Link href="/login" className="text-lg text-center underline">
          go to login page
        </Link>
      </form>
    </div>
  );
}
