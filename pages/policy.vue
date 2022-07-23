<template>
  <v-container>
    <!-- eslint-disable vue/no-v-html -->
    <div v-html='policy'></div>
  </v-container>
</template>

<script>
import {Report} from "notiflix";

export default {
  name: 'PolicyPage',
  auth: false,
  layout: 'default',
  data: () => ({
    policy: ''
  }),
  async fetch() {
    try {
      this.policy = (await this.$axios.$get("/policy")).content
    } catch ({response}) {
      // eslint-disable-next-line no-console
      console.log(response)
      this.loading = false
      return Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'MID Policy'
  }
}
</script>

<style scoped>

</style>
