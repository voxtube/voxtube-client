<template>
  <v-skeleton-loader v-if="$fetchState.pending" type="card"/>
  <v-container v-else>
    <Videocols :videos="videos" :categories="categories"/>
  </v-container>
</template>

<script>
import Videocols from "~/components/core/listviewers/videocols";

export default {
  name: 'VideosPage',
  components: {Videocols},
  data() {
    return {
      videos: [],
      categories: [],
    }
  },
  async fetch() {
    this.videos = await this.$axios.$get('/video')
    this.categories = await this.$axios.$get(`/category`)
  },
  head: {
    title: 'Videos',
  },
}
</script>

<style scoped>
.custom_bg {
  background-color: #2b273f;
}
</style>
