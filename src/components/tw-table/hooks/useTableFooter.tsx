import { computed, ComputedRef, h, unref } from 'vue';
import TableFooter from '../components/TableFooter.vue';
import { BasicTableProps } from '../types/table';
export function useTableFooter(
	propsRef: ComputedRef<BasicTableProps>,
	scrollRef
) {
	const getFooterProps = computed(() => {
		const { showSummary, summaryData } = unref(propsRef);

		return showSummary
			? () => h(TableFooter, { scroll: unref(scrollRef), summaryData })
			: undefined;
	});

	return { getFooterProps };
}
