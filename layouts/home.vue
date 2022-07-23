<template>
  <v-app dark>
    <appbar/>

    <v-main>

      <Nuxt/>

      <Footer/>
    </v-main>
  </v-app>
</template>

<script>
import appbar from '~/components/appbar/appBar.vue'
import Footer from "~/components/core/home/Footer";

export default {
  name: 'HomeLayout',
  components: {Footer, appbar},

}
</script>

<style scoped>

</style>
