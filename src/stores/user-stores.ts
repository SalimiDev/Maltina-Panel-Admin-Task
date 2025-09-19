"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, NewUserInput } from "@/types/user-interface";

type LocalUser = User & {
  isLocal: true;
};

interface UserStore {
  localUsers: LocalUser[];
  deletedApiUserIds: number[];
  isHydrated: boolean;
  addUser: (user: NewUserInput) => void;
  deleteUser: (id: number, isApiUser?: boolean) => void;
  isUserDeleted: (id: number) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      localUsers: [],
      deletedApiUserIds: [],
      isHydrated: false,

      addUser: (user) =>
        set((state) => ({
          localUsers: [
            {
              name: user.name,
              email: user.email,
              username: "",
              phone: "",
              website: "",
              company: {
                name: "",
                catchPhrase: "",
                bs: "",
              },
              address: {
                city: user.city,
                street: "",
                suite: "",
                zipcode: "",
                geo: { lat: "", lng: "" },
              },
              id: Date.now(),
              isLocal: true,
            },
            ...state.localUsers,
          ],
        })),

      deleteUser: (id, isApiUser = false) =>
        set((state) => {
          if (isApiUser) {
            return {
              ...state,
              deletedApiUserIds: [...state.deletedApiUserIds, id],
            };
          }
          return {
            ...state,
            localUsers: state.localUsers.filter((u) => u.id !== id),
          };
        }),

      isUserDeleted: (id) => {
        return get().deletedApiUserIds.includes(id);
      },
    }),
    {
      name: "user-management-store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);
