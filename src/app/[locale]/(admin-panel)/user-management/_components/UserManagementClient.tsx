"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useUserStore } from "@/stores/user-stores";
import UserListFilters from "./UserListFilters";
import UserListTable from "./UserListTable";
import AddUserForm from "./AddUserForm";
import { Button, Loading } from "@/components";
import { RefreshCcw, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUsers } from "../_queries/use-users";

export default function UserManagementClient() {
  const t = useTranslations("UserManagement");
  const { data: apiUsers = [], isLoading, isError, refetch } = useUsers();
  const {
    localUsers,
    deletedApiUserIds,
    addUser,
    deleteUser,
    isUserDeleted,
    isHydrated,
  } = useUserStore();

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const handleDeleteUser = useCallback(
    (id: number) => {
      const userIsFromApi = apiUsers.some((user) => user.id === id);
      deleteUser(id, userIsFromApi);
    },
    [apiUsers, deleteUser],
  );

  const combinedUsers = useMemo(() => {
    if (!isHydrated) return [];
    const filteredApiUsers = apiUsers.filter((user) => !isUserDeleted(user.id));
    return [...localUsers, ...filteredApiUsers];
  }, [localUsers, apiUsers, isUserDeleted, deletedApiUserIds, isHydrated]);

  const filteredUsers = useMemo(() => {
    if (!search && !cityFilter) return combinedUsers;

    if (search) {
      return combinedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (cityFilter) {
      return combinedUsers.filter(
        (user) => user.address.city.toLowerCase() === cityFilter.toLowerCase(),
      );
    }

    return combinedUsers;
  }, [combinedUsers, search, cityFilter]);

  const uniqueCities = useMemo(() => {
    if (isError || isLoading || !isHydrated) {
      return [];
    }
    const cities = combinedUsers.map((user) => user.address.city);
    return [...new Set(cities)].sort();
  }, [combinedUsers, isError, isLoading, isHydrated]);

  useEffect(() => {
    if ((isError || isLoading || !isHydrated) && cityFilter) {
      setCityFilter("");
    }
  }, [isError, isLoading, isHydrated, cityFilter]);

  useEffect(() => {
    if (cityFilter && uniqueCities.length > 0 && !uniqueCities.includes(cityFilter)) {
      setCityFilter("");
    }
  }, [cityFilter, uniqueCities]);

  return (
    <div className="flex h-full flex-col gap-4 p-4 sm:p-8">
      <section className="bg-surface-background w-full rounded-lg p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">{t("addNewUser")}</h2>
        <AddUserForm onAdd={addUser} />
      </section>

      <section className="bg-surface-background flex w-full flex-1 flex-col gap-4 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold">{t("userList")}</h2>

        <UserListFilters
          searchTerm={search}
          onSearchChange={setSearch}
          selectedCity={cityFilter}
          onCityChange={setCityFilter}
          cityOptions={uniqueCities}
        />

        {isLoading || !isHydrated ? (
          <div className="flex h-[450px] items-center justify-center">
            <Loading size="large" color="primary" variant="spinner" />
          </div>
        ) : isError ? (
          <div className="bg-danger/5 flex h-[450px] flex-col items-center justify-center gap-4 rounded-lg p-6">
            <TriangleAlert className="text-danger mb-2 h-12 w-12" />
            <div className="text-danger text-center font-medium">
              {t("errors.fetchFailed")}
            </div>
            <p className="text-subtle-foreground text-center text-sm">
              {t("errors.reconnectMessage")}
            </p>
            <Button
              onClick={() => refetch()}
              className="mt-2"
              variant="soft"
              color="primary"
              size="normal"
              radius="medium"
            >
              <RefreshCcw size={14} /> {t("actions.retry")}
            </Button>
          </div>
        ) : (
          <UserListTable users={filteredUsers} onDelete={handleDeleteUser} />
        )}
      </section>
    </div>
  );
}
