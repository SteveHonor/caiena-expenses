<template>
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
</template>

<script>
export default {
  data() {
    return {
      newTag: "",
      tags: [],
    };
  },
  props: {
    tags: {
      type: [],
      required: true,
    },
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
  },
};
</script>
