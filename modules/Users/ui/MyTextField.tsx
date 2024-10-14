"use client";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MyTextField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [searchString, setSearchString] = useState<string | null>(search);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchString) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: searchString,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchString]);

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
