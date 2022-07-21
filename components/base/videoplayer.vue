<template>
  <video
    ref='player'
    controls
    :width="width"
    :height="height"
    @play='playHandler'>
    <source :src="video.videoUrl" type="video/mp4" />
  </video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    video: {
      required: true,
      type: Object,
    },
    width: {
      type: String,
      default: '100&'
    },
    height: {
      type: String,
      default: '100&'
    },
  },
  methods: {
    playHandler() {
      // eslint-disable-next-line no-console
      console.log("You played me yay")
    },
  }
}
</script>

<style scoped>

</style>
