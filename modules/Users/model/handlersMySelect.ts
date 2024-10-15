import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { SelectChangeEvent } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const handleChangeFilter = (
  event: SelectChangeEvent,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) => {
  const newUrl = formUrlQuery({
    params: searchParams.toString(),
    key: "group",
    value: event.target.value as string,
  });

  router.push(newUrl, { scroll: false });
};
export const handleResetFilter = (
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) => {
  const newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove: ["group"],
  });

  router.push(newUrl, { scroll: false });
};
