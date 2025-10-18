import { searchSliceActions } from "@/fer-framework/fe-component/reducers/SearchSlice";
import { Button, Flex, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  add?: React.ReactNode;
  multiDeleteAdd?: React.ReactNode;
}

function HeaderOperation({ add, multiDeleteAdd }: IProps) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(searchSliceActions.setGlobalSearchValue(e.target.value));
  };

  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <Flex gap={8} align="center" flex={1}>
        <Input.Search
          value={value}
          onChange={onChange}
          placeholder="Nội dung tìm kiếm"
          allowClear
        />
        {multiDeleteAdd && multiDeleteAdd}
      </Flex>
      <div style={{ flex: 2, paddingLeft: 8, textAlign: "right" }}>
        {add && add}
      </div>
    </Flex>
  );
}

export default HeaderOperation;
