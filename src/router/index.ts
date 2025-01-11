import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { asyncRoutes } from './routes';
export { asyncRoutes };

export const router = createRouter({
	history: createWebHistory(),
	// @ts-ignore
	routes: asyncRoutes as AppRouteRecordRaw[]
});

export const setupRouter = (app: App) => {
	app.use(router);
};
