import { computed, ComputedRef, onMounted, ref, unref } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { isArray, isBoolean, isFunction } from '@u/is';
import { BasicTableProps, FetchParams } from '../types/table';

export function useDataSource(
	propsRef: ComputedRef<BasicTableProps>,
	options,
	emit: EmitType
) {
	const { setLoading, setPagination, getPaginationInfo, getFormValues } =
		options;
	const dataSourceRef = ref<Recordable[]>([]);

	const fetch = async (opt?: FetchParams) => {
		const { api, showSearchForm, afterFetch, beforeFetch } = unref(propsRef);
		if (!api || !isFunction(api)) {
			return;
		}
		try {
			setLoading(true);
			// TODO: 处理参数
			let pageParams: Recordable = {};
			if (!isBoolean(unref(getPaginationInfo))) {
				const { pageSize, current = 1 } = unref(getPaginationInfo);
				pageParams['page'] = current;
				pageParams['size'] = pageSize;
			}

			let params = {
				...pageParams, // 分页器中的参数
				...(showSearchForm ? await getFormValues() : {}), // form表单中的参数
				...(opt ? opt.searchInfo : {})
			};

			if (beforeFetch && isFunction(beforeFetch)) {
				params = (await beforeFetch(params)) || params;
			}

			const res = await api(params);

			let resuleItems = res.result;

			if (afterFetch && isFunction(afterFetch)) {
				resuleItems = await afterFetch(resuleItems);
			}

			const isArrayResult = isArray(resuleItems);

			const resultTotal = isArrayResult && res?.page?.total;

			setPagination({
				total: resultTotal || 0,
				current: getPaginationInfo.current
			});

			dataSourceRef.value = res.result;
			// 处理分页
			setLoading(false);

			emit('fetch-success', {
				data: res.result,
				page: unref(getPaginationInfo)
			});
		} catch (error) {
			emit('fetch-error', error);

			setPagination({ total: 0 });
		}
	};

	const handleTableChange = (pageInfo) => {
		setPagination(pageInfo);

		fetch();
	};

	const reload = async (opt) => {
		await fetch(opt);
	};

	const getDataSourceRef = computed(
		() => propsRef.value.dataSource || dataSourceRef.value
	);

	function getDataSource() {
		return getDataSourceRef.value;
	}

	onMounted(() => useTimeoutFn(fetch, 300));

	return {
		fetch,
		reload,
		getDataSourceRef,
		handleTableChange,
		getDataSource
	};
}
