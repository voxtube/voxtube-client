<template>
  <div>
    <VideoPlayer
      :video="video"
      width="100%"
      :poster="video.thumbnailUrl"
      height="400"
      class="rounded-lg"
    />
    <div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h4 class="blue--text text-h5 font-weight-normal">
              {{ video.title }}
            </h4>
          </v-list-item-title>
          <v-list-item-subtitle class="d-flex align-center">
            <span class="text-caption accent--text"
              >{{ video._count.view }} views</span
            >
            <span class="text-caption accent--text mx-4">{{
              new Date(video.createdAt).toLocaleString('en-US')
            }}</span>
            <v-spacer></v-spacer>
            <span class="accent--text">
              <v-btn small icon color="accent " @click="like()"
                ><v-icon small left>mdi-thumb-up</v-icon></v-btn
              >
              {{ l }}</span
            >
            <span class="accent--text mx-3">
              <v-btn small class="mx-2" icon color="accent" @click="dislike()"
                ><v-icon small right>mdi-thumb-down</v-icon></v-btn
              >
              dislike
            </span>
            <span class="accent--text mx-2">
              <v-btn small icon color="accent" @click="dislike()"
                ><v-icon small right>mdi-share</v-icon></v-btn
              >
              share
            </span>
            <span
              ><report-video-dialog :videoid="video.id" :userid="$auth.user.id"
            /></span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <div class="d-flex"></div>
      <v-divider class="grey darken-1 mb-2"></v-divider>
      <p class="white--text font-weight-light">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, sed
        ipsam nemo possimus accusamus nobis autem magnam corporis aliquid
        voluptate, porro sunt atque quod dignissimos expedita! Optio quod odit
        consequuntur?
      </p>
    </div>
  </div>
</template>

<script>
import ReportVideoDialog from './ReportVideoDialog.vue'
import VideoPlayer from '~/components/base/videoplayer'

export default {
  name: 'PlayerCard',
  components: { VideoPlayer, ReportVideoDialog },
  props: {
    video: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    l: 0,
    d: 0,
  }),
  methods: {
    like() {
      this.l = +1
    },
    dislike() {
      this.d = +1
    },
  },
}
</script>

<style scoped></style>
