import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use (router)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWind, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

library.add(faWind, faPaperPlane);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')