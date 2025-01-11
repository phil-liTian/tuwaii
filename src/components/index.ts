import { App } from 'vue';

const modules = import.meta.glob('./**/index.ts', { eager: true });
const componentModuleList: any[] = [];

Object.keys(modules).forEach((key) => {
	const mod = (modules as Recordable)[key].default;
	if (!mod) {
		return;
	}
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	componentModuleList.push(...modList);
});

export function registerGlobalComps(app: App) {
	componentModuleList.forEach((comp) => {
		app.use(comp);
	});
}
