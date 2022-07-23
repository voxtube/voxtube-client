<template>
  <div>
    <v-skeleton-loader v-if='$fetchState.pending' type='card' />
    <v-container v-else>
      <p class='poppins mini-header white--text'>Terms And Condition</p>
      <client-only>
        <TipTapEditor v-model='tos' />
      </client-only>
      <div class='d-flex justify-end mt-5'>
        <v-btn color='error' class='me-5 baloo-bai' to='/dashboard/settings'>
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
  name: 'TosPage',
  components: { TipTapEditor },
  layout: 'dashboard',
  data: () => ({
    tos: '',
    loading: false,
  }),
  async fetch() {
    try {
      this.tos = (await this.$axios.$get("/tos")).content
    } catch ({response}) {
      // eslint-disable-next-line no-console
      console.log(response)
      return Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'Tos'
  },
  methods: {
    async update() {
      try {
        this.loading = true
        await this.$axios.$patch('/tos', {
          content: this.tos
        })
        this.loading = false
        Notify.success('Updated Successfully',
          {
            position: 'bottom-right',
            timeout: 2000,
            fontFamily: 'baloo bhai'
          }
        )
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
