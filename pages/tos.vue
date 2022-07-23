<template>
  <v-container>
    <!-- eslint-disable vue/no-v-html -->
    <div v-html='tos'></div>
  </v-container>
</template>

<script>
import {Report} from "notiflix";

export default {
  name: 'TosPage',
  auth: false,
  layout: 'tos',
  data: () => ({
    tos: ''
  }),
  async fetch() {
    try {
      this.tos = (await this.$axios.$get("/tos")).content
    } catch ({response}) {
      // eslint-disable-next-line no-console
      console.log(response)
      this.loading = false
      return Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'MID - Terms And Condition'
  },
}
</script>

<style scoped>

</style>
