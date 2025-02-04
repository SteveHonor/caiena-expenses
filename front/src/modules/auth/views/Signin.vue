<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            v-model="email"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/modules/auth/store";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    store: () => useAuthStore(),
  },
  methods: {
    async login() {
      try {
        await this.axios
          .post("/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => this.signinSuccessful(response))
          .catch((error) => this.signinFailed(error));
      } catch (error) {
        console.log(error);

        console.error("Login failed:", error.response);
      }
    },
    signinSuccessful(response) {
      this.store.login(response);

      this.error = "";

      this.loading = false;

      this.$router.replace("/");
    },
    signinFailed(error) {
      this.error = error.response.data.error;

      this.loading = false;

      this.store.logout();
    },
  },
};
</script>
