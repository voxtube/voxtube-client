<template>
  <v-container>
    <p v-if="purchasedVideos.length < 1">You did not purchase any video</p>
    <show-case v-else :data="purchasedVideos" label="purchased" />
  </v-container>
</template>

<script>
import ShowCase from '~/components/base/list/show_case.vue'

export default {
  name: 'PurchasedVideos',
  components: { ShowCase },
  data: () => ({
    purchasedVideos: [],
  }),
  async fetch() {
    const purchasedItems = []
    const { data } = await this.$axios.get('video/purchased/my-purchased')
    data.forEach((purchasedItem) => {
      purchasedItems.push(purchasedItem.video)
    })
    this.purchasedVideos = purchasedItems
  },
  head: {
    title: 'My Videos',
  },
}
</script>

<style scoped></style>
