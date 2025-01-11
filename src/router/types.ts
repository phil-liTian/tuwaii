import { RouteMeta, RouteRecordRaw } from 'vue-router';
export type Component<T = any> = () => Promise<T>;

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
	name?: string;
	component?: Component | string;
	meta?: RouteMeta;
	children?: AppRouteRecordRaw[];
	fullPath?: string;
	title?: string;
}
