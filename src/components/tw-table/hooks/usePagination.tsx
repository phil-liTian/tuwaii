import { computed, ComputedRef, ref, unref } from 'vue';
import { isBoolean } from '@u/is';
import { BasicTableProps } from '../types/table';
import { PaginationProps } from '../types/pagination';
import { PAGE_SIZE } from '../const';

function itemRender({ page, type, originalElement }) {
	if (type === 'page') {
		return <div class="page-block">{page}</div>;
	}

	if (type === 'prev') {
		return page === 0 ? null : originalElement;
	} else if (type === 'next') {
		return page === 1 ? null : originalElement;
	}

	return originalElement;
}

export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
	let _pageInfoConfig = ref<PaginationProps>({});

	const getPaginationInfo = computed((): PaginationProps | boolean => {
		const { pagination } = unref(propsRef);
		if (isBoolean(pagination) && !pagination) {
			return false;
		}

		return {
			current: 1,
			size: 'small',
			total: 100,
			pageSize: PAGE_SIZE,
			showQuickJumper: false,
			showSizeChanger: false,
			itemRender,
			showTotal: (total: number) => `共 ${total} 项数据`,
			...unref(_pageInfoConfig)
		};
	});

	const setPagination = (pageInfo: PaginationProps) => {
		_pageInfoConfig.value = pageInfo;
	};

	return { getPaginationInfo, setPagination };
}
