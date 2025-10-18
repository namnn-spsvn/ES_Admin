import { Empty, Flex, Input, Table, TableProps } from "antd";
import React, { useState } from "react";
import ACard from "../ACard";

function ATable(props: TableProps) {
  return (
    <Table
      locale={{ emptyText: <Empty>Không có dữ liệu</Empty> }}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 390px)",
      }}
      {...props}
    />
  );
}

export default ATable;
