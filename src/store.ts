//  file to handle state management with zustand
import { create } from "zustand";

type UserState = {
  username: string;
  email: string;
  _id: string;
  isVerified: boolean;
  avatar: string;
  preferences: Object;
};

interface Store {
  username: string;
  email: string;
  _id: string;
  isVerified: boolean;
  avatar: string;
  setUser: (user: UserState) => void;
  clearState: () => void;
  preferences: Object;
}

const initialState: UserState = {
  username: "",
  email: "",
  _id: "",
  avatar: "",
  isVerified: false,
  preferences: {},
};

export const store = create<Store>((set) => ({
  ...initialState,
  setUser: (user: UserState) => set(user),
  clearState: () => set(initialState),
}));
