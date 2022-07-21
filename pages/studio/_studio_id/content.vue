<template>
  <v-container>
    <v-skeleton-loader v-if='$fetchState.pending' type='card' />
    <div v-else>
      <p class='title white--text'>Content Page</p>

      <div class='d-flex'>
      <v-row>
        <v-col sm='12' md='6'>
          <v-text-field
            v-model='search'
            type='text'
            dense
            aria-label='search'
            placeholder='search ...'
            dark
            append-icon='mdi-magnify'
            outlined/>
        </v-col>
      </v-row>
        <v-btn dark to='upload' color='primary'>
          <v-icon>mdi-plus</v-icon>
          Upload
        </v-btn>
      </div>
      <v-data-table
        :headers='headers'
        :items='videos'
        :items-per-page='5'
        :search='search'
        class='elevation-1 secondary'
        dark
      >

        <!--      thumbnails sluts-->
        <template #[`item.thumbnailUrl`]='{ item }'>
          <v-img
            class='ma-5'
            :src='item.thumbnailUrl'
            height='100'
            width='100'>
            <template #placeholder>
              <v-row
                class='fill-height ma-0'
                align='center'
                justify='center'
              >
                <v-progress-circular
                  indeterminate
                  color='grey lighten-5'
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>

        <!--      free sluts-->
        <template #[`item.free`]='{ item }'>
          <v-checkbox v-model='item.free' :value='item.free' @change='updateFree(item)' />
        </template>

        <!--      published sluts-->
        <template #[`item.isPublish`]='{ item }'>
          <v-checkbox v-model='item.isPublish' :value='item.isPublish' @change='updatePublished(item)' />
        </template>

        <!--      published sluts-->
        <template #[`item.price`]='{ item }'>
          <p>₦{{ item.price }}</p>
        </template>

        <!--    Actions slut      -->
        <template #[`item.actions`]='{ item }'>
          <v-icon
            small
            class='mr-2'
            @click='editItem(item)'
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click='deleteItem(item)'
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import { Report, Confirm } from 'notiflix'

export default {
  name: 'ContentPage',
  layout: 'studio',
  data() {
    return {
      videos: [],
      loading: false,
      deleteDialog: false,
      search: '',
      headers: [
        { text: 'Thumbnail', value: 'thumbnailUrl' },
        { text: 'Title', value: 'title' },
        { text: 'Category', value: 'category.name' },
        { text: 'Free', value: 'free' },
        { text: 'Published', value: 'isPublish' },
        { text: 'Price (₦)', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  async fetch() {
    try {
      this.loading = true
      this.videos = await this.$axios.$get(`/channel/${this.$route.params.studio_id}/video`)
      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'Content'
  },
  methods: {
    async updateFree(item) {
      try {
        await this.$axios.$patch(`/channel/${this.$route.params.studio_id}/video/${item.id}`, {
          free: !!item.free
        })
      } catch ({ response }) {
        // eslint-disable-next-line no-console
        console.log('error response', response.data.message)
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
    async updatePublished(item) {
      try {
        await this.$axios.$patch(`/channel/${this.$route.params.studio_id}/video/${item.id}`, {
          isPublish: !!item.isPublish
        })
      } catch ({ response }) {
        // eslint-disable-next-line no-console
        console.log('error response', response.data.message)
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
    editItem(item) {
      this.$router.push(`upload/${item.id}`)
    },
    deleteItem(item) {
      Confirm.show(
        'Delete Item',
        'Are you sure you want to delete this item\nThis action cannot be undone!',
        'Yes',
        'No',
        async () => {
          try {
            await this.$axios.$delete(`/channel/${this.$route.params.studio_id}/video/${item.id}`)
            this.videos = this.videos.filter(video => video.id !== item.id)
          } catch ({ response }) {
            Report.failure('Error', response.data.message, 'Ok')
          }
        },
        () => {
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
