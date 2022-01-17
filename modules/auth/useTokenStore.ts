import { isServer } from "../../lib/constants";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";
const accessTokenKey = "@app/accessToken";
const refreshTokenKey = "@app/refreshToken";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || "",
      };
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: "",
  };
};

const useTokenStore = create(
  devtools(
    combine(
      getDefaultValues(),
      (
        set: (arg0: { accessToken?: string; refreshToken?: string }) => void
      ) => ({
        setAccessToken: (accessToken: string) => {
          localStorage.setItem(accessTokenKey, accessToken);
          set({ accessToken });
        },
        setRefreshToken: (refreshToken: string) => {
          localStorage.setItem(refreshTokenKey, refreshToken);
          set({ refreshToken });
        },
        clearTokens: () => {
          localStorage.removeItem(accessTokenKey);
          localStorage.removeItem(refreshTokenKey);
          set({ accessToken: "", refreshToken: "" });
        },
      })
    ),
    { name: "tokenStore" }
  )
);

export default useTokenStore;
