<template>
  <div>
    <v-skeleton-loader v-if="$fetchState.pending" type="card" />
    <div v-else>
      <span class="text-title mb-2 accent--text">Recommended</span>
      <div class="cutom__card--overflow">
        <v-list
          v-for="item in videos"
          :key="item.id"
          class="py-1"
          color="secondary"
        >
          <v-list-item active-class="" class="px-2" @click="go(item)">
            <v-list-item-avatar
              color="blue"
              tile
              width="150px"
              height="80"
              horizontal
            >
              <v-img :src="item.thumbnailUrl">
                <v-icon color="blue">mdi-play-circle</v-icon>
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content class="white--text">
              <v-list-item-title class="font-weight-normal">{{
                item.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="white--text text-caption my-1">{{
                item.channel.name
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="white--text text-caption"> {{ item._count.view }} views . {{
                new Date(item.createdAt).toDateString("en-US")
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider color="blue"></v-divider>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendedVideosCard',
  data: () => ({
    videos: [],
  }),

  async fetch() {
    this.videos = await this.$axios.$get('/video')
  },
}
</script>

<style scoped>
.cutom__card--overflow {
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
}
</style>
