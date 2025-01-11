import { computed, ComputedRef, unref } from 'vue';
import { BasicColumn, BasicTableProps } from '../types/table';
import { cloneDeep } from 'lodash';
import { ACTION_COLUMN_FLAG, INDEX_COLUMN_FLAG } from '../const';
function handleIndexColumn(propsRef: BasicTableProps, columns: BasicColumn[]) {
	const { showIndexColumn } = propsRef;
	const indIndex = columns.findIndex((v) => v.flag === INDEX_COLUMN_FLAG);

	if (indIndex !== -1 && !showIndexColumn) {
		columns.splice(indIndex, 1);
	}

	if (indIndex === -1 && propsRef.showIndexColumn) {
		columns.unshift({
			title: '序号',
			dataIndex: 'index',
			width: 80,
			flag: INDEX_COLUMN_FLAG,
			customRender: ({ index }) => index + 1
		});
	}
}

function handleActionColumn(propsRef, columns) {
	const { actionColumn } = propsRef;
	if (!actionColumn) {
		return;
	}

	const hasAction = columns.findIndex((v) => v.flag === ACTION_COLUMN_FLAG);
	if (hasAction === -1) {
		columns.push({
			fixed: 'right',
			...actionColumn,
			flag: ACTION_COLUMN_FLAG
		});
	}
}

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
	const { columns: columnsRef } = unref(propsRef);
	const getColumns = () => {
		const columns = unref(getColumnsRef);

		return columns;
	};

	const getColumnsRef = computed(() => {
		const columns = cloneDeep(unref(columnsRef));
		if (!columns) {
			return [];
		}

		handleIndexColumn(unref(propsRef), columns);

		handleActionColumn(unref(propsRef), columns);

		return columns;
	});

	const getViewColumns = computed(() => {
		const viewColumns = unref(getColumnsRef);

		return viewColumns;
	});

	return { getViewColumns, getColumns };
}
