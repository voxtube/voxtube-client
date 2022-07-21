<template>
  <v-app dark>
    <!--    Abb bar for logged users-->
    <v-app-bar
      v-if="$auth.loggedIn"
      :class="{ primary: !$vuetify.theme.dark }"
      fixed
      clipped-left
      elevation="1"
      app
    >
      <v-btn icon class="d-none d-sm-flex" @click="miniVariant = !miniVariant">
        <v-icon color="white"
          >mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon
        >
      </v-btn>
      <v-app-bar-nav-icon
        class="white--text mr-3"
        @click="drawer = !drawer"
      />
      <nuxt-link to="/" class="mb-1">
        <v-img
          src="/img/minilight.png"
          height="25"
          width="25"
        />
      </nuxt-link>
      <v-spacer />
      <ProfileMenu />
    </v-app-bar>

    <!--    App bar for anonymouse users -->
    <v-app-bar
      v-else
      app
      clipped-left
      :class="{ primary: !$vuetify.theme.dark }"
    >
      <v-btn icon class="d-none d-sm-flex" @click="miniVariant = !miniVariant">
        <v-icon color="white"
          >mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon
        >
      </v-btn>
      <v-app-bar-nav-icon
        class="white--text mr-3"
        @click="drawer = !drawer"
      />
      <nuxt-link to="/" class="mb-1">
        <v-img
          src="/img/minilight.png"
          height="25"
          width="25"
        />
      </nuxt-link>
      <v-spacer />
      <v-btn color="grey" text depressed dark link to="/auth/login"
        >Sign In</v-btn
      >
      <v-btn color="grey" text depressed dark link to="/auth/signup"
        >Sign Up</v-btn
      >
    </v-app-bar>

    <!--    Navigation-->
    <v-navigation-drawer
      v-model="drawer"
      width="250"
      :mini-variant="miniVariant"
      fixed
      clipped
      color="primary"
      app
    >
      <simplebar style="height: 100%">
        <v-list >
          <v-list-item>
            <v-list-item-avatar size="50">
              <k-image :src="$store.state.studio.active_channel.channel_img" />
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6 white--text">
                {{ $store.state.studio.active_channel.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="white--text">{{
                $store.state.studio.active_channel.user.username
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="white" >mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            active-class="border"
            exact
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="white--text">
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </simplebar>
    </v-navigation-drawer>
    <v-main class="secondary">
      <v-skeleton-loader v-if="$fetchState.pending" />
      <v-container v-else>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import simplebar from 'simplebar-vue'
import ProfileMenu from '~/components/appbar/profile_menu'
import KImage from '~/components/base/image'

export default {
  components: { KImage, ProfileMenu, simplebar },
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
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: `/studio/${this.$route.params.studio_id}/dashboard`,
        },
        {
          icon: 'mdi-play-box-multiple',
          title: 'Content',
          to: `/studio/${this.$route.params.studio_id}/content`,
        },
        {
          icon: 'mdi-video-plus',
          title: 'Upload',
          to: `/studio/${this.$route.params.studio_id}/upload`,
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: `/studio/${this.$route.params.studio_id}/settings`,
        },
      ],
    }
  },
  async fetch() {
    try {
      const channelData = await this.$axios.$get(
        `/channel/byid/${this.$route.params.studio_id}`
      )
      await this.$store.commit('studio/SET_ACTIVE_CHANNEL', channelData)
      if (
        this.$auth.user.id !== this.$store.state.studio.active_channel.user.id
      )
        return this.$nuxt.error({ message: 'Unauthorised', statusCode: 401 })
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      // console.log('response error', response.data)
      this.$nuxt.error({
        message: response.data.message,
        statusCode: 404,
      })
    }
  },
}
</script>

<style scoped>
.border {
  color: #1f3a67;
}

</style>
