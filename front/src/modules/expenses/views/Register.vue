<template>
  <div class="max-w-lg mx-auto">
    <div class="flex flex-wrap items-center mb-4">
      <Button @click="backToList">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 mr-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </Button>
      <h2 class="text-2xl font-semibold text-gray-700">Novo Reembolso</h2>
    </div>

    <div class="mb-20">
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700"
          >Valor</label
        >
        <input
          v-model="amount"
          id="amount"
          type="text"
          step="0.01"
          required
          placeholder="R$"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Descrição</label
        >
        <input
          v-model="description"
          id="description"
          type="text"
          required
          placeholder="Descrição do gasto"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700"
          >Data</label
        >
        <input
          v-model="date"
          id="date"
          type="date"
          required
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags</label
        >
        <input
          type="text"
          id="tags"
          v-model="newTag"
          @keyup.enter="addTag"
          placeholder="Digite as tags e pressione Enter"
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
        <ul class="flex flex-wrap gap-2 mt-2">
          <li
            v-for="(tag, index) in tags"
            :key="index"
            class="flex items-center px-3 py-1 space-x-2 text-sm text-blue-800 bg-blue-100 rounded-full shadow-md"
          >
            <span>{{ tag }}</span>
            <button
              @click="removeTag(index)"
              class="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="mb-4">
        <div class="flex flex-wrap mt-2">
          <div class="mb-4 mr-10">
            <label for="receiptImage" class="block mb-2 text-sm font-semibold"
              >Imagem do Recibo</label
            >
            <div class="flex items-center">
              <label
                for="receiptImage"
                class="inline-flex items-center px-4 py-2 text-white rounded-md cursor-pointer bg-cyan-600 hover:bg-cyan-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 2H6c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2V8l-6-6z"
                  />
                </svg>
                <span>{{
                  receiptImageSelected
                    ? "Arquivo Selecionado"
                    : "Escolher Imagem"
                }}</span>
                <div v-if="receiptImagePreview" class="mt-2">
                  <img
                    :src="receiptImagePreview"
                    alt="Preview"
                    class="object-cover w-10 h-10 ml-5 border-2 border-gray-300 rounded-md"
                  />
                </div>
              </label>

              <input
                type="file"
                id="receiptImage"
                @change="handleFileChange($event, 'receipt')"
                class="hidden"
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="ticketImage" class="block mb-2 text-sm font-semibold"
              >Imagem do Ticket</label
            >
            <div class="flex items-center">
              <label
                for="ticketImage"
                class="inline-flex items-center px-4 py-2 text-white rounded-md cursor-pointer bg-cyan-600 hover:bg-cyan-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 2H6c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2V8l-6-6z"
                  />
                </svg>
                <span>{{
                  ticketImageSelected
                    ? "Arquivo Selecionado"
                    : "Escolher Imagem"
                }}</span>

                <div v-if="ticketImagePreview" class="mt-2">
                  <img
                    :src="ticketImagePreview"
                    alt="Preview"
                    class="object-cover w-10 h-10 ml-5 border-2 border-gray-300 rounded-md"
                  />
                </div>
              </label>
              <input
                type="file"
                id="ticketImage"
                @change="handleFileChange($event, 'ticket')"
                class="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="Object.keys(errors).length" class="mb-4">
        <ul class="space-y-2">
          <li v-for="(errorMessages, fieldName) in errors" :key="fieldName">
            <div
              class="flex items-center p-3 text-red-700 bg-red-100 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>

              <span class="font-medium">{{ fieldName }}:</span>
              <ul class="ml-4">
                <li
                  v-for="(error, index) in errorMessages"
                  :key="index"
                  class="text-sm"
                >
                  <p>{{ error }}</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <button
        @click="submitExpense()"
        class="fixed bottom-0 right-0 w-full p-3 mt-6 text-lg font-semibold text-white bg-blue-600 md:rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:relative"
      >
        Enviar Reembolso
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      description: "",
      date: "",
      receiptImage: null,
      ticketImage: null,
      newTag: "",
      tags: [],
      errors: [],
      receiptImage: null,
      ticketImage: null,
      receiptImageSelected: false,
      ticketImageSelected: false,
      receiptImagePreview: null,
      ticketImagePreview: null,
    };
  },
  methods: {
    addTag() {
      const tag = this.newTag.trim();

      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.newTag = "";
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    handleFileChange(event, type) {
      const file = event.target.files[0];
      if (type === "receipt") {
        this.receiptImage = file;
        this.receiptImageSelected = true;
        this.receiptImagePreview = URL.createObjectURL(file);
      } else if (type === "ticket") {
        this.ticketImage = file;
        this.ticketImageSelected = true;
        this.ticketImagePreview = URL.createObjectURL(file);
      }
    },
    async submitExpense() {
      const formData = new FormData();
      formData.append("expense[amount]", this.amount);
      formData.append("expense[description]", this.description);
      formData.append("expense[date]", this.date);

      if (this.receiptImage) {
        formData.append("expense[receipt_image]", this.receiptImage);
      } else {
        console.error("No receipt image selected!");
      }

      if (this.ticketImage) {
        formData.append("expense[ticket_image]", this.ticketImage);
      } else {
        console.error("No ticket image selected!");
      }

      formData.append("expense[tags]", this.tags.join(","));

      try {
        await this.axios
          .post("/expenses", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.backToList();
          });
      } catch (error) {
        this.errors = error.response.data;
      }
    },
    backToList() {
      this.$router.push("/");
    },
  },
};
</script>
