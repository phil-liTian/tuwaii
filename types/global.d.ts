import { VNode } from 'vue';

export {};
declare global {
	declare type Recordable<T = any> = Record<string, T>;

	type Nullable<T> = T | null;

	type DeepPartial<T> = {
		[P in keyof T]?: DeepPartial<T[P]>;
	};

	type IntervalHandler = ReturnType<typeof setInterval>;

	type LabelValueOptions = {
		label: string;
		value: any;
		[key: string]: string | number | boolean;
	}[];

	namespace JSX {
		type Element = VNode;
	}
}
