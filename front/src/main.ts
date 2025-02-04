import App from "./App.vue";
import router from "@/router";

import "@/assets/css/index.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import VueAxios from "vue-axios";
import axios from "./axios";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
