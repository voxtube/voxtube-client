<template>
  <v-container>
    <div v-if="rentedVideos.length < 1">You did not rent any video</div>
    <show-case else :data="rentedVideos" label="rented" />
  </v-container>
</template>

<script>
import ShowCase from '~/components/base/list/show_case.vue'

export default {
  name: 'RentedVideos',
  components: { ShowCase },
  data: () => ({
    rentedVideos: [],
  }),
  async fetch() {
    const rentedItems = []
    const { data } = await this.$axios.get('video/rented/my-rented')
    data.forEach((rentedItem) => {
      rentedItems.push(rentedItem.video)
    })
    this.rentedVideos = rentedItems
  },
  head: {
    title: 'Rented Videos',
  },
}
</script>

<style scoped></style>
