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
          <v-list-item-subtitle class="d-flex align-center pa-2">
            <span class="text-caption accent--text"
              >{{ video._count.view }} views</span
            >
            <span class="text-caption accent--text mx-4">{{
              new Date(video.createdAt).toLocaleString('en-US')
            }}</span>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!like"
              icon
              color="secondary"
              @click="likeVideo"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-badge v-else color="green" overlap :content="like">
              <v-btn
                icon
                :color="isLiked ? '#fff' : 'secondary'"
                @click="likeVideo"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-badge>

            <v-btn
              v-if="!dislike"
              color="secondary"
              icon
              @click="dislikeVideo"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-badge
              v-else
              color="green"
              overlap
              :content="dislike"
            >
              <v-btn
                icon
                :color="isDisliked ? '#fff' : 'secondary'"
                @click="dislikeVideo"
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-badge>
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
        {{ video.description }}
      </p>
    </div>
  </div>
</template>

<script>
import {Report} from "notiflix";
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
    like: 0,
    isLiked: false,
    dislike: 0,
    isDisliked: false,
  }),
  fetch() {
    // eslint-disable-next-line no-console
    console.log("Video", this.video)
    this.like = this.video._count.like
    this.dislike = this.video._count.dislike
    this.isLiked = this.video.liked
    this.isDisliked = this.video.disliked
  },
  methods: {
    async likeVideo() {
      // checking if the video is already dislike then you update some properties
      if (this.dislike) {
        // setting the disliked property to false
        this.isDisliked = false
        // decreasing the dislike number
        // this.dislike = this.dislike - 1
        this.dislike -= 1
      }

      try {
        // setting the liked boolean porperty to opposite of it value
        this.isLiked = !this.isLiked

        // sending the like to server
        const request = await this.$axios.$post('/video/action/like', {
          videoid: this.video.id,
        })

        // to improve performance we are not going to send a request to retreive the video meta data again
        this.like = request.likes
      } catch ({ response }) {
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
    async dislikeVideo() {
      // if video already like we are going to unlike it
      if (this.isLiked) {
        // removing the count number from the video object
        this.isLiked = false
        // decreasing the like number
        // this.like = this.video._count.Like - 1
        this.like -= 1
      }

      try {
        // setting the object property to opposite of it self
        this.isDisliked = !this.isDisliked
        await this.$axios.$post('/video/action/dislike', {
          videoid: this.video.id,
        })

        // to improve performance we are not going to send a request to retreive the video meta data again
        // or run this.$nuxt.refresh() we are going to target the video object properties and update it

        // the server is returning an unexpected value for the dislike
        // it was tested and it working normal in postman
        // but i dont know why it not working in production
        if (!this.isDisliked)
          // this.dislike = this.video._count.dislike - 1
          this.dislike -= 1
        // else this.video._count.dislike = this.video._count.dislike + 1
        else this.dislike += 1
      } catch ({ response }) {
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
  },
}
</script>

<style scoped></style>
