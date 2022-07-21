<template>
  <v-container>
    <div v-if="$fetchState.pending">
      <v-skeleton-loader type="card" />
    </div>
    <v-row v-else class="mt-2">
      <v-col cols="12" sm="11" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-account"
          title="Users"
          :value="userCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-chart-bubble"
          title="Channels"
          :value="channelCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-video"
          title="Videos"
          :value="videoCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="12" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-account-group"
          title="Subscribers"
          :value="subscriberCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-eye"
          title="Total Views"
          :value="viewCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <material-stats-card
          color="primary"
          class="my-6"
          icon="mdi-flag"
          title="Reports"
          :value="reportCount"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import MaterialStatsCard from '~/components/core/cards/MaterialStatsCard.vue'

export default {
  name: 'AdminDashboardPage',
  components: { MaterialStatsCard },
  layout: 'dashboard',
  data: () => ({
    channelCount: '0',
    videoCount: '0',
    subscriberCount: '0',
    viewCount: '0',
  }),
  async fetch() {
    const responses = await Promise.all([
      this.$store.dispatch('dashboard/reports/getAllReports'),
      this.$store.dispatch('dashboard/users/getAllUsers'),
      this.$axios.$get(`/channel`),
    ])

    this.channelCount = responses[2].length.toString()
    this.videoCount = responses[2][0]._count.video.toString()
    this.subscriberCount = responses[2][0]._count.subscribe.toString()
    this.viewCount = responses[2][0]._count.view.toString()

    console.log(responses)
  },
  head: {
    title: 'Dashbord',
  },
  computed: {
    ...mapGetters('dashboard/users', ['userCount']),
    ...mapGetters('dashboard/reports', ['reportCount']),
  },
}
</script>
