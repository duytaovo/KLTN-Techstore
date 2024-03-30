import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const BasicTabs = ({
  children1,
  children2,
  tabDefault,
}: {
  tabDefault: string;
  children1: any;
  children2: any;
}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Chi tiết sản phẩm",
      children: <>{children1}</>,
    },
    {
      key: "2",
      label: "Thông số kỹ thuật",
      children: <>{children2}</>,
    },
  ];

  const onChange = (key: string) => {};
  return (
    <Tabs defaultActiveKey={tabDefault} items={items} onChange={onChange} />
  );
};

export default BasicTabs;

