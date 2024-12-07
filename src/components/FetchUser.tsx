"use client";

import { store } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FetchUser = () => {
  const { setUser } = store();
  const router = useRouter();

  const loadUser = async () => {
    try {
      const response = await axios.get(`/api/user/load`);
      console.log(response);
      if (response.data.success) setUser(response.data.user);
      else router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return null;
};

export default FetchUser;
