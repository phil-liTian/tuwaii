import { ComputedRef, computed, nextTick, onMounted, ref, unref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { BasicTableProps } from '../types/table';
import { getViewportOffset } from '@/utils/domUtil';

export function useTableScroll(
	propsRef: ComputedRef<BasicTableProps>,
	{ wrapRef, tableElRef }
) {
	const tableHeightRef = ref(167);
	let paginationEl: Nullable<HTMLElement> = null;
	let tableWrapperPadding: number = 6;
	let bodyEl: Nullable<HTMLElement> = null;

	const debounceRedoHeight = useDebounceFn(redoHeight, 200);
	/**
	 * 计算表头的高度
	 * @param headerEl
	 * @returns
	 */
	const calcHeaderHeight = (headerEl: Element): number => {
		let headerHeight = 0;
		if (headerEl) {
			headerHeight = (headerEl as HTMLElement).offsetHeight;
		}
		return headerHeight;
	};

	/**
	 * 计算tableFooter高度
	 * @param tableEl
	 */
	// tableEl: Element
	const calcFooterHeight = (): number => {
		// const { pagination } = unref(propsRef);
		let footerHeight = 0;

		return footerHeight;
	};

	const calcPaginationHeight = (tableEl: Element): number => {
		const { pagination } = unref(propsRef);
		let paginationHeight = 0;

		if (pagination) {
			// 显示分页的时候 计算分页器的高度
			if (!paginationEl) {
				paginationEl = tableEl.querySelector('.ant-pagination') as HTMLElement;
			}
			const paginationElMarginTop = parseInt(
				getComputedStyle(paginationEl).marginTop
			);
			const paginationElMarginBottom = parseInt(
				getComputedStyle(paginationEl).marginBottom
			);

			const offsetHeight = paginationEl.offsetHeight;
			paginationHeight =
				offsetHeight + paginationElMarginTop + paginationElMarginBottom;
		}

		return paginationHeight;
	};

	const getMarginPaddingHeight = (): number => {
		return tableWrapperPadding + 16;
	};

	/**
	 * 从表头一直到body底部的高度
	 * @param tableEl
	 * @param headerEl
	 */
	// @ts-ignore
	const calcBottomAndPaddingHeight = (tableEl: Element, headerEl: Element) => {
		let bottomIncludeBody = 0;
		if (unref(wrapRef)) {
			const wrapHeight = unref(wrapRef)?.offsetHeight ?? 0;

			bottomIncludeBody = wrapHeight;
		}

		// 直接计算表头到body底部的高度（不包含自定义title的内容）
		bottomIncludeBody = getViewportOffset(headerEl).bottomIncludeBody;

		return bottomIncludeBody;
	};

	const calcTableHeight = async () => {
		const table = unref(tableElRef);
		if (!table) {
			return;
		}

		const tableEl: Element = table.$el;
		if (!tableEl) {
			return;
		}

		if (!bodyEl) {
			bodyEl = document.querySelector('.ant-table-body');
			if (!bodyEl) {
				return;
			}
		}

		await nextTick();
		const headerEl = tableEl.querySelector('.ant-table-thead');
		if (!headerEl) {
			return;
		}

		const bottomIncludeBody = calcBottomAndPaddingHeight(tableEl, headerEl);
		// 头部高度
		const headerHeight = calcHeaderHeight(headerEl);
		// footer统计的高度
		// const footerHeight = calcFooterHeight(tableEl)
		const paginationHeight = calcPaginationHeight(tableEl);
		// 表格的margin和padding高度
		const marginPaddingHeight = getMarginPaddingHeight();

		// 等式: 表格高度 = 表头到body底部的高度 - 表头高度 - 分页器高度 -
		let height = Math.floor(
			bottomIncludeBody -
				headerHeight -
				paginationHeight -
				marginPaddingHeight -
				1 -
				84
		);

		bodyEl.style.height = `${height}px`;
		setHeight(height);
	};

	function setHeight(height: number) {
		tableHeightRef.value = height;
	}

	function redoHeight() {
		nextTick(() => {
			calcTableHeight();
		});
	}

	const getScrollX = computed(() => {
		// let width = 0
	});

	const getScrollRef = computed(() => {
		const tableHeight = unref(tableHeightRef);

		return {
			x: unref(getScrollX),
			y: tableHeight
		};
	});

	// onMounted(() => calcTableHeight())
	// setTimeout(() => {
	//   calcTableHeight()
	// }, 2000);
	// nextTick(() => calcTableHeight())

	onMounted(() => {
		calcTableHeight();
		nextTick(() => debounceRedoHeight());
	});

	return {
		getScrollRef,
		calcFooterHeight
	};
}
