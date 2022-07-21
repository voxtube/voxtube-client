<template>
  <v-app dark>
    <!--    App bar for anonymouse users -->
    <!--    <v-app-bar app elevation='1' clipped-left color='white'>-->
    <!--      <nuxt-link to='/'>-->
    <!--        <v-img src='/img/purplelogo.png' height='80' width='150' />-->
    <!--      </nuxt-link>-->
    <!--      <v-spacer />-->
    <!--      <v-btn color='primary' text depressed dark link to='/auth/login'>Sign In</v-btn>-->
    <!--      <v-btn color='primary' text depressed dark link to='/auth/signup'>Sign Up</v-btn>-->
    <!--    </v-app-bar>-->
    <!-- Main   -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
.bg {
  background-image: linear-gradient(to bottom right, #973cbf, #fead51);
}
</style>
