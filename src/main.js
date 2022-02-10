import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import firebase from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

Vue.prototype.$firebase_coreapp = firebase.initializeApp(firebaseConfig);

if (process.env.USE_FUNCTIONS_EMULATORS === "true") {
  const host = process.env.FUNCTIONS_EMULATOR_HOST;
  const port = parseInt(process.env.FUNCTIONS_EMULATOR_PORT);
  firebase.functions().useEmulator(host, port);
}

firebase.auth().languageCode = "es";
Vue.prototype.$firebase = firebase;

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
