<template>
  <v-card raised nuxt width="100%" height="300" :to="`/channels/${channel.id}`">
    <div
      :style="{ backgroundColor: randomColor() }"
      class="custom_div text-center"
    ></div>
    <v-list-item>
      <v-list-item-avatar
        class="text-h5 font-weight-light white--text text-uppercase"
        color="secondary"
        size="50"
      >
      <v-spacer></v-spacer>
        {{ channel.name.charAt(0) }}
        <v-spacer></v-spacer>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span class="text-h6 font-weight-normal">
            {{ channel.name | sentenceCase }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          by {{ channel.user.username }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <div class="px-5">
      <v-chip color="" label class="mb-1">
        <v-icon left>mdi-video</v-icon>
        {{ channel._count.video }} videos</v-chip
      >

      <v-chip color="" label class="mb-1">
        <v-icon left>mdi-account-group</v-icon>
        {{ channel._count.subscribe }} subscribers</v-chip
      >
    </div>

    <v-card-text>{{ channel.description }}</v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ChannelCard',
  components: {},

  props: {
    channel: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    colorCache: {},
  }),
  methods: {
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random())

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      )
    },
  },
}
</script>

<style scoped>
.custom_div {
  height: 100px;
}
</style>
