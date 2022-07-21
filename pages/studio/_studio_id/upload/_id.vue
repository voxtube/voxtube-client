<template>
  <v-container>
    <!--    <div v-if='error'><p class='display-1'>{{ error_message }}</p></div>-->
    <v-skeleton-loader v-if='$fetchState.pending' type='card' />
    <div v-else>
      <p class='white--text'>{{ formTitle }}</p>
      <v-form ref='form'
              v-model='valid'
              lazy-validation
              @submit.prevent='uploadVideo'>

        <v-row>
          <!--    title col    -->
          <v-col cols='12' sm='6'>
            <v-text-field v-model='formData.title'
                          :rules='[fieldRequired, titleMin]'
                          label='Title'
                          placeholder='Enter Title...'
                          dense
                          dark
                          outlined />
          </v-col>

          <!--    category col    -->
          <v-col cols='12' sm='6'>
            <v-select
              v-model="formData.categoryid"
              :items='categories'
              :value="formData.categoryid"
              item-text="name"
              item-value="id"
              :rules='[categoryField]'
              prepend-inner-icon='mdi-folder-multiple-image'
              clearable
              label='Categories'
              placeholder='Select Category'
              aria-label='Select category'
              dense
              dark
              outlined
            ></v-select>
          </v-col>

          <!--        upload image col-->
          <v-col cols='12' sm='6' md='6'>
            <upload-thumbnail
              v-model='formData.thumbnailUrl'
              :url='formData.thumbnailUrl'
              @setid='setThumbnailId'
            />
          </v-col>

          <!--        upload video col-->
          <v-col cols='12' sm='6' md='6'>
            <upload-thumbnail
              v-model='formData.videoUrl'
              :url='formData.videoUrl'
              isvideo
              @setid='setVideoId'
            />
          </v-col>

          <!--    description col    -->
          <v-col cols='12'>
            <v-textarea v-model='formData.description' dark label='Description' outlined clearable hint='[Optional]' />
          </v-col>

          <!--    Price    -->
          <v-col cols='12' sm='6'>
            <v-text-field v-model.number='formData.price'
                          prepend-inner-icon='mdi-currency-ngn'
                          label='Price'
                          type='number'
                          placeholder='Enter Video Price...'
                          dense
                          dark
                          outlined />
          </v-col>

          <!--    Rent Price    -->
          <v-col cols='12' sm='6'>
            <v-text-field v-model.number='formData.rent_price'
                          prepend-inner-icon='mdi-currency-ngn'
                          label='Rent Price'
                          type='number'
                          placeholder='Enter Video Rent Price...'
                          dense
                          dark
                          outlined />
          </v-col>

          <!--    Free Video Choice Box    -->
          <v-col cols='6'>
            <v-checkbox v-model='formData.free' dark label='Free' dense />
          </v-col>

          <!--    Is Published Choice Box    -->
          <v-col cols='6'>
            <v-checkbox v-model='formData.isPublish' dark label='Publish' dense />
          </v-col>

          <!--   Actions     -->
          <v-col cols='12' class='mt-7'>
            <v-btn width='49%' color='secondary' @click='$router.push(contentPage)'>
              <v-icon dark left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              type='submit'
              width='49%'
              dark
              color='primary'
              :loading='loading'>
              <v-icon left>mdi-cloud-upload</v-icon>
              {{ $route.params.id ? `Edit` : 'Upload' }}
            </v-btn>
          </v-col>

        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { Report } from 'notiflix'
import rules from '~/mixins/rules'
import UploadThumbnail from '~/components/core/studio/upload-thumbnail'

export default {
  name: 'UploadPage',
  components: { UploadThumbnail },
  mixins: [rules],
  layout: 'studio',
  data() {
    return {
      contentPage: `/studio/${this.$route.params.studio_id}/content`,
      formTitle: this.$route.params.id ? 'Edit Video' : 'Upload Video',
      valid: false,
      loading: false,
      error: false,
      error_message: '',
      category: null,
      categories: [],
      formData: {
        title: '',
        thumbnailUrl: '',
        thumbnailId: '',
        categoryid: '',
        videoUrl: '',
        videoId: '',
        description: '',
        price: 0,
        rent_price: 0,
        free: false,
        isPublish: true
      }
    }
  },
  async fetch() {
    try {
      // fetching categories
      this.categories = await this.$axios.$get(`/category`)

      // if there is an id that means we are editing then we need t fetch the video data
      if (this.$route.params.id) {
        this.formData = await this.$axios.$get(`/channel/${this.$route.params.studio_id}/video/${this.$route.params.id}`)
      }
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('Response', response.data.message)
      this.error = true
      this.error_message = response.data.message
    }
  },
  head: {
    title: 'Upload'
  },
  methods: {
    setThumbnailId(val) {
      this.formData.thumbnailId = val
    },
    setVideoId(val) {
      this.formData.videoId = val
    },
    uploadTester(value){
      // eslint-disable-next-line no-console
      console.log("FormData", this.formData)
      // eslint-disable-next-line no-console
      console.log("event", value)
      // eslint-disable-next-line no-console
      console.log("category", this.category)
    },
    async uploadVideo() {
      if (!this.$refs.form.validate()) return

      if (!this.formData.thumbnailUrl) return Report.failure('Error', 'Thumbnail required', 'Ok')
      if (!this.formData.videoUrl) return Report.failure('Error', 'Video required', 'Ok')

      this.loading = true

//       // eslint-disable-next-line no-console
//       console.log("Form Data", this.formData)
//       // eslint-disable-next-line no-console
//       console.log("Form Data", this.category)
//
// return
      // if an id exist that means the video is edited video
      // then a patch request will be send
      if (this.$route.params.id) {
        await this.$axios.$patch(`/channel/${this.$route.params.studio_id}/video/${this.$route.params.id}`, this.formData)
        await this.$router.push(this.contentPage)
      } else {
        try {
          await this.$axios.$post(`/channel/${this.$route.params.studio_id}/video`, this.formData)
          await this.$router.push(this.contentPage)
        } catch ({ response }) {
          // eslint-disable-next-line no-console
          console.log(response.data)
          this.loading = false
          return Report.failure('Error', response.data.message, 'Ok')
        }
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
