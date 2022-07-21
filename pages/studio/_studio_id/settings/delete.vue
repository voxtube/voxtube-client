<template>
  <v-container>
    <p class='title white--text'>Delete Channel Page</p>
    <p class='subtitle-1 font-weight-light white--text'>Note: this action cannot be reserved</p>
    <p class='subtitle-1 font-weight-light white--text'>Deleting a channel will cause all of it contents and any other
      activities or data relating to this channel to be
      erased</p>
    <p class='subtitle-1 font-weight-light white--text'>Hence a channel data cannot be retrieved if a channel is
      deleted</p>
    <ConfirmPassword
      color='error'
      icon='mdi-delete'
      label='Delete Account'
      @action='deleteChannel'
    />
    <v-btn dark color='primary' to='../settings'>
      <v-icon left>mdi-arrow-left</v-icon>
      Go Back
    </v-btn>
  </v-container>
</template>

<script>
import { Confirm } from 'notiflix'
import ConfirmPassword from '~/components/core/password/ConfirmPassword'

export default {
  name: 'DeleteChannelPage',
  components: { ConfirmPassword },
  layout: 'studio',
  head: {
    title: 'Delete Channel'
  },
  methods: {
    deleteChannel() {

      Confirm.show(
        'Delete Channel',
        'Are you sure you want to delete this channel ?\n this action cannot be reverse',
        'Delete',
        'Cancel',
        async () => {
          // making delete call
          try {
            await this.$axios.delete(`/channel/${this.$store.state.studio.active_channel.id}`)
            await this.$router.push('/studio')
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log('err', err)
            // eslint-disable-next-line no-console
            console.log('response', err.response.data)
          }
        },
        () => {
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
