<template>
  <div class="primary">
    <v-container class="">
      <v-row>
        <v-col cols="12" md="12" class="mb-0">
          <div class="text-center">
<!--            <p class="font-weight-bold white&#45;&#45;text text-h4 mt-8">Trending</p>-->
<!--            <p class="text-center accent&#45;&#45;text text-subtitle-1 mb-0">-->
<!--             Trending now in VoxTube-->
<!--            </p>-->
          </div>
        </v-col>
        <v-col cols="12" md="12" class="px-0 mx-0">
          <div v-if="loading" class="text-center">
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </div>
          <p class="font-weight-bold white--text text-center text-h4 mt-8">Trending</p>
          <p class="text-center accent--text text-subtitle-1 mb-0">
            Trending now in VoxTube
          </p>
          <v-slide-group v-model="model" dark show-arrows class="ma-0">
            <v-slide-item v-for="item in videos" :key="item.id">
              <v-hover v-slot="{ hover }">
                <div rounded="lg" :class="{ 'on-hover': hover }">
                  <v-img
                    class="ma-4"
                    width="150"
                    contain
                    height="200"
                    style="cursor: pointer"
                    :src="item.thumbnailUrl"
                    @click="go(item)"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="
                          custom_hover
                          d-flex
                          align-center
                          justify-center
                          transition-fast-in-fast-out
                          v-card--reveal
                          white--text
                        "
                      >
                        <v-icon color="blue" x-large>mdi-play-circle</v-icon>
                      </div>
                    </v-expand-transition>
                    <div class="custom_glass px-1">
                      <p class="text-body-2 my-0">{{ item.title }}</p>

                      <div class="d-flex justify-space-between ma-0">
                        <p class="text-caption">
                          {{ item.category.name }}
                        </p>

                        <div class="ma-0">
                          <p v-if="item.free === true" class="text-caption blue--text font-weight-bold">
                            Free
                          </p>
                          <p v-if="item.free === false" class="text-caption">
                            ${{ item.price }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </v-img>
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
  data() {
    return {
      model: null,
      items: [],
      videos: [],
      loading: false,
    }
  },
  async fetch() {
    this.videos = await this.$axios.$get('/video/analytics/trending')
    // eslint-disable-next-line no-console
    console.log('videos', this.videos)
  },
  methods: {
    go() {

    },
  },
}
</script>

<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.custom_hover {
  height: 100%;
  background: rgba(74, 144, 226, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.custom_glass {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px;
  opacity: 0.8;
  background: rgba(155, 155, 155, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
