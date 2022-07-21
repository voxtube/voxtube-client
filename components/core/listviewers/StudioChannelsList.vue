<template>
  <v-skeleton-loader v-if='$fetchState.pending' type='card' />
  <div v-else>
    <p v-if='!$store.state.studio.my_channels.length' class='title white--text'>You dont have any channel</p>
    <v-row class='pt-4'>
      <v-col
        v-for='channel in $store.state.studio.my_channels'
        :key='channel.id'
        cols='12'
        sm='6'
        md='4'
      >
        <StudioChannelCard :channel='channel' />
      </v-col>
    </v-row>
  </div>

</template>

<script>
import StudioChannelCard from '~/components/core/cards/StudioChannelCard'

export default {
  name: 'StudioChannelsList',
  components: { StudioChannelCard },
  data() {
    return {}
  },
  async fetch() {
    await this.$store.dispatch('studio/getMyChannels')
  }
}
</script>

<style scoped>

</style>
