<template>
  <v-card height='265' link hover :to='`/watch/${video.id}`'>
    <KImage :src='video.thumbnailUrl' height='150' alt='image' />
    <v-row class='pa-5'>
      <v-col cols='10' class='pa-0'>
        <div class='ml-1'>
        <span class='subtitle-2 font-weight-regular'>
          {{ video.channel.name }}
          <v-avatar color='grey' size='15' class='mb-1'>
            <v-icon small dark>mdi-check</v-icon>
          </v-avatar>
        </span>
          <br>
          <p style='width: 100%' class='my_title font-weight-medium mt-1'>{{ truncateText(video.title) }}</p>
        </div>
      </v-col>
      <v-col cols='2'>
        <v-btn icon @click.prevent=''>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
      <div style='width: 100%' class='mx-1'>
        <p class='subtitle-2 font-weight-regular float-left'>
          {{ video._count.view }} views  {{ $dayjs(video.createdAt).fromNow() }}
        </p>
        <span v-if='video.free' class='float-right' :class='textStyle'>Free</span>
        <span v-else class='float-right' :class='textStyle'>${{ video.price }}</span>
      </div>
    </v-row>

  </v-card>
</template>

<script>
import { truncate } from 'lodash-es'
import KImage from '~/components/base/image'

export default {
  name: 'VideoCard',
  components: { KImage },
  props: {
    video: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      textStyle: {
        'purple--text text--darken-4': !this.$vuetify.theme.dark,
        'text--darken-4': !this.$vuetify.theme.dark,
        'white--text': this.$vuetify.theme.dark
      }
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
  /*font-weight: 400;*/
  /*max-height: 4rem;*/
}
</style>
