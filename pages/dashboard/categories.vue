<template>
  <v-container>
      <p class='title white--text'>Categories</p>
    <v-skeleton-loader v-if='$fetchState.pending' type='card' />
    <CategoriesTable v-else />
    <CategoryFloatingBtn />
  </v-container>
</template>

<script>
import CategoriesTable from '~/components/core/dashboard/CategoriesTable'
import CategoryFloatingBtn from '~/components/core/dashboard/CategoryFloatingBtn'

export default {
  name: 'DashboardCategoriesPage',
  components: { CategoryFloatingBtn, CategoriesTable },
  layout: 'dashboard',
  data: () => ({}),
  async fetch() {
    await this.$store.dispatch('dashboard/categories/getAllCategories')
  },
  head: {
    title: 'Categories'
  }
}
</script>

<style scoped>

</style>
