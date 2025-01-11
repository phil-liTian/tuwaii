import { ref, unref } from 'vue';
import { TableActionTypes } from '../types/table';

export type UseTableReturnType = [
	register: (instance: TableActionTypes) => void,
	methods: TableActionTypes
];

export function useTable(): UseTableReturnType {
	const tableRef = ref<Nullable<TableActionTypes>>(null);
	function getTable(): TableActionTypes {
		const table = unref(tableRef);

		if (!table) {
			console.warn('Please execute the table exist first');
		}

		return table as TableActionTypes;
	}

	function register(instance: TableActionTypes) {
		tableRef.value = instance;
	}

	// @ts-ignore
	const methods: TableActionTypes = {
		fetch: async () => {
			const table = await getTable();
			table.fetch();
		},

		reload: async () => {
			const table = await getTable();
			table.reload();
		}
	};

	return [register, methods];
}
