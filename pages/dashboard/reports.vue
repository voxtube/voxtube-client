<template>
  <v-container>
    <p class="title">Reports</p>
    <div v-if="$fetchState.pending">
      <v-skeleton-loader type="card" />
    </div>

    <v-data-table
      :headers="headers"
      :items="reports"
      :items-per-page="5"
      class="elevation-1"
    >
      <!--      video thumbnail image sluts-->
      <template #[`item.video.thumbnailUrl`]="{ item }">
        <v-img
          class="ma-5"
          :src="item.video.thumbnailUrl"
          height="50"
          width="50"
        >
        </v-img>
      </template>

      <template #[`item.video.title`]="{ item }">
        <nuxt-link :to="`/watch/${item.video.id}`">{{
          item.video.title
        }}</nuxt-link>
      </template>

      <!--    Actions slut      -->
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="flagReportedVideo(item)">
          mdi-flag
        </v-icon>
        <v-icon small @click="deleteReport(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { Confirm, Report } from 'notiflix'

export default {
  name: 'AdminReportsPage',
  layout: 'dashboard',
  data: () => ({
    headers: [
      { text: 'Thumbnail', value: 'video.thumbnailUrl' },
      { text: 'Title', value: 'video.title' },
      { text: 'Reason', value: 'content' },
      { text: 'Reporter', value: 'user.username' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  async fetch() {
    await this.$store.dispatch('dashboard/reports/getAllReports')
  },
  head: {
    title: 'Reports',
  },
  computed: {
    ...mapState('dashboard/reports', ['error_message', 'reports', 'error']),
  },
  methods: {
    dev(item) {
      Report.success('Coming soon', 'Feature under core development', 'Ok')
    },
    deleteReport(item) {
      Confirm.show(
        'Delete Report',
        'Are you sure you want to delete this report? Make sure you have reviewed it before deleting, \nThis action cannot be undone!',
        'Yes',
        'No',
        async () => {
          try {
            await this.$store.dispatch('dashboard/reports/deleteReport', item)
            if (this.$store.state.dashboard.reports.error_message)
              Report.failure(
                'Error',
                this.$store.state.dashboard.reports.error_message,
                'Ok',
                async () => {
                  await this.$store.commit('dashboard/reports/SET_ERROR')
                }
              )
          } catch ({ response }) {
            Report.failure('Error', response.data.message, 'Ok')
          }
        },
        () => {}
      )
    },
    flagReportedVideo(item) {
      Confirm.show(
        'Flag Video as Inappropriate',
        'Are you sure you want to flag the video?',
        'Yes',
        'No',
        async () => {
          try {
            // unpublish video
            await this.$axios.$patch(
              `/channel/${item.video.channelid}/video/${item.videoid}`,
              { isPublish: false }
            )

            // TODO: set it as inappropriate

            // Delete it from reported videos
            await this.$store.dispatch('dashboard/reports/deleteReport', item)
          } catch ({ response }) {
            Report.failure('Error', response.data.message, 'Ok')
          }
        },
        () => {}
      )
    },
  },
}
</script>

<style scoped></style>
