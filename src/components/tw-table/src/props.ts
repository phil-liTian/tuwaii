import { PropType } from 'vue';
import { propTypes } from '@u/propTypes';
import { BasicColumn } from '../types/table';
import { PaginationProps } from '../types/pagination';
// import { FormProps } from '../../BkForm';
// import { SummayItem } from '../components/TableSummary.vue';

export const basicProps = {
	title: {
		type: [String, Function] as PropType<
			string | ((data: Recordable) => string)
		>,
		default: ''
	},

	columns: {
		type: Array as PropType<BasicColumn[]>,
		default: () => []
	},

	dataSource: {
		type: Array as PropType<Recordable[]>,
		default: null
	},

	showIndexColumn: propTypes.bool.def(true),

	// fetch
	beforeFetch: propTypes.func,
	api: propTypes.func,
	afterFetch: propTypes.func,

	// export
	exportApi: propTypes.func,
	beforeExport: propTypes.func,

	// 分页内容
	pagination: {
		type: [Object, Boolean] as PropType<boolean | PaginationProps>,
		default: null
	},

	actionColumn: {
		type: Object as PropType<BasicColumn>,
		default: null
	},

	/**
	 * @description header
	 */

	canExport: propTypes.bool.def(false),
	canAdd: propTypes.bool.def(false),
	addBtnOptions: propTypes.object.def({}),

	/**
	 * @description 表单相关配置
	 */

	showSearchForm: propTypes.bool,

	// formConfig: {
	// 	type: Object as PropType<Partial<FormProps>>,
	// 	default: () => ({})
	// },

	/**
	 * @description footer相关配置
	 */
	showSummary: propTypes.bool.def(false),

	summaryData: {
		type: Array as PropType<Recordable[]>,
		default: () => []
	}
};
