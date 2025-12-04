import { useState, useCallback, useMemo, useEffect } from "react";
import { TablePaginationConfig } from "antd/lib/table/interface";
import { ColumnType } from "antd/lib/table";
import {
  TypedUseQuery,
  TypedUseQueryHookResult,
} from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { searchSliceSelectors } from "@/fer-framework/fe-component/reducers/SearchSlice";
import { skip } from "node:test";
import { useTranslation } from "react-i18next";

// 2. Định nghĩa tham số và kiểu trả về của hook
interface UseAntdTableProps<T> {
  // Hàm fetch data, nhận vào pagination và trả về Promise<dữ liệu>
  useHookApi: any;
  paramsApi: any;
  config?: any;
}

interface UseAntdTableResult<T> {
  dataSource: T[];
  pagination: TablePaginationConfig;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  refresh: () => void;
  isLoading: boolean;
}

export const useHookTable = <T extends UseAntdTableProps<T>>({
  useHookApi,
  config,
  paramsApi,
}: UseAntdTableProps<T>): UseAntdTableResult<T> => {
  const { t } = useTranslation();

  const valueSearch = useSelector((state: any) =>
    searchSliceSelectors.getGlobalSearchValue(state)
  );
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);

  const { data, refetch, isLoading } = useHookApi(paramsApi);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setDataSource(data?.items || data);
    setTotal(data?.total || 0);
  }, [data]);

  const handleTableChange = useCallback(
    (newPagination: TablePaginationConfig) => {
      if (newPagination.pageSize !== pageSize) {
        setPageSize(newPagination.pageSize!);

        setCurrentPage(1);
      } else if (newPagination.current !== currentPage) {
        setCurrentPage(newPagination.current!);
      }
    },
    [currentPage, pageSize]
  );

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      current: currentPage,
      pageSize: pageSize,
      total: total,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      locale: { items_per_page: ` / ${"Trang"}` },
      onChange: (page, size) =>
        handleTableChange({ current: page, pageSize: size }),
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} / ${total} dữ liệu `,
    }),
    [currentPage, pageSize, total, handleTableChange, t]
  );

  useEffect(() => {
    if (!data) return;

    const items = data.items || [];

    if (valueSearch && valueSearch.trim() !== "") {
      const searchValue = valueSearch.toLowerCase();

      const filtered = items.filter((item: any) =>
        (config || ["name"]).some((key: any) => {
          const fieldValue = item?.[key];
          return (
            typeof fieldValue === "string" &&
            fieldValue.toLowerCase().includes(searchValue)
          );
        })
      );

      setDataSource(filtered);
      setTotal(filtered.length);
      setCurrentPage(1);
    } else {
      setDataSource(items);
      setTotal(data.total || items.length);
    }
  }, [valueSearch, data]);

  return {
    dataSource: dataSource,
    pagination: paginationConfig,
    selectedRowKeys,
    setSelectedRowKeys,
    refresh: refetch,
    isLoading,
  };
};
