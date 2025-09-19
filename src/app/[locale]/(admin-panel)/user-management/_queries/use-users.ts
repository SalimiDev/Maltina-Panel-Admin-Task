"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/users";
import { User } from "@/types/user-interface";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

//?examples for using useMutation
// export function useDeleteUser() {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, number>({
//     mutationFn: async (id: number) => {
//       await deleteUser(id);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     onError: (error) => {
//       console.error("Failed to delete user:", error);
//     },
//   });
// }

// export function useAddUser() {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, User>({
//     mutationFn: async (user: User) => {
//       await addUser(user);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     onError: (error) => {
//       console.error("Failed to add user:", error);
//     },
//   });
// }
