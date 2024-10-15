import { changeUserStatus } from "@/lib/actions/user.action";
import { IUser } from "@/types/users";

export const handleOnOffUser = async (user: IUser) => {
  try {
    const updatedUser = { ...user, active: !user.active };

    const res = await changeUserStatus(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
