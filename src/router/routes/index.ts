import { AppRouteRecordRaw } from '../types';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

let routeModuleList: AppRouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
	const mod = (modules as Recordable)[key].default || {};

	const modList = Array.isArray(mod) ? [...mod] : [mod];
	routeModuleList.push(...modList);
});

const RootRoute = {
	path: '/',
	name: 'Root',
	redirect: '/management/release',
	meta: {
		title: 'Root'
	}
};

export const asyncRoutes = [RootRoute, ...routeModuleList];
