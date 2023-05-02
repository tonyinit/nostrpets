<template>
  <v-app>
    <component v-bind:is="layout"></component>
  </v-app>
</template>

<script>
import LayoutDefault from './layouts/Default.vue';

export default {
  components: {
    'layout-default': LayoutDefault,
  },
  computed: {
    layout () {
      return "layout-default"
    }
  }
}
</script>
