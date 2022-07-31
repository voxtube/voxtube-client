<template>
  <v-skeleton-loader v-if="$fetchState.pending" type="card"/>
  <v-container v-else>
    <HistoryVideosCols :history="history" :categories="categories"/>
  </v-container>
</template>

<script>
import HistoryVideosCols from "~/components/core/listviewers/historyvideocols";

export default {
  name: 'HistoryPage',
  components: {HistoryVideosCols},
  data: () => ({
    history: [],
    categories: []
  }),
  async fetch() {
    this.history = await this.$axios.$get(`/history/${this.$auth.user.id}`)
    // eslint-disable-next-line no-console
    console.log('videos', this.history)
    this.categories = await this.$axios.$get(`/category`)
  },
  head: {
    title: "History",
  }
}
</script>

<style scoped>

</style>
