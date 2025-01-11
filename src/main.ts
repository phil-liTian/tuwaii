import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router';
import './design/index.less';

const app = createApp(App);

const bootStrap = async () => {
	setupRouter(app);

	app.mount('#app');
};

bootStrap();
