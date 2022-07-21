<template>
  <v-app class="primary">
    <v-container>
      <v-row class="mt-5">
        <!--   Player section     -->
        <v-col cols="12" md="8">
          <PlayerCard :video="video" />
        </v-col>

        <!--    Recommended Section    -->
        <v-col cols="12" md="4">
          <RecommendedVideosCard />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import RecommendedVideosCard from '~/components/core/cards/recommended_videos_Card'
import PlayerCard from '~/components/core/cards/playercard'
export default {
  name: 'WatchPage',
  components: { PlayerCard, RecommendedVideosCard },
  async asyncData({ $axios, route }) {
    const video = await $axios.$get(`/video/${route.params.id}`)
    return { video }
  },
  data: () => ({
    video: {},
  }),
  head: {
    title: 'Studio',
  },
}
</script>
