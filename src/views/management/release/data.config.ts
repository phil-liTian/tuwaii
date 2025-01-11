import { TableColumnProps } from 'ant-design-vue';

export const ReleaseColumns: TableColumnProps[] = [
	{ title: '标题', dataIndex: 'title', key: 'title' },
	{ title: '类型', dataIndex: 'type', key: 'type' },
	{ title: '发布时间', dataIndex: 'createTime', key: 'createTime' }
];
