import React from "react";
import Status from "./Status";

export default function UsersUI({
  MyTextField,
  MySelect,
  children,
}: {
  MyTextField: React.ReactNode;
  MySelect: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-10">
        {MyTextField}
        {MySelect}
      </div>

      <div className="">{children}</div>
    </div>
  );
}
