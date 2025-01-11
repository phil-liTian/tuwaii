import { Component } from 'vue';
export * from './propTypes';
export * from './helper/tsxHelper';

export type CustomComponent = Component & { displayName?: string };

export const withInstall = <T extends CustomComponent>(
	component: T,
	alias?: string
) => {
	(component as Record<string, unknown>).install = (app: App) => {
		// app.component(component.name, component)
		const componentName = component.name || component.displayName;
		if (!componentName) {
			return;
		}
		app.component(componentName, component);
		if (alias) {
			app.config.globalProperties[alias] = component;
		}
	};

	return component as any;
};
