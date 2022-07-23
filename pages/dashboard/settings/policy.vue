<template>
  <div>
    <v-skeleton-loader v-if='$fetchState.pending' type='card' />
    <v-container v-else>
      <p class='poppins mini-header white--text'>Policy</p>
      <client-only>
        <TipTapEditor v-model='policy' />
      </client-only>
      <div class='d-flex justify-end mt-5'>
        <v-btn :to='`/dashboard/settings`' color='error' class='me-5 baloo-bai'>
          Cancel
        </v-btn>
        <v-btn color='primary' :loading='loading' class="baloo-bai" @click='update'>
          Update
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import {Notify, Report} from 'notiflix'
import TipTapEditor from '~/components/core/Editor'

export default {
  name: 'PolicyPage',
  components: { TipTapEditor },
  layout: 'dashboard',
  data: () => ({
    policy: '',
    loading: false,
  }),
  async fetch() {
    try {
      this.policy = (await this.$axios.$get("/policy")).content
    } catch ({response}) {
      // eslint-disable-next-line no-console
      console.log(response)
      return Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'Policy'
  },
  methods: {
    async update() {
      try {
        this.loading = true
        await this.$axios.$patch('/policy', {
          content: this.policy
        })
        this.loading = false
        Notify.success('Updated Successfully')
      } catch ({response}) {
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
