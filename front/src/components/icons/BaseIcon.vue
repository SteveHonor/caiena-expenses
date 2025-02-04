<template>
  <component :is="icon" role="img" />
</template>

<script>
import * as components from "./svg";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components,
  computed: {
    icon: (self) => self.name,
  },
};
</script>
