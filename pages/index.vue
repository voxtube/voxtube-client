<template>
    <v-container>
      <Hero />
      <Trending />
<!--      <MostWatched />-->
      <BeCreator />
    </v-container>
</template>

<script>
// import ShowCase from '~/components/base/list/show_case'
import Hero from '~/components/core/home/Hero.vue'
import Trending from '~/components/core/home/Trending.vue'
// import MostWatched from '~/components/core/home/MostWatched.vue'
import BeCreator from '~/components/core/home/Creator.vue'

export default {
  name: 'HomePage',
  components: { Hero, BeCreator, Trending },
     layout: 'home',

  data: () => ({
    videos: [],
    error: false,
    message: '',
  }),
  async fetch() {
    this.videos = await this.$axios.$get('/video')
  },
  head: {
    title: 'Home',
  },
}
</script>
