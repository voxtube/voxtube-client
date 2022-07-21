<template>
  <v-img :height="height" :src="src" :alt="alt">
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: 'KImage',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    },
    alt: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '150',
    }
  }

}
</script>

<style scoped>

</style>
