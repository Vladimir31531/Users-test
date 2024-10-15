import { changeUserStatus } from "@/lib/actions/user.action";
import { IUser } from "@/types/users";

export const handleOnOffUser = async (
  user: IUser,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const updatedUser = { ...user, active: !user.active };

    const res = await changeUserStatus(updatedUser);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};
