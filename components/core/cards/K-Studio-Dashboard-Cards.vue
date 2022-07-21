<template>
  <div v-if="$fetchState.pending">
    <v-skeleton-loader type="card" />
  </div>
  <v-row v-else class="mt-2">
    <v-col cols="12" sm="11" md="4">
      <MaterialStatsCard
        color="primary"
        class="my-6"
        icon="mdi-video"
        title="Videos"
        :value="videos"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="primary"
        class="my-6"
        icon="mdi-badge-account"
        title="Subscribers"
        :value="subscribers"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="primary"
        class="my-6"
        icon="mdi-eye"
        title="Views"
        :value="views"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
  </v-row>
</template>

<script>
import { Report } from 'notiflix'
import MaterialStatsCard from '~/components/core/cards/MaterialStatsCard'

export default {
  name: 'KStudioDashboardCards',
  components: { MaterialStatsCard },
  props: {
    studioId: {
      required: true,
      default: '',
      type: String,
    },
  },
  data() {
    return {
      videos: '0',
      views: '0',
      subscribers: '0',
    }
  },
  async fetch() {
    try {
      const videosRequest = await this.$axios.$get(
        `/channel/${this.studioId}/video/count/videos`
      )
      const viewsRequest = await this.$axios.$get(
        `/channel/${this.studioId}/video/count/views`
      )
      const subscribersRequest = await this.$axios.$get(
        `/channel/${this.studioId}/subscribe/count`
      )

      this.videos = videosRequest.count.toString()
      this.views = viewsRequest.count.toString()
      this.subscribers = subscribersRequest.count.toString()
    } catch ({ response }) {
      Report.failure('Error', response.data.message, 'Ok')
    }
  },
}
</script>

<style scoped></style>
