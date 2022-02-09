import { VuesticPlugin} from 'vuestic-ui';
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')

