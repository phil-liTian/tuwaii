import { computed, ComputedRef, h, Slots, unref } from 'vue';
import TableHeader from '../components/TableHeader.vue';
import { getSlot } from '@u/index';
import { useMessage } from '@h/web/useMessage';
import { BasicTableProps } from '../types/table';
import { isFunction } from 'lodash';

export function useTableHeader(
	slots: Slots,
	propsRef: ComputedRef<BasicTableProps>,
	emits: EmitType,
	options: {
		getFormValues?: () => Recordable;
	}
) {
	const { title, canAdd, canExport, addBtnOptions, exportApi, beforeExport } =
		unref(propsRef);
	const { getFormValues } = options;
	const { createMessage } = useMessage();
	const add = () => {
		emits('add');
	};

	const upload = async () => {
		if (!exportApi) {
			return;
		}

		if (getFormValues) {
			let params = await getFormValues();

			if (beforeExport && isFunction(beforeExport)) {
				params = await beforeExport(params);
			}

			await exportApi(params);
			createMessage.success('导出任务已添加');
		}

		emits('upload-success');
	};

	const getHeaderProps = computed(() => {
		return {
			title: () =>
				h(
					TableHeader,
					{
						title,
						canAdd,
						canExport,
						addBtnOptions,
						add,
						upload
					},
					{
						...(slots.toolbar
							? {
									toolbar: () => getSlot(slots, 'toolbar')
								}
							: {}),
						...(slots.headerTopLeft
							? {
									headerTopLeft: () => getSlot(slots, 'headerTopLeft')
								}
							: {})
					}
				)
		};
	});

	return { getHeaderProps };
}
