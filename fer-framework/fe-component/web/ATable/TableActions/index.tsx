import { Button, Dropdown, Space, Tooltip } from "antd";
import React from "react";

interface IProps {
  record: any;
  actions: any;
}

interface IAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  action: (record: any) => void;
}

function TableActions(props: IProps) {
  const { record, actions } = props;

  return (
    <Space size="small">
      {actions.map((item: IAction) => {
        return (
          <Tooltip title={item.label} key={item.key}>
            <Button
              type="link"
              icon={item.icon}
              onClick={() => {
                item.action(record);
              }}
            />
          </Tooltip>
        );
      })}
    </Space>
  );
}

export default TableActions;
