import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import useTokenStore from "../auth/useTokenStore";

const useAppStore = create(
  devtools(
    combine(
      {
        isLoading: false,
        isLoggedIn:
          !!(
            // useTokenStore.getState().refreshToken &&
            useTokenStore.getState().accessToken
          ),
        isSidebarOpen: true,
      },
      (set, get) => ({
        setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
        setIsLoggedIn: (isLoggedIn) =>
          set((state) => ({ ...state, isLoggedIn })),
        toggleSidebar: () =>
          set((state) => ({ ...state, isSidebarOpen: !state.isSidebarOpen })),
        logout: async () => {
          useTokenStore.getState().clearTokens();
          set(() => ({
            isLoggedIn: false,
          }));
        },
      })
    ),
    { name: "AppStore" }
  )
);

export default useAppStore;
