<template>
  <v-container>
    <p class="title">Users</p>
    <div v-if="$fetchState.pending">
      <v-skeleton-loader type="card" />
    </div>
    <users-table v-else />
  </v-container>
</template>

<script>
import { Report } from 'notiflix'
import UsersTable from '~/components/core/dashboard/UsersTable.vue'

export default {
  name: 'AdminUserPage',
  components: { UsersTable },
  layout: 'dashboard',

  async fetch() {
    await this.$store.dispatch('dashboard/users/getAllUsers')
  },
  head: {
    title: 'Users',
  },
  methods: {
    dev(item) {
      Report.success('Coming soon', 'Feature under core development', 'Ok')
    },
  },
}
</script>
