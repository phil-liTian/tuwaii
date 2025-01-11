import { TableColumnType } from 'ant-design-vue';

export const ContentColumns: TableColumnType[] = [
	{ title: '标题', dataIndex: 'title', key: 'title' },
	{ title: '内容', dataIndex: 'content', key: 'content' },
	{ title: '类型', dataIndex: 'type', key: 'type' }
];
