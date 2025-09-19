import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import UserManagementClient from "./_components/UserManagementClient";
import { fetchUsers } from "@/lib/api/users";

export default async function UserManagementPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserManagementClient />
    </HydrationBoundary>
  );
}
