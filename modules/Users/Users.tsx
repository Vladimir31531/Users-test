import { getUsers } from "@/lib/actions/user.action";
import MySelect from "./ui/MySelect";
import MyTextField from "./ui/MyTextField";
import MyTable from "./ui/MyTable";
import UsersUI from "./ui/UsersUI";
import { getUserGroups } from "./model/getUsersGroups";
import { Suspense } from "react";

export async function Users() {
  const users = await getUsers();
  const groups = getUserGroups(users);

  return (
    <Suspense>
      <UsersUI
        MyTextField={<MyTextField />}
        MySelect={<MySelect items={groups} />}
      >
        <MyTable users={users} />
      </UsersUI>
    </Suspense>
  );
}
