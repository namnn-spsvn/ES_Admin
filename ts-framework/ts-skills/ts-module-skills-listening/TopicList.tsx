import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useGetFlashCardQuery } from '@/ts-framework/ts-module-flashcard/apis';

interface DataType {
    key: string;
    name: string;
    count: number;
    progress: number
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Tên chủ đề',
        dataIndex: 'meaning_vi',
        key: 'meaning_vi',
    },
    {
        title: 'Số lượng câu hỏi',
        dataIndex: 'count',
        key: 'count',
    },

    {
        title: 'Tiến độ',
        dataIndex: 'progress',
        key: 'progress',

    },
];



// const data: DataType[] = [
//     {
//         key: '1',
//         name: 'Cây cối xung quanh',
//         count: 32,
//         progress: 80
//     },
//     {
//         key: '2',
//         name: 'Cây cối xung quanh',
//         count: 32,
//         progress: 80
//     },
//     {
//         key: '3',
//         name: 'Cây cối xung quanh',
//         count: 32,
//         progress: 80
//     },
// ];

const TopicList: React.FC = () => {

    const { data } = useGetFlashCardQuery(null)

    const handleRowClick = (record: DataType) => {
        console.log("Bạn vừa click vào:", record);
        alert(`Bạn chọn chủ đề: ${record.name}`);
    };
    return (
        <div>
            Chủ đề
            <Table<DataType>
                columns={columns}
                dataSource={data?.items}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                pagination={
                    {
                        current: 1,
                        pageSize: 5,
                    }
                }
                rowClassName="cursor-pointer"
            />
        </div>

    )

};

export default TopicList;