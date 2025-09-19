import { User } from "@/types/user-interface";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data;
}
