<template>
  <v-container>
    <div v-if='$fetchState.pending'>
      <v-skeleton-loader type='card' />
    </div>
    <div v-else>
      <p class="white--text">Settings</p>
      <p class='white--text subtitle-1'>General Settings</p>
      <v-form ref='form'
              v-model='valid'
              lazy-validation
              @submit.prevent='saveUserInfo'>

        <v-row>

          <!--        channel name section ...-->
          <v-col cols='12' sm='6' md='6'>
            <v-text-field v-model='formData.name'
                          :rules='[fieldRequired, titleMin]'
                          type='text'
                          solo
                          name='channelname'
                          label='Channel Name'
                          placeholder='Enter Channel Name...'
                          dense
                          outlined />
          </v-col>

          <!--        description name section ...-->
          <v-col cols='12' sm='6' md='6'>
            <v-text-field v-model='formData.description'
                          :rules='[]'
                          solo
                          type='text'
                          name='channel_description'
                          label='Channel Description'
                          placeholder='Enter Channel Description...'
                          hint='[Optional field]'
                          dense
                          outlined />
          </v-col>

          <!--        channel image col-->
          <v-col cols='12' md='6'>
            <UploadThumbnail v-model='formData.channel_img' :url='formData.channel_img' />
          </v-col>

          <!--        cover image col-->
          <v-col cols='12' md='6'>
            <UploadThumbnail v-model='formData.cover_img' :url='formData.cover_img' />
          </v-col>

          <v-col cols='12' class='mt-7'>
            <v-btn width='49%' color='primary' large @click='$router.push("dashboard")'>
              <v-icon dark left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              type='submit'
              width='49%'
              dark
              large
              color='primary'
              :loading='loading'>
              <v-icon left>mdi-cloud-upload</v-icon>
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-divider class='mt-10' />
      <p class='subtitle-1 white--text mt-5'>Danger Zone</p>
      <v-btn depressed color='error' dark to='settings/delete'>
        Delete Channel
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { Report } from 'notiflix'
import rules from '~/mixins/rules'
import UploadThumbnail from '~/components/core/studio/upload-thumbnail'

export default {
  name: 'StudioSettingsPage',
  components: { UploadThumbnail },
  mixins: [rules],
  layout: 'studio',
  data() {
    return {
      loading: false,
      valid: false,
      profile_img: null,
      cover_img: null,
      formData: {
        name: '',
        description: '',
        channel_img: '',
        cover_img: ''
      }
    }
  },
  async fetch() {
    try {
      const channelData = await this.$axios.$get(`/channel/byid/${this.$route.params.studio_id}`)
      delete channelData.user
      this.formData = channelData
    } catch ({response}) {
      // eslint-disable-next-line no-console
      console.log(response)
    }

  },
  head: {
    title: 'Settings'
  },
  methods: {
    async saveUserInfo() {
      if (!this.$refs.form.validate()) return

      if (!this.formData.channel_img) return Report.failure('Error', 'Channel Image required', 'Ok')
      if (!this.formData.cover_img) return Report.failure('Error', 'Cover Image required', 'Ok')


      try {
        this.loading = true

        await this.$axios.$patch(`/channel/${this.$route.params.studio_id}`, this.formData)
        this.loading = false
        await this.$router.push('dashboard')
      } catch ({ response }) {
        // eslint-disable-next-line no-console
        console.log(response)
        this.loading = false
        return Report.failure('Error', response.data.message, 'Ok')
      }
    }
  }
}
</script>

<style scoped>
</style>
