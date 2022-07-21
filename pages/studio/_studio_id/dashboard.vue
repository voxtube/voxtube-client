<template>
  <div>
  <v-container>
    <KStudioDashboardCards :studio-id='$route.params.studio_id' />
  </v-container>
  </div>
</template>

<script>
  import KStudioDashboardCards from '~/components/core/cards/K-Studio-Dashboard-Cards'
  export default {
    name: "StudioDashBoard",
    components: { KStudioDashboardCards },
    layout: 'studio',
    data: () => ({}),
    head: {
      title: "Dashboard",
    }
  }
</script>
