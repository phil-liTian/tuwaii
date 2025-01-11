import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router';
import './design/index.less';
import { registerGlobalComps } from './components';
import 'virtual:uno.css';

const app = createApp(App);

const bootStrap = async () => {
	setupRouter(app);

	registerGlobalComps(app);

	app.mount('#app');
};

bootStrap();
