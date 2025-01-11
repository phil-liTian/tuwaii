import { ColumnProps } from 'ant-design-vue/es/table';
import AntDesignVueTable from 'ant-design-vue/es/table';
import { PaginationProps } from './pagination';
type Fn = Function;

export interface BasicTableProps {
	title: string | ((data: Recordable) => string);

	columns: BasicColumn[];
	dataSource: Recordable[];

	showIndexColumn: boolean;

	// 处理参数
	beforeFetch?: Fn;
	api?: (...args: any) => any;

	// 处理导出
	exportApi?: (...args: any) => any;
	beforeExport?: Fn;
	// 处理返回数据
	afterFetch?: Fn;
	// 分页内容
	pagination: boolean | PaginationProps;

	actionColumn?: BasicColumn;

	/**
	 * header
	 */
	canExport?: boolean;

	canAdd?: boolean;

	addBtnOptions: Recordable;

	/**
	 * form
	 */

	// formConfig?: Partial<FormProps>;

	showSearchForm?: boolean;

	/**
	 * footer
	 */

	showSummary?: boolean;
	summaryData?: Recordable[];

	scroll?: InstanceType<typeof AntDesignVueTable>['$props']['scroll'];
}

export type IFlagType = 'INDEX' | 'ACTION' | 'default';

export interface BasicColumn extends ColumnProps {
	title: string;
	width?: number;
	dataIndex?: string | number;

	flag?: IFlagType;
}

export interface FetchParams {
	searchInfo: Recordable;
}

export interface TableActionTypes {
	fetch: () => Promise<void>;
	reload: (opt?: Recordable) => Promise<void>;
	getColumns: () => BasicColumn[];
	getDataSource: () => Recordable[];
}
