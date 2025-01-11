import { LAYOUT } from '@r/constant';
import { AppRouteRecordRaw } from '@r/types';

export const workBench: AppRouteRecordRaw = {
	name: 'Management',
	path: '/management',
	component: LAYOUT,
	redirect: '/management/release',
	meta: {
		title: '管理',
		icon: 'icon-shanghuguanlibeifen1',
		orderNo: 1,
		code: 'ManagementIndex'
	},
	children: [
		{
			name: 'ReleaseIndex',
			path: '/management/release',
			component: () => import('@v/management/release/index'),
			meta: {
				title: '发布管理',
				icon: 'home',
				code: 'release'
			}
		},
		{
			name: 'MediaIndex',
			path: '/management/media',
			component: () => import('@v/management/media/index'),
			meta: {
				title: '媒体管理',
				icon: 'home',
				code: 'release'
			}
		},
		{
			name: 'ContentIndex',
			path: '/management/content',
			component: () => import('@v/management/content/index'),
			meta: {
				title: '内容管理',
				icon: 'home',
				code: 'release'
			}
		}
	]
};

export default workBench;
