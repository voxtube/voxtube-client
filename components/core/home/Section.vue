<template>
  <div class="primary">
    <v-container class="">
      <v-row>
        <v-col cols="12" md="12">
          <div class="text-center">
            <p class="font-weight-bold white--text text-h4 mt-8">
              {{ title }}
            </p>
            <p class="text-center accent--text text-subtitle-1">
              {{ subtitle }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="12" class="px-0 mx-0">
          <div v-if="loading" class="text-center">
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </div>
          <v-slide-group v-model="model" dark show-arrows class="ma-0">
            <v-slide-item v-for="item in items" :key="item.id">
              <v-hover v-slot="{ hover }">
                <div rounded="lg" :class="{ 'on-hover': hover }">
                  <v-img
                    class="ma-4"
                    width="150"
                    contain
                    height="200"
                    :src="video.thumbnailUrl"
                    @click="go(video)"
                  >
                  </v-img>
                  <span
                    class="white--text d-flex align-center justify-center"
                    >{{ video.title }}</span
                  >
                </div>
              </v-hover>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      required: true,
      type: String,
    },
    video: {
      required: true,
      type: Object,
    },
  },

  method: {
    go(item) {
      if (item.type === 'restricted') {
        this.$router.push('/buy/' + item.id)
      } else {
        this.$router.push(`/videoView/${item.id}`)
      }
    },
  },
}
</script>

<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
