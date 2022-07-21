<template>
  <v-container>
    <p v-if="subscribedChannels.length < 1">
      You are not subscribed to any channel
    </p>
    <div v-else>
      <h2>Subscribed Channel List</h2>
      <v-row class="pt-10">
        <v-col
          v-for="channel in subscribedChannels"
          :key="channel.id"
          cols="12"
          sm="6"
          md="4"
        >
          <channel-card :channel="channel" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ChannelCard from '~/components/core/cards/ChannelCard.vue'
export default {
  name: 'SubscriptionPage',
  components: { ChannelCard },
  data: () => ({
    subscribedChannels: [],
  }),
  async fetch() {
    try {
      this.subscribedChannels = await this.$axios.$get('/users/subscribed')
    } catch (error) {}
  },
  head: {
    title: 'Subscriptions',
  },
}
</script>

<style scoped></style>

ChannelCard
