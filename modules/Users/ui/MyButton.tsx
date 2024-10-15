import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { handleOnOffUser } from "../model/handlersMyTable";
import { IUser } from "@/types/users";

export default function MyButton({ row }: { row: IUser }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#aaaaaa" }}
      onClick={() => handleOnOffUser(row, setIsLoading)}
    >
      {isLoading && <CircularProgress sx={{ color: "#fff" }} size="20px" />}
      {row.active ? "Выключить" : "Включить"}
    </Button>
  );
}
