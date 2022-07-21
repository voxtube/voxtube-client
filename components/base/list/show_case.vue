<template>
  <div>
    <v-toolbar v-if='label' flat>
      <v-toolbar-title class='title' v-text='label' />
      <v-spacer />
      <v-btn v-if='urlText' text link depressed>
        {{ urlText }}
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row>
      <v-col v-for='video in data' :key='video.title' cols='12' sm='6' md='4' lg='3'>
        <VideoCard :video='video' />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VideoCard from '~/components/core/cards/VideoCard'

export default {
  name: 'ShowCase',
  components: { VideoCard },
  props: {
    label: {
      type: String,
      default: '',
    },
    urlText: {
      type: String,
      default: 'See more'
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
