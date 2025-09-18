"use client";

import { User as UserType } from "@/mock-data/users";

type Props = {
  users: UserType[];
};

export default function UserListTable({ users }: Props) {
  const handleDelete = (userId: number) => {
    // TODO: Implement delete functionality
    console.log("Delete user with ID:", userId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="">
          <tr className="[&>th]:text-subtle-foreground [&>th]:border-border-default [&>th]:border-b [&>th]:px-6 [&>th]:py-3 [&>th]:text-start [&>th]:tracking-wider [&>th]:uppercase">
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>CITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-border-default divide-y">
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-subtle-foreground hover:bg-muted-foreground hover:text-strong-foreground text-sm transition-colors duration-100 [&>td]:px-6 [&>td]:py-4 [&>td]:whitespace-nowrap"
            >
              <td>{user.id}</td>
              <td className="font-medium">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-danger hover:bg-danger-hover rounded px-3 py-1 text-white transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
