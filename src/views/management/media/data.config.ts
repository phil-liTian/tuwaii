import { TableColumnProps } from 'ant-design-vue';

export const MediaColumns: TableColumnProps[] = [
	{
		title: '类型',
		dataIndex: 'type',
		key: 'type'
	},
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '封面',
		dataIndex: 'cover',
		key: 'cover'
	}
];
