<template>
	<div ref="wrapRef" :class="prefixCls">
		<!-- <bk-form
			@register="register"
			v-if="showSearchForm"
			v-bind="getFormProps"
			@submit="handleSearchInfoChange"
		/> -->
		<Table @change="handleTableChange" ref="tableElRef" v-bind="getBindValues">
			<template v-for="item in Object.keys($slots)" :key="item" #[item]="data">
				<slot :name="item" v-bind="data || {}"></slot>
			</template>
		</Table>
	</div>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { computed, onMounted, ref, unref, useSlots } from 'vue';
import { basicProps } from './props';
import { useColumns } from '../hooks/useColumns';
import { useTableHeader } from '../hooks/useTableHeader';
import { usePagination } from '../hooks/usePagination';
import { useDataSource } from '../hooks/useDataSource';
import { useTableScroll } from '../hooks/useTableScroll';
// import { useTableForm } from '../hooks/useTableForm';
import { useLoading } from '../hooks/useLoading';
import { TableActionTypes } from '../types/table';
import { createTableContext } from '../hooks/useTableContext';
import { useTableFooter } from '../hooks/useTableFooter';
import { useDesign } from '@h/web/useDesign';

defineOptions({ name: 'tw-table' });
const props = defineProps(basicProps);

const emits = defineEmits([
	'register',
	'add',
	'fetch-error',
	'fetch-success',
	'submit',
	'upload-success'
]);
const tableElRef = ref();
const wrapRef = ref();
const slots = useSlots();
// const [register, { getFormValues }] = useForm();
const { prefixCls } = useDesign('table');

const getProps = computed(() => ({ ...props }));
const { getHeaderProps } = useTableHeader(slots, getProps, emits, {
	// getFormValues
});
const { getViewColumns, getColumns } = useColumns(getProps);
const { getPaginationInfo, setPagination } = usePagination(getProps);
const { loadingRef, setLoading } = useLoading();
const { getDataSourceRef, handleTableChange, fetch, reload, getDataSource } =
	useDataSource(
		getProps,
		{
			setLoading,
			setPagination,
			getPaginationInfo
			// getFormValues
		},
		emits
	);
const { getScrollRef } = useTableScroll(getProps, { wrapRef, tableElRef });
// const { getSummaryProps } = useTableSummary(getProps);
// const { getFormProps, handleSearchInfoChange } = useTableForm(getProps, fetch);
const { getFooterProps } = useTableFooter(getProps, getScrollRef);

const getBindValues = computed(() => {
	const propsData = {
		bordered: true,
		loading: unref(loadingRef),
		...unref(getProps),
		...unref(getHeaderProps),
		// ...unref(getSummaryProps),
		footer: unref(getFooterProps),
		scroll: unref(getScrollRef),
		columns: unref(getViewColumns),
		dataSource: unref(getDataSourceRef),
		pagination: unref(getPaginationInfo)
	};
	return propsData as any;
});

const tableAction: TableActionTypes = {
	fetch,
	reload,
	getColumns,
	getDataSource
};

createTableContext({ ...tableAction });

onMounted(() => {
	emits('register', tableAction);
});
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-table';

.@{prefix-cls} {
	height: 100%;
	padding: 10px;
	.ant-table {
		.ant-table-title {
			border: none !important;
			padding-left: 0;
		}

		.ant-table-container {
			border-radius: 8px !important;
			border-left: none !important;
		}

		.ant-table-content {
			table {
				border-radius: 8px !important;
				overflow: hidden;
				border: none !important;
			}
		}

		.ant-table-thead {
			> tr > th {
				background-color: #f6f6f6;
				padding: 8px 16px;
				color: #a49693;
				font-weight: normal;
			}
		}
	}

	.ant-table-tbody {
		@border: 1px solid #d8d8d8 !important;
		> tr {
			&.ant-table-measure-row {
				td {
					border-bottom: none !important;
				}
			}

			> td {
				border-inline-end: transparent !important;
				border-bottom: @border;
				&:first-child {
					border-left: @border;
				}
				&:last-child {
					border-right: @border;
				}
			}

			&:last-child {
				> td {
					&:first-child {
						border-radius: 0 0 0 8px;
					}

					&:last-child {
						border-radius: 0 0 8px 0;
					}
				}
			}
		}
	}

	.ant-table-footer {
		padding: 0;
		border: transparent !important;
	}
}

.ant-pagination {
	.ant-pagination-total-text {
		position: absolute;
		left: 0;
		color: #000;
		font-size: 14px;
	}

	.ant-pagination-item {
		border-radius: 0;
		width: 24px;
		height: 24px;
		margin-right: 16px !important;
	}

	.page-block {
		width: inherit;
		height: inherit;
		border: 1px solid #979797;
		font-size: 14px;
	}

	.ant-pagination-item-active {
		background: linear-gradient(270deg, #dc9f73 0%, #e9c5a2 100%);
		border: 1px solid transparent !important;
		font-weight: 400;

		.page-block {
			border: none;
		}
	}
}
</style>
