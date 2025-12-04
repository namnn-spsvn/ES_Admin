"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Menu } from "antd";
import { items } from "@/app/menu";
import { useTheme } from "@/fer-framework/fe-global/themes";
import { useCollapsed } from "../GlobalLayoutBase/CollapsedProvider";
import { useRouter, usePathname } from "next/navigation";
import { MenuProps } from "antd/lib";
import { useTranslation } from "react-i18next";

function MenuBase() {
  const { mode } = useTheme();
  const { collapsed } = useCollapsed();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Map lại menu có label được dịch
  const translatedItems = useMemo(() => {
    return items.map((item: any) => ({
      ...item,
      label: t(item.label),
      children: item.children
        ? item.children.map((child: any) => ({
            ...child,
            label: t(child.label),
          }))
        : undefined,
    }));
  }, [t]);

  // Xử lý chọn menu theo pathname
  useEffect(() => {
    const findBestMatchingKey = (path: string, menuItems: any) => {
      let bestMatch = { key: null, length: -1 };

      const search = (items: any) => {
        for (const item of items) {
          if (item.link && path.startsWith(item.link)) {
            if (item.link.length > bestMatch.length) {
              bestMatch = { key: item.key, length: item.link.length };
            }
          }
          if (item.children) search(item.children);
        }
      };

      search(menuItems);
      return bestMatch.key;
    };

    const currentKey = findBestMatchingKey(pathname, items);
    if (currentKey) setSelectedKeys([currentKey]);
  }, [pathname]);

  // Khi click menu
  const handleClick = (e: any) => {
    const findLink = (key: string, items: any[]): string | undefined => {
      for (const item of items) {
        if (item.key === key) return item.link;
        if (item.children) {
          const result = findLink(key, item.children);
          if (result) return result;
        }
      }
      return undefined;
    };

    const link = findLink(e.key, items);
    if (link) router.push(link);
  };

  return (
    <Menu
      style={{ height: "100%", fontSize: "16px" }}
      mode="inline"
      theme={mode === "dark" ? "dark" : "light"}
      items={translatedItems as MenuProps["items"]}
      inlineCollapsed={collapsed}
      selectedKeys={selectedKeys}
      onClick={handleClick}
    />
  );
}

export default MenuBase;
