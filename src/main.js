import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router'

// import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import iconSet from 'quasar/icon-set/fontawesome-v6'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// import Quasar css
import 'quasar/src/css/index.sass'

// assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  iconSet: iconSet,
  plugins: {}, // import Quasar plugins and add here
})

myApp.use(router)

// assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')