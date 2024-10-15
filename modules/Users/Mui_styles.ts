import { Theme } from "@mui/material";

export const TableCellHeadStyles = (theme: Theme) => ({
  fontWeight: "bold",
  [theme.breakpoints.down(690)]: {
    padding: "5px 10px",
  },
});
export const TableCellStyles = (theme: Theme) => ({
  [theme.breakpoints.down(690)]: {
    padding: "5px 10px",
  },
});
