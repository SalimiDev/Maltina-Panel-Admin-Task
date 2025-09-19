"use client";

import { useState, useMemo } from "react";
import { Avatar, Button } from "@/components";
import { User } from "@/types/user-interface";
import UserDetailsModal from "./UserDetailsModal";
import { Pagination } from "@/components/ui/pagination";
import { useTranslations } from "next-intl";
import { TriangleAlert } from "lucide-react";

type Props = {
  users: User[];
  onDelete: (id: number) => void;
  rowsPerPage?: number;
};

export default function UserListTable({ users, onDelete, rowsPerPage = 5 }: Props) {
  const t = useTranslations("UserManagement.table");
  const tEmpty = useTranslations("UserManagement.emptyState");
  const tActions = useTranslations("UserManagement.actions");
  const columns = t.raw("columns") as string[];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (userId: number) => onDelete(userId);
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Pagination
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = useMemo(
    () => users.slice(startIndex, startIndex + rowsPerPage),
    [users, startIndex, rowsPerPage],
  );

  return (
    <>
      <div className="relative flex min-h-[450px] flex-col">
        <div className="flex-grow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="[&>th]:text-subtle-foreground [&>th]:border-border-default [&>th]:border-b [&>th]:px-6 [&>th]:py-3 [&>th]:text-start [&>th]:tracking-wider [&>th]:uppercase">
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border-default divide-y">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id.toString()}
                    className="text-subtle-foreground hover:bg-subtle-foreground/7 hover:text-strong-foreground text-sm transition-colors duration-100 [&>td]:px-6 [&>td]:py-4 [&>td]:whitespace-nowrap"
                  >
                    <td>
                      <Avatar
                        color="accent-1"
                        size="small"
                        fallback={user.name.charAt(0)}
                      />
                    </td>
                    <td className="font-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.city}</td>
                    <td className="flex gap-2">
                      <Button
                        onClick={() => handleViewDetails(user)}
                        size="small"
                        className="min-w-18"
                      >
                        {tActions("details")}
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        color="danger"
                        variant="soft"
                        size="small"
                        className="min-w-18"
                      >
                        {tActions("delete")}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8">
                    <div className="flex h-32 flex-col items-center justify-center">
                      <TriangleAlert className="text-warning-foreground mb-2 h-12 w-12" />
                      <p className="text-lg font-medium">{tEmpty("noUsersFound")}</p>
                      <p className="text-subtle-foreground text-sm">
                        {tEmpty("startByAddingUser")}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-4 sm:mx-0">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={Math.min(startIndex + rowsPerPage, users.length)}
            totalItems={users.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <UserDetailsModal
        selectedUser={selectedUser}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
