<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="items-center text-2xl font-semibold text-gray-700">
        Lista de Reembolsos
      </h2>

      <Button icon="plus" @click="addExpense"> Reembolso </Button>
    </div>

    <div v-if="expenses.length === 0" class="text-center text-gray-500">
      <p>Não há reembolsos registrados ainda.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="expense in expenses"
        :key="expense.id"
        class="p-4 bg-white rounded-lg shadow-md"
      >
        <div class="flex items-start justify-between">
          <div class="flex flex-col w-4/12">
            <span class="text-xl font-semibold text-gray-800"
              >R$ {{ expense.amount }}</span
            >
            <span class="text-sm text-gray-500">{{
              new Date(expense.date).toLocaleDateString()
            }}</span>
          </div>

          <div class="flex flex-wrap justify-end w-8/12 space-x-2">
            <span
              v-for="tag in expense.tags"
              :key="tag.id"
              class="px-2 py-1 mb-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <p class="mt-2 text-sm font-bold text-gray-700">
          {{ expense.description }}
        </p>

        <div class="flex mt-4 space-x-4">
          <div
            v-if="expense.receipt_image_url"
            class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-md"
          >
            <img
              v-if="expense.receipt_image_url"
              :src="`http://localhost:3000/${expense.receipt_image_url}`"
              alt="Imagem do Cupom"
              class="object-cover w-full h-full rounded-md"
            />
          </div>

          <div
            v-if="expense.ticket_image_url"
            class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-md"
          >
            <img
              v-if="expense.ticket_image_url"
              :src="`http://localhost:3000/${expense.ticket_image_url}`"
              alt="Imagem do Recibo"
              class="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </div>

    <Button icon="plus" @click="addExpense" :mobile="true"></Button>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  data() {
    return {
      expenses: [],
    };
  },
  components: {
    Button,
  },
  mounted() {
    this.loadExpenses();
  },
  methods: {
    async loadExpenses() {
      try {
        this.expenses = await this.axios.get("expenses");
      } catch (error) {
        console.error("Erro ao carregar reembolsos", error);
      }
    },

    addExpense() {
      this.$router.push("/new");
    },
  },
};
</script>
