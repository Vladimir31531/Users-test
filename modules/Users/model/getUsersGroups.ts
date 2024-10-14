import { IUser } from "@/types/users";

export function getUserGroups(users: IUser[]): string[] {
  const arr: string[] = [];
  for (const user of users) {
    if (!arr.includes(user.group)) {
      arr.push(user.group);
    }
  }
  return arr;
}
