"use client";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useDebounceTextField from "../model/useDebounceTextField";

export default function MyTextField() {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState<string | null>(searchParams.get("search"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  useDebounceTextField(searchString ?? "", searchParams)

  return (
    <TextField
      id="outlined-basic"
      sx={{
        width: "60%",
      }}
      label="Поиск"
      onChange={handleChange}
      type="search"
      value={searchString ?? ""}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}
