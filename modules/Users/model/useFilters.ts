import { IUser } from "@/types/users";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import qs from "query-string";

function filterUsers(
  users: IUser[],
  filterParams?: { [key: string]: string | (string | null)[] | null }
): IUser[] {
  if (!filterParams) {
    return users;
  }

  return users.filter((user) => {
    return Object.keys(filterParams).every((key) => {
      return user[key as keyof IUser] === filterParams[key];
    });
  });
}

function searchUsers(users: IUser[], search: string | null): IUser[] {
  if (!search) return users;

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.login.toLowerCase().includes(search.toLowerCase())
  );
}

export default function useFilters(users: IUser[]): {
  loading: boolean;
  data: IUser[];
} {
  const search = useSearchParams();
  const searchQuery = search.get("search");

  const [FUsers, setFUsers] = useState<{ loading: boolean; data: IUser[] }>({
    loading: true,
    data: [],
  });

  useEffect(() => {
    setFUsers({ ...FUsers, loading: true });
    const filterParams = qs.parse(search.toString());
    delete filterParams.search;

    const filteredUsers = filterUsers(
      searchUsers(users, searchQuery),
      filterParams
    );

    setFUsers({ loading: false, data: filteredUsers });
  }, [search, users]);

  return FUsers;
}
