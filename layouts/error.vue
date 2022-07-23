<template>
  <v-app dark class='poppins'>
    <div
      v-if='error.statusCode === 404'
      class='d-flex flex-column align-center'>
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777178/mid/illustrations/404_jlhja8.png"
        height='55%' width='55%'/>
      <p>{{ pageNotFound }}</p>
    </div>
    <div
      v-else-if='error.statusCode === 401'
      class='d-flex flex-column align-center'>
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777178/mid/illustrations/access_denied_odepqr.png"
        height='48%'
        width='48%'/>
      <p class='baloo-bai'>{{ error.message || `Unauthorised` }}</p>
    </div>
    <div
      v-else-if='error.statusCode === 403'
      class='d-flex flex-column align-center'>
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777178/mid/illustrations/access_denied_odepqr.png"
        height='50%'
        width='50%'/>
      <p>{{ error.message || `forbidden` }}</p>
    </div>
    <div
      v-else-if='error.statusCode === 400'
      class='d-flex flex-column align-center'>
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777177/mid/illustrations/cancel_xdjcar.png"
        height='40%'
        width='40%'/>
      <p>{{ error.message || `Bad Request` }}</p>
    </div>
    <div
      v-else
      class='d-flex flex-column align-center'>
      <!--      <v-img src='/images/illustrations/404-1.png' height='55%' width='55%' />-->
      <v-img src="https://res.cloudinary.com/mid-assets/image/upload/v1654777181/mid/illustrations/server_error_bp1nio.png" height='60%' width='60%'/>
      <p> {{ otherError }}</p>
    </div>
    <NuxtLink to='/' class='text-center'>
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'Page or resource Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
