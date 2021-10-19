import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase/app";
import 'firebase/auth'
// import Editor from 'vue-editor-js/src/index.js'

// Vue.use(Editor)


import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

const firebaseConfig = {
  apiKey: "AIzaSyBJ9f05f9UvdFkLH6kNI0liChRGhqa97GQ",
  authDomain: "editorjs-448a2.firebaseapp.com",
  projectId: "editorjs-448a2",
  storageBucket: "editorjs-448a2.appspot.com",
  messagingSenderId: "245034326337",
  appId: "1:245034326337:web:d9284f15b54501a27069c0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


