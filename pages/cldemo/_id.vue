e
<template>
  <v-container>
    <v-row class='mt-5'>

      <!--   Player section     -->
      <v-col cols='12' md='8'>
        <cld-video
          :public-id='video.videoId'
          controls
          class='cld-video-player'
          width="500"
          crop="scale"
          quality="auto" />
      </v-col>

      <!--    Recommended Section    -->
      <v-col cols='12' md='4'>
        <RecommendedVideosCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecommendedVideosCard from '~/components/core/cards/recommended_videos_Card'

export default {
  name: 'WatchPage',
  components: { RecommendedVideosCard },
  async asyncData({ $axios, route }) {
    const video = await $axios.$get(`/video/${route.params.id}`)
    return { video }
  },
  data: () => ({
    video: {}
  }),
  head: {
    title: 'DEmo',
    link: [
      { rel:"stylesheet", type:"text/css", href:'https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css' },
    ],

  },
  methods: {
    demo() {
    }
  }
}
</script>
