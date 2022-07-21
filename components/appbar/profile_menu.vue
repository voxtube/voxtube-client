<template>
  <v-menu offset-y transition="scroll-y-transition">
    <template #activator="{ on, attrs }">
      <v-list flat class="menu">
        <v-list-item dense v-bind="attrs" v-on="on">
          <v-avatar size="30" class="mr-2" :color="randomColor">
            <v-img :src="$auth.user.profile_img" />
          </v-avatar>
          <!--          <v-list-item-title  class="white&#45;&#45;text">Ahmad Muhammad</v-list-item-title>-->
          <v-list-item-title class="white--text">
            {{ $auth.user.username | sentenceCase }}
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon color="white">mdi-menu-down</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </template>
    <v-list flat class="">
      <v-list-item-group v-model="selectedItem" color="primary">
        <!--        Dashboard     -->
        <v-list-item
          v-if="$auth.user.role !== 'User'"
          link
          exact
          to="/dashboard"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          dense
          exact
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/auth/logout" dense>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Sign Out </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ProfileMenu',
  data: () => ({
    selectedItem: 1,
    items: [
      {
        icon: 'mdi-video-plus',
        title: 'Studio',
        to: '/studio',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Channels',
        to: '/channels',
      },
      {
        icon: 'mdi-youtube-subscription',
        title: 'Subscribed',
        to: '/subscribed',
      },
      {
        icon: 'mdi-video',
        title: 'Purchased',
        to: '/purchased',
      },
      {
        icon: 'mdi-alarm',
        title: 'Rented',
        to: '/rented',
      },
      {
        icon: 'mdi-history',
        title: 'History',
        to: '/history',
      },

      {
        icon: 'mdi-currency-ngn',
        title: 'Wallet',
        to: '/wallet',
      },
      {
        icon: 'mdi-cog',
        title: 'Settings',
        to: '/studio/settings',
      },
    ],
  }),
  computed: {
    randomColor: () => {
      const colors = ['red', 'brown', 'orange', 'green', 'tomato', 'indigo']
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.setTheme('dark', {})
    },
  },
}
</script>

<style scoped>
.menu {
  background-color: transparent !important;
}
</style>
