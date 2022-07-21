<template>
  <v-app class="secondary">
    <v-container>
      <v-skeleton-loader v-if="$fetchState.pending" type="card" />

      <div v-else>
        <div>
          <v-img
            :height="
              $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? '150' : '250'
            "
            cover
            alt="banner"
            :src="channel.cover_img"
          />
          <v-list-item three-line class="pa-0">
            <v-list-item-avatar rounded="full" size="80" color="gray">
              <v-img :src="channel.channel_img" alt="channel cover"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ channel.name | sentenceCase }}
              </v-list-item-title>
              <v-list-item-subtitle
                >{{
                  subscriberCount.toString()
                }}
                subscribers</v-list-item-subtitle
              >
              <!-- <v-list-item-subtitle>channel description</v-list-item-subtitle> -->
              <v-list-item-action class="ma-0">
                <v-btn
                  :class="
                    channel.userId === $auth.user.id ? 'd-none' : 'd-flex'
                  "
                  small
                  :color="isSubscribed ? 'gray' : 'primary'"
                  @click="
                    {
                      {
                        isSubscribed
                          ? unsubscribe($route.params.channel_id)
                          : subscribe($route.params.channel_id)
                      }
                    }
                  "
                  >{{ isSubscribed ? 'Unsubscribe' : 'Subscribe' }}</v-btn
                >
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div class="mt-15">
          <p v-if="videos.length < 1">This channel has no content</p>
          <div v-else>
            <show-case :data="videos" />
          </div>
        </div>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import { Notify } from 'notiflix'
import ShowCase from '~/components/base/list/show_case.vue'

export default {
  components: { ShowCase },
  data: () => ({
    videos: [],
    channel: {},
    isSubscribed: false,
    subscriberCount: 0,
    page: 1,
  }),
  async fetch() {
    try {
      const channelData = await this.$axios.$get(
        `/channel/byid/${this.$route.params.channel_id}`
      )

      const videosData = await this.$axios.$get(
        `/channel/${this.$route.params.channel_id}/video`
      )

      const subscribers = await this.$axios.$get(
        `/channel/${this.$route.params.channel_id}/subscribe/subscribers`
      )

      const { count } = await this.$axios.$get(
        `/channel/${this.$route.params.channel_id}/subscribe/count`
      )

      this.channel = channelData
      this.videos = videosData
      this.subscriberCount = count
      this.isSubscribed = subscribers.some((subscribe) =>
        subscribe.subscribe.some((item) => item.userid === this.$auth.user.id)
      )
    } catch ({ response }) {
      Notify.failure(response.data.message)
    }
  },
  methods: {
    async subscribe(channelid) {
      try {
        await this.$axios.$post(`/channel/${channelid}/subscribe`)
        this.isSubscribed = true
        this.subscriberCount += 1
      } catch ({ response }) {
        Notify.failure(response.data.message)
      }
    },
    async unsubscribe(channelid) {
      try {
        await this.$axios.$delete(`/channel/${channelid}/subscribe`)
        this.isSubscribed = false
        this.subscriberCount -= 1
      } catch ({ response }) {
        Notify.failure(response.data.message)
      }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        try {
          this.page++
          const newVideos = this.$axios.$get('')
          this.videos.push(newVideos)
        } catch (error) {
          Notify.failure('error fetching data')
        }
      }, 500)
    },
  },
}
</script>
