import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { asyncRoutes } from './routes';
export { asyncRoutes };

export const router = createRouter({
	history: createWebHistory(),
	routes: asyncRoutes as any
});

export const setupRouter = (app: App) => {
	app.use(router);
};
