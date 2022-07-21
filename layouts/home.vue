<template>
  <v-app dark>
  <appbar />
  
    <v-main>
    
        <Nuxt />
      
    </v-main>
  </v-app>
</template>

<script>
import appbar from '~/components/appbar/appBar.vue'
export default {
  name: 'HomeLayout',
  components: { appbar },
  
}
</script>

<style scoped>

</style>
