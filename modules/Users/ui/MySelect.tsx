"use client";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import {
  handleChangeFilter,
  handleResetFilter,
} from "../model/handlersMySelect";

export default function MySelect({ items }: { items: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const group: string | null = searchParams.get("group");

  return (
    <FormControl sx={{ width: "35%", marginLeft: "5%" }}>
      <InputLabel id="demo-simple-select-label">Группа</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={group ?? ""}
        label="Группа"
        onChange={(event) => handleChangeFilter(event, searchParams, router)}
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
        <button
          className="w-fit underline"
          onClick={() => handleResetFilter(searchParams, router)}
        >
          Очистить фильтр
        </button>
      )}
    </FormControl>
  );
}
