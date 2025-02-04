<template>
  <button
    :class="
      mobile
        ? 'fixed p-4 text-white bg-blue-600 rounded-full shadow-lg bottom-8 right-8 hover:bg-blue-700 focus:outline-none sm:hidden'
        : 'hidden px-2 py-1 text-white bg-blue-600 rounded-md sm:block'
    "
  >
    <div class="flex flex-wrap">
      <BaseIcon :name="icon" class="w-5" />
      <div>
        <slot />
      </div>
    </div>
  </button>
</template>

<script>
import BaseIcon from "./icons/BaseIcon";

export default {
  name: "Button",
  components: {
    BaseIcon,
  },
  props: {
    icon: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
};
</script>
