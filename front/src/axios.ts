import axios from "axios";
import { useAuthStore } from "@/modules/auth/store";
import router from "@/router";

axios.defaults.baseURL = "http://localhost:3000/api/v1";

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    console.log(token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();

      router.replace("/signin");
    }
    return Promise.reject(error);
  }
);

export default axios;
