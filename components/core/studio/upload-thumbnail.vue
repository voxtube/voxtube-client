<template>
  <div v-if='!isvideo'>
    <p v-if='title'>{{ title || `Upload` }}</p>
    <v-card
      v-if='url'
      height='250'
     
      width='100%'
      @mouseenter='thumbnailOverlay = true'
      @mouseleave='thumbnailOverlay = false'>
      <v-overlay
        absolute
        :value='thumbnailOverlay'
        
      >
        <v-btn
          class='mx-2'
          fab
          dark
          small
          color='primary'
          @click='closeThumbnailOverlay'
        >
          <v-icon dark color='white'>
            mdi-close
          </v-icon>
        </v-btn>
      </v-overlay>
      <v-img
        :src='url'
        height='250'
        width='100%'>
        <template #placeholder>
          <v-row
            class='fill-height ma-0'
            align='center'
            justify='center'
          >
            <v-progress-circular
              indeterminate
              color='grey'
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>
    <v-dialog
      v-else
      v-model='thumbnailDialog'
      persistent
      max-width='500'
    >
      <template #activator='{ on, attrs }'>
        <div
          class='thumb'
          v-bind='attrs'
          v-on='on'>
          <p>{{ label || `Upload Image` }}</p>
        </div>
      </template>
      <v-card>
        <v-card-title class='text-h5'>
          Upload Image
        </v-card-title>
        <v-card-text>
          <v-form ref='thumbnailForm'>
            <v-file-input
              v-model='thumbnail'
              :rules='[fieldRequired, thumbMaxSiz]'
              accept='image/png, image/jpeg, image/bmp'
              placeholder='Select Picture'
              prepend-icon='mdi-camera'
              label='Upload Thumbnail'
              show-size
            ></v-file-input>
          </v-form>

          <v-progress-linear
            v-show='thumbnailUploadProgress !== 0'
            v-model='thumbnailUploadProgress'
            :value='thumbnailUploadProgress'
            height='25'
          >
            <strong class='white--text'>{{ Math.ceil(thumbnailUploadProgress) }}%</strong>
          </v-progress-linear>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='primary'
            small
            text
            @click='closeThumbnailDialog'
          >
            Close
          </v-btn>
          <v-btn
            color='primary'
            small
            text
            :loading='thumbnailLoading'
            @click='uploadThumbnailDialogHandler'
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <p v-if='title'>{{ title || `Upload Video` }}</p>
    <v-card
      v-if='url'
      height='250'
      width='100%'
      @mouseenter='videoOverlay = true'
      @mouseleave='videoOverlay = false'>
      <v-overlay
        absolute
        :value='videoOverlay'
      >
        <v-btn
          class='mx-2'
          fab
          dark
          small
          color='primary'
          @click='closeVideoOverlay'
        >
          <v-icon dark color='white'>
            mdi-close
          </v-icon>
        </v-btn>
      </v-overlay>

      <video controls width='100%' height='250'>
        <source type='video/mp4' :src='videoUrl' />
      </video>

    </v-card>
    <v-dialog
      v-else
      v-model='videoDialog'
      persistent
      max-width='500'
    >
      <template #activator='{ on, attrs }'>
        <div
          class='thumb'
          v-bind='attrs'
          v-on='on'>
          <p>
            Upload Video
          </p>
        </div>
      </template>
      <v-card>
        <v-card-title class='text-h5'>
          Upload Video
        </v-card-title>
        <v-card-text>
          <v-form ref='videoForm'>
            <v-file-input
              v-model='video'
              show-size
              :rules='[fieldRequired]'
              accept='video/mp4,video/x-m4v,video/*'
              placeholder='Select video'
              prepend-icon='mdi-video'
              label='Upload Video'
            ></v-file-input>
          </v-form>

          <v-progress-linear
            v-show='videoUploadProgress !== 0'
            v-model='videoUploadProgress'
            :value='videoUploadProgress'
            height='25'
          >
            <strong class='white--text'>{{ Math.ceil(videoUploadProgress) }}%</strong>
          </v-progress-linear>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='primary'
            text
            small
            @click='closeVideoDialog'
          >
            Close
          </v-btn>
          <v-btn
            color='primary'
            text
            small
            :loading='videoLoading'
            @click='uploadVideoDialogHandler'
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>
import { Report } from 'notiflix'
import rules from '../../../mixins/rules'

