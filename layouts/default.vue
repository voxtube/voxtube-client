<template>
  <v-app dark>
    <appbar />
    <!--    Navigation-->
   <!-- <v-navigation-drawer


      v-model="drawer"
      class="primary"
      :width="200"
      :mini-variant="miniVariant"
      fixed
      clipped
      mobile-breakpoint="600"
      floating

    >
      <simplebar style="height: 100%">
        <v-list
          v-for="(sideNav, index) in sideNavItems"
          :key="sideNav.title"
           nav

        >
          <div v-if="sideNav.title && miniVariant === false" class="white--text">
            <v-subheader>{{ sideNav.title }}</v-subheader>
          </div>
          <v-list-item
            v-for="(item, i) in sideNav.items"
            :key="i"
            :to="item.to"
            router
            exact

            exact-active-class="secondary"
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="item.title"  />
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-if="index !== sideNavItems.lastIndex && miniVariant === true"
            class="mt-5"
          />
        </v-list>
      </simplebar>

    </v-navigation-drawer>  -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>

import appbar from '~/components/appbar/appBar.vue'


export default {
  components: { appbar },
  data() {
    return {
      title: 'Vuetify.js',
      miniVariant: false,
      drawer: null,
      sideNavItems: [
        {
          title: 'Video',
          items: [
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
          ],
        },
        {
          title: 'Channel',
          items: [
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
          ],
        },
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
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
          icon: 'mdi-chart-bubble',
          title: 'Channels',
          to: '/channels',
        },
        {
          icon: 'mdi-youtube-subscription',
          title: 'Subscribed',
          to: '/subscribed',
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
