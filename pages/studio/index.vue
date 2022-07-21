<template>
  <div style="height: 100%" class='primary'>
    <v-container >
      <p class="title font-weight-regular white--text">My Channels</p>
      <StudioChannelsList />
      <CreateChannelFloatBtn />
    </v-container>
  </div>

</template>

<script>
import CreateChannelFloatBtn from '~/components/core/studio/CreateChannelFloatBtn'
import StudioChannelsList from '~/components/core/listviewers/StudioChannelsList'

export default {
  name: 'StudioPage',
  components: { StudioChannelsList, CreateChannelFloatBtn },
  data: () => ({}),
  head: {
    title: 'Studio',
  },
}
</script>

<style></style>
