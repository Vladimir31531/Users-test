"use server";

import { IUser } from "@/types/users";
import httpInstance from "../axios";
import { revalidatePath } from "next/cache";

export const getUsers = () => {
  return httpInstance
    .get(`/users`)
    .then(function (response) {
      // handle success
      if (response.data) {
        return response.data;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export const changeUserStatus = async (user: IUser) => {
  try {
    // Обновляем пользователя
    await httpInstance.put(`/users/${user.id}`, user);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
