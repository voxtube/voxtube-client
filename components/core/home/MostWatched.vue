<template>
  <div class="primary">
    <v-container class="">
      <v-row>
        <v-col cols="12" md="12">
          <div class="text-center">
            <p class="font-weight-bold white--text text-h4 mt-8">
              Most Watched
            </p>
            <p class="text-center accent--text text-subtitle-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              earum magni perferendis itaque
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
            <v-slide-item v-for="item in vidoes" :key="item.title">
              <v-hover v-slot="{ hover }">
                <div rounded="lg" :class="{ 'on-hover': hover }">
                  <v-img
                    class="ma-4"
                    width="150"
                    contain
                    height="200"
                    style="cursor: pointer"
                    :src="item.img"
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
      vidoes: [
        {
          channel: { name: 'ultra' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Hello World',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ2tWq4FFUZvo67qmHh4zxBY87xdHhdwcJ2g&usqp=CAU',
          price: 150,
          category: {
            id: 'ckxbngcfe08090w0wgq8d5mgw',
            name: 'demo',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          free: false,
        },
        {
          channel: { name: 'Mj' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Fast 10',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBV8rK_dluA4rcRQwowsdXB7JuonBmPP_dZg&usqp=CAU',
          price: 150,
          free: false,
          category: {
            id: 'ckxbngcfe08090w0wq8d5mgw',
            name: 'anime/cartton',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
        },
        {
          channel: { name: 'Ismael' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Konso Suba',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD0qNIJtyObQ0ZGCyHntrAnx9YUK0b8PjVzg&usqp=CAU',
          category: {
            id: 'ckxbngcfe08090wgq8d5mgw',
            name: 'Romance',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          free: true,
        },
        {
          channel: { name: 'Priscillia' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Captain Marvel',
          category: {
            id: 'ckxbngcfe08090w0wgq8d5mgw',
            name: 'Love',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkEwt1869PSEmq0sE2MRkpJFr1qf3lM2fVtA&usqp=CAU',

          free: true,
        },
        {
          channel: { name: 'Ismael' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Gravity',
          category: {
            id: 'ckxbngcfewgq8d5mgw',
            name: 'demo',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQl6ujTFm_7Ycbuu9OMtMkDMrIoXom51CXdA&usqp=CAU',
          free: true,
        },
        {
          channel: { name: 'Mj' },
          _count: { view: 52 },
          createdAt: Date.now(),
          category: {
            id: 'ckxbngcfe08090w0wgq8d5m6',
            name: 'demo',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          title: 'Erased',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReELEQ-I2_JPFMYvdnt-xh0_EAUHSFF_QBYg&usqp=CAU',
          price: 150,
          free: false,
        },
        {
          channel: { name: 'Pro' },
          _count: { view: 52 },
          category: {
            id: 'ckxbngcfe08090w0w77ujgq8d5mgw',
            name: 'demo',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
          createdAt: Date.now(),
          title: 'Dc',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuAHafGSg_YX1j7wWepyDMAOaqu6mWZZH6sQ&usqp=CAU',
          price: 150,
          free: false,
        },
        {
          channel: { name: 'Ismael' },
          _count: { view: 52 },
          createdAt: Date.now(),
          title: 'Freedom',
          img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1573101130',
          price: 150,
          free: false,
          category: {
            id: 'ckxbngcf90w0wgq8d5mgw',
            name: 'Action/adventure',
            description: '',
            createdAt: '2021-12-18T10:00:20.714Z',
          },
        },
      ],
      loading: false,
    }
  },

  methods: {
    async fetch() {
      this.videos = await this.$axios.$get('/video')
    },

    go() {},
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
