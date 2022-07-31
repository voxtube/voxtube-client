<template>
  <v-row>
    <v-col cols="12">
      <v-row class="mt-4">
        <v-col cols="10" md="6" class="py-0 pr-0">
          <v-text-field
            v-model="global"
            label="Search videos here"
            prepend-inner-icon="mdi-magnify"
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="2" md="6" class="px-0">
          <v-menu offset-y :close-on-content-click="false">
            <template #activator="{ on, attrs }">
                  <span class="icon-text">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon :color="filter ? 'white lighten-3' : 'white'">
                        mdi-filter-variant
                      </v-icon>
                    </v-btn>
                  </span>
            </template>
            <div
              style="background-color: white; width: 200px; padding: 10px"
            >
              <v-select
                v-model="filter"
                color
                dense
                outlined
                item-text="name"
                item-value="name"
                :items="categories"
                label="Filter by categories"
              ></v-select>

              <v-btn small text color="primary" @click="filter = ''"
              >Clear</v-btn
              >
            </div>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      v-for="item in filtrVideo"
      :key="item.id"
      cols="12"
      md="3"
      class="text-center py-0"
    >
      <div v-if="loading" class="text-center">
        <v-progress-circular
          indeterminate
          color="white"
          size="50"
        ></v-progress-circular>
      </div>

      <v-hover v-slot="{ hover }">
        <div rounded="lg" :class="{ 'on-hover': hover }">
          <v-img
            class="my-3"
            style="cursor: pointer; border-radius: 5px"
            dark
            height="280"
            width="100%"
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
                  <p
                    v-if="item.free === true"
                    class="text-caption blue--text font-weight-bold"
                  >
                    Free
                  </p>
                  <p v-if="item.free === false" class="text-caption">
                    {{ item.price }}
                  </p>
                </div>
              </div>
            </div>
          </v-img>
        </div>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Videocols",
  props: {
    videos: {
      required: true,
      type: Array,
      default: () => ([])
    },
    categories: {
      required: true,
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    model: null,
    items: [],
    loading: false,
    global: '',
    filter: '',
  }),
  computed: {
    filtrVideo() {
      const conditions = []
      if (this.global) {
        conditions.push(this.search)
      }
      if (this.filter) {
        conditions.push(this.vidfilter)
      }
      if (conditions.length > 0) {
        return this.videos.filter((pr) => {
          return conditions.every((condition) => {
            return condition(pr)
          })
        })
      }

      return this.videos
    },
  },

  methods: {
    vidfilter(item) {
      return item.category.name
        .toLowerCase()
        .includes(this.filter.toLowerCase())
    },
    search(item) {
      return item.title.toLowerCase().includes(this.global.toLowerCase())
    },
    go(item) {
      this.$router.push('/watch/' + item.id)
    },
  },
}
</script>

<style scoped>
.custom_hover {
  height: 100%;
  background: rgba(74, 144, 226, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.custom_glass {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 45px;
  opacity: 8px;
  background: rgba(155, 155, 155, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
