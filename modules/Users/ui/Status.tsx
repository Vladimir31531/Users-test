import { Box } from "@mui/material";
import React from "react";

const activeStyles = {
  backgroundColor: "green",
};

export default function Status({ isActive }: { isActive: boolean }) {
  return (
    <Box
      component="section"
      sx={{
        padding: "10px",
        width: "fit-content",
        float: "right",
        borderRadius: "5px",
        backgroundColor: "red",
        color: "white",
        ...(isActive ? activeStyles : {}),
      }}
    >
      {isActive ? "Активен" : "Не активен"}
    </Box>
  );
}