export default {
  name: 'UploadThumbnail',
  mixins: [rules],
  props: {
    value: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    isvideo: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      thumbnailOverlay: false,
      videoOverlay: false,
      thumbnailUploadProgress: 0,
      videoUploadProgress: 0,
      thumbnailLoading: false,
      videoLoading: false,
      thumbnailDialog: false,
      videoDialog: false,
      thumbnailId: '',
      videoId: '',
      thumbnail: null,
      video: null,
      thumbnailUrl: '',
      videoUrl: ''
    }
  },
  methods: {
    closeThumbnailOverlay() {
      this.thumbnailUrl = ''
      this.thumbnailOverlay = false
      this.$emit('input', this.thumbnailUrl)
    },
    closeVideoOverlay() {
      this.formData.videoUrl = ''
      this.videoOverlay = false
      this.$emit('input', this.videoUrl)
    },
    closeThumbnailDialog() {
      this.thumbnailUploadProgress = 0
      this.thumbnail = null
      this.thumbnailDialog = false
    },
    closeVideoDialog() {
      this.videoUploadProgress = 0
      this.video = null
      this.videoDialog = false
    },
    async uploadThumbnailDialogHandler() {
      if (!this.$refs.thumbnailForm.validate()) return

      this.thumbnailLoading = true
      try {
        const formData = new FormData()
        formData.append('image', this.thumbnail)
        const headers = { 'Content-Type': 'multipart/form-data' }
        const response = await this.$axios.$post(
          `${process.env.UPLOAD_SERVER}/upload/image`,
          formData,
          {
            headers,
            onUploadProgress: function(progressEvent) {
              this.thumbnailUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            }.bind(this)
          }
        )

        // eslint-disable-next-line no-console
        console.log('Image REsponse', response)
        this.thumbnailUrl = response.secure_url
        this.thumbnailId = response.public_id
        this.thumbnailLoading = false
        this.$emit('input', this.thumbnailUrl)
        this.$emit('setid', this.thumbnailId)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('error', err.message)
        // eslint-disable-next-line no-console
        console.log('error', err.response.data)
        Report.failure('Error', err.response.data, 'Ok')
        this.thumbnailLoading = false
      }

      this.closeThumbnailDialog()
    },

    async uploadVideoDialogHandler() {
      if (!this.$refs.videoForm.validate()) return

      this.videoLoading = true
      try {
        const formData = new FormData()
        formData.append('video', this.video)
        const headers = { 'Content-Type': 'multipart/form-data' }
        const response = await this.$axios.$post(
          `${process.env.UPLOAD_SERVER}/upload/video`,
          formData,
          {
            headers,
            onUploadProgress: function(progressEvent) {
              this.videoUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            }.bind(this)
          }
        )

        this.videoUrl = response.secure_url
        this.videoId = response.public_id
        this.videoLoading = false
        this.$emit('input', this.videoUrl)
        this.$emit('setid', this.videoId)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('error', err.message)
        // eslint-disable-next-line no-console
        console.log('error', err.response.data)
        Report.failure('Error', err.response.data, 'Ok')
        this.videoLoading = false
      }
      this.closeVideoDialog()
    }
  }
}
</script>

<style scoped>
.thumb {
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px grey dotted;
  border-radius: 10px;
  background: rgba(227, 221, 221, 0.99);
}

.thumb:hover {
  cursor: pointer;
  background: grey;
}
</style>
