<template>
  <div>
    <v-skeleton-loader v-if='$fetchState.pending' type='card'/>
    <v-container v-else>
      <p>General Settings</p>
    </v-container>
  </div>
</template>

<script>
import rules from '~/mixins/rules'

export default {
  name: 'AdminSettingsPage',
  mixins: [rules],
  layout: 'dashboard',
  data: () => ({
    valid: false,
    loading: false,
    formData: {
      "test_fee": 0,
      "test_percentage": 0,
    }
  }),
  async fetch() {
  },
  head: {
    title: 'Settings'
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
