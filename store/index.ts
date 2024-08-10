import { KVObject } from "@/types";
import { getLocalStorage } from "@/utils/localStorage";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  user: KVObject;
  isBind2fa: boolean;
  setUser: (token: State["user"]) => void;
  setBind2fa: (token: State["isBind2fa"]) => void;
  reset: () => void;
}

const localStoreUser =
  typeof window !== "undefined" ? getLocalStorage("user", true) ?? {} : {};

export const useUserStore = create<State>()(
  devtools(
    (set) => ({
      user: localStoreUser,
      isBind2fa: true, // 有没有绑定google authenticator
      setUser: (user: KVObject) => set(() => ({ user })),
      setBind2fa: (isBind2fa: boolean) => set(() => ({ isBind2fa })),
      reset: () => set(() => ({ user: {}, isBind2fa: true })),
    }),
    { enabled: process.env.NODE_ENV != "production", name: "useUserStore" }
  )
);
