import { IUser } from "@/types/users";

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

export default function useFilters({
  users,
  searchQuery,
  filterParams,
}: {
  users: IUser[];
  searchQuery: string | null;
  filterParams: { [key: string]: string | (string | null)[] | null };
}): { filteredUsers: IUser[] } {
  const filteredUsers = filterUsers(
    searchUsers(users, searchQuery),
    filterParams
  );

  return { filteredUsers };
}
