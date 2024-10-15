"use client";

import { IUser } from "@/types/users";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Theme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Status from "./Status";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import useFilters from "../model/useFilters";
import { changeUserStatus } from "@/lib/actions/user.action";

const tableTitles = ["Имя", "Login", "Группа", "Статус", "Действия"];



const TableCellHeadStyles = (theme: Theme) => ({
  fontWeight: "bold",
  [theme.breakpoints.down(690)]: {
    padding: "5px 10px",
  },
});
const TableCellStyles = (theme: Theme) => ({
  [theme.breakpoints.down(690)]: {
    padding: "5px 10px",
  },
});

export default function MyTable({ users }: { users: IUser[] }) {
  const search = useSearchParams();
  const searchQuery = search.get("search");

  const [FUsers, setFUsers] = useState<{ loading: boolean; data: IUser[] }>({
    loading: true,
    data: [],
  });

  useEffect(() => {
    setFUsers({ ...FUsers, loading: true });
    const filterParams = qs.parse(search.toString());
    delete filterParams.search;

    const { filteredUsers } = useFilters({ users, searchQuery, filterParams });

    setFUsers({ loading: false, data: filteredUsers });
  }, [search, users]);

  const handleOnOffUser = async (user: IUser) => {
    try {
      const updatedUser = { ...user, active: !user.active };

      const res = await changeUserStatus(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableTitles.map((title, i) => {
              return (
                <TableCell
                  key={title}
                  sx={TableCellHeadStyles}
                  align={i === 0 ? undefined : "right"}
                >
                  {title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!FUsers.loading ? (
            FUsers.data.length > 0 ? (
              FUsers.data.map((row: IUser) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={TableCellStyles} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell sx={TableCellStyles} align="right">
                    {row.login}
                  </TableCell>
                  <TableCell sx={TableCellStyles} align="right">
                    {row.group}
                  </TableCell>
                  <TableCell sx={TableCellStyles} align="right">
                    <Status isActive={row.active} />
                  </TableCell>
                  <TableCell sx={TableCellStyles} align="right">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#aaaaaa" }}
                      onClick={() => handleOnOffUser(row)}
                    >
                      {row.active ? "Выключить" : "Включить"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Ничего нет</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <CircularProgress color="primary" />
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
