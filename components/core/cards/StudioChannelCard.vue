<template>
  <v-card
    elevation='1'
    nuxt
    width='100%'
    :to="`/studio/${channel.id}/dashboard`"
  >
    <k-image height='250' :src='channel.channel_img' :alt='channel.name'  />
    <v-card-title>
      <span class='text-h6 font-weight-light'> {{ channel.name | sentenceCase }} </span>
    </v-card-title>
  </v-card>
</template>

<script>
import { truncate } from 'lodash-es'
import KImage from '~/components/base/image'

export default {
  name: 'StudioChannelCard',
  components: { KImage },
  props: {
    channel: {
      required: true,
      type: Object
    }
  },
  methods: {
    truncateText(text) {
      return truncate(text, {
        separator: '',
        length: 30,
        omission: '...'
      })
    }
  }
}
</script>

<style scoped>
.my_title {
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 1rem;
  line-height: 1rem;
}
</style>
