import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isLogged: false,
      token: "",
      user: {
        name: "",
        email: "",
      },
    };
  },

  getters: {
    signedIn(state) {
      return state.isLogged;
    },

    me(state) {
      return state.user;
    },
  },

  actions: {
    login(data: { user: { email: string }; token: string }) {
      this.user.email = data.user.email;
      this.isLogged = true;
      this.token = data.token;
    },

    logout() {
      this.isLogged = false;
      this.token = "";
    },
  },
  persist: true,
});
