<template>
  <v-app class="custom_bg">
    <v-container>
      <v-skeleton-loader v-if="$fetchState.pending" type="card" />
      <div v-else>
        <h2 class="white--text">Channel List</h2>
        <v-row class="pt-10">
          <v-col
            v-for="channel in channels"
            :key="channel.id"
            cols="12"
            md="4"
            sm="6"
          >
            <channel-card :channel="channel" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import ChannelCard from '~/components/core/cards/ChannelCard.vue'

export default {
  name: 'ChannelsPage',
  components: { ChannelCard },

  // components: { KImage },
  data: () => ({
    channels: [],
    // subscriptionStatus: false,
  }),
  async fetch() {
    this.channels = await this.$axios.$get('/channel')
  },
  head: {
    title: 'Channels',
  },
}
</script>

<style scoped>
.custom_bg {
  background-color: #2b273f;
}
</style>
