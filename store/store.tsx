import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type State = {
  isDashboardSidebarOpen: Boolean;
};

export type Action = {
  ToggleSidebarFuncHandler: () => void;
  CloseSidebarFuncHandler: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const AdminStore = create<State & Action>()(
  devtools((set) => ({
    // Bucks State
    isDashboardSidebarOpen: false,

    // () => {} Toogle dashboard sidebar
    ToggleSidebarFuncHandler: () => {
      set((store) => ({
        isDashboardSidebarOpen: !store.isDashboardSidebarOpen,
      }));
    },

    // () => {} Close dashboard sidebar
    CloseSidebarFuncHandler: () => {
      set(() => ({
        isDashboardSidebarOpen: false,
      }));
    },
  }))
);

export default AdminStore;
