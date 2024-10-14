"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function MySelect({ items }: { items: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const group: string | null = searchParams.get("group");

  const handleChange = (event: SelectChangeEvent) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "group",
      value: event.target.value as string,
    });

    router.push(newUrl, { scroll: false });
  };
  const handleResetFilter = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["group"],
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <FormControl sx={{ width: "35%", marginLeft: "5%" }}>
      <InputLabel id="demo-simple-select-label">Группа</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={group ?? ""}
        label="Группа"
        onChange={handleChange}
      >
        {items.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      {group && (
        <button className="w-fit underline" onClick={handleResetFilter}>
          Очистить фильтр
        </button>
      )}
    </FormControl>
  );
}
