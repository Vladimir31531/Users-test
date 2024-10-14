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
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Status from "./Status";
import { usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import useFilters from "../model/useFilters";
import { changeUserStatus } from "@/lib/actions/user.action";
import axios from "axios";

const tableTitles = ["Имя", "Login", "Группа", "Статус", "Действия"];

export default function MyTable({ users }: { users: IUser[] }) {
  const search = useSearchParams();
  const searchQuery = search.get("search");

  const [FUsers, setFUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const filterParams = qs.parse(search.toString());
    delete filterParams.search;

    const { filteredUsers } = useFilters({ users, searchQuery, filterParams });

    setFUsers(filteredUsers);
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
                  sx={{ fontWeight: "bold" }}
                  align={i === 0 ? undefined : "right"}
                >
                  {title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Добавить условие когда нет юзеров и добавить элемент "Не найдено" */}
          {FUsers.length > 0 ? (
            FUsers.map((row: IUser) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.login}</TableCell>
                <TableCell align="right">{row.group}</TableCell>
                <TableCell align="right">
                  <Status isActive={row.active} />
                </TableCell>
                <TableCell align="right">
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
            <TableRow sx={{}}>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Ничего нет</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
