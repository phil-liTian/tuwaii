<template>
	<Table
		:class="prefixCls"
		v-bind="$attrs"
		:showHeader="false"
		:bordered="false"
		:pagination="false"
		:columns="getColumns"
		:dataSource="getDataSource"
		tableLayout="fixed"
	></Table>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { computed, PropType, toRaw, unref } from 'vue';
import { useTableContext } from '../hooks/useTableContext';
import { propTypes } from '@/utils';
import { cloneDeep } from 'lodash';
import { BasicColumn } from '../types/table';
import { useDesign } from '@h/web/useDesign';
const props = defineProps({
	rowKey: propTypes.string.def('dataIndex'),
	summaryData: {
		type: Array as PropType<Recordable[]>,
		default: () => []
	}
});
const { prefixCls } = useDesign('table-footer');
const table = useTableContext();

const getDataSource = computed((): Recordable[] => {
	if (props.summaryData?.length) {
		props.summaryData.forEach((item) => {
			item[props.rowKey] = item.value;
		});
		return props.summaryData;
	}
	// if (!isFunction(props.summaryFunc)) {
	// 	return []
	// }
	let dataSource = toRaw(unref(table.getDataSource()));

	return dataSource;
});

const getColumns = computed(() => {
	const columns: BasicColumn[] = cloneDeep(table.getColumns());

	columns.map((column) => {
		Reflect.deleteProperty(column, 'customRender');
		Reflect.deleteProperty(column, 'fixed');
	});
	console.log('columns', columns);

	return columns;
});
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-table-footer';

.@{prefix-cls} {
	.ant-table-tbody {
		background-color: #f6f6f6;
		.ant-table-cell {
			padding: 10px 16px;
		}
	}
}
</style>
