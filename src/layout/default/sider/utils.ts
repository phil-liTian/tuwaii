import { AppRouteRecordRaw } from '@/router/types';
import { cloneDeep } from 'lodash';
import { asyncRoutes } from '@r/index';
import { treeMap } from '@/utils/helper/treeHelper';

export function transformRouteToMenu(routerMapping: boolean = false) {
	// 借助 lodash 深拷贝
	const routeList: AppRouteRecordRaw[] = [];
	const cloneRouteModList = cloneDeep(asyncRoutes);
	// 对路由项进行修改
	cloneRouteModList.forEach((item) => {
		if (
			routerMapping &&
			item.meta?.hideChildrenInMenu &&
			typeof item.redirect === 'string'
		) {
			item.path = item.redirect;
		}

		if (item.meta?.single) {
			const realItem = item?.children?.[0];
			realItem && routeList.push(realItem);
		} else {
			routeList.push(item);
		}
	});

	// 提取树指定结构
	const list = treeMap(routeList, {
		conversion: (node: AppRouteRecordRaw) => {
			const { meta: { title, icon } = {} } = node;

			let menuItem: any = {
				key: node.path,
				title: title,
				label: title
			};

			return menuItem;
		}
	});

	return list.filter((v) => v.title !== 'Root');
}
