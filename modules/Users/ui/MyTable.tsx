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
} from "@mui/material";
import React from "react";
import Status from "./Status";
import useFilters from "../model/useFilters";
import { handleOnOffUser } from "../model/handlersMyTable";
import { tableTitles } from "../constants";
import { TableCellHeadStyles, TableCellStyles } from "../Mui_styles";

export default function MyTable({ users }: { users: IUser[] }) {
  const { loading, data } = useFilters(users);

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
          {!loading ? (
            data.length > 0 ? (
              data.map((row: IUser) => (
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
