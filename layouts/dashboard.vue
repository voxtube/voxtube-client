<template>
  <v-app dark>
    <!--    Abb bar for logged users-->
    <v-app-bar
      v-if='$auth.loggedIn'
      class='primary'
      fixed
      clipped-left
      elevation='1'
      app
    >
      <v-btn icon class='d-none d-sm-flex' @click='miniVariant = !miniVariant'>
        <v-icon color='white'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='white--text mr-3' @click='drawer = !drawer' />
      <nuxt-link to='/' class='mb-1'>
        <v-img :src='`/img/minilight.png`' height='25' width='25' />
      </nuxt-link>
      <v-spacer />
      <ProfileMenu />
    </v-app-bar>

    <!--    App bar for anonymouse users -->
    <v-app-bar v-else app elevation='1' clipped-left :class='{white: !$vuetify.theme.dark}'>
      <v-btn icon class='d-none d-sm-flex' @click='miniVariant = !miniVariant'>
        <v-icon color='white'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='white--text mr-3' @click='drawer = !drawer' />
      <nuxt-link to='/' class='mb-1'>
        <v-img :src='`/img/minilight.png`' height='25' width='25' />
      </nuxt-link>
      <v-spacer />
      <v-btn color='grey' text depressed dark link to='/auth/login'>Sign In</v-btn>
      <v-btn color='grey' text depressed dark link to='/auth/signup'>Sign Up</v-btn>
    </v-app-bar>

    <!--    Navigation-->
    <v-navigation-drawer
      v-model='drawer'
      :mini-variant='miniVariant'
      fixed
      clipped
      color='primary'
      mobile-breakpoint='500'
      dark
      app
    >

      <simplebar style='height: 100%'>
        <v-list>
          <v-list-item
            v-for='(item, i) in items'
            :key='i'
            :to='item.to'
            router
            dark
            active-class="border"
            exact
          >
            <v-list-item-action>
              <v-icon color='white'>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="white--text">
              <v-list-item-title v-text='item.title' />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </simplebar>
    </v-navigation-drawer>

    <v-main class="secondary">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>


  </v-app>
</template>

<script>
import simplebar from 'simplebar-vue'
import ProfileMenu from '~/components/appbar/profile_menu'

export default {
  components: { ProfileMenu, simplebar },
  data() {
    return {
      title: 'Vuetify.js',
      miniVariant: false,
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
        { title: 'Users', icon: 'mdi-card-account-details', to: '/dashboard/users' },
        { title: 'Categories', icon: 'mdi-folder-multiple-image', to: '/dashboard/categories' },
        { title: 'Reports', icon: 'mdi-flag', to: '/dashboard/reports' },
        { icon: 'mdi-cog', title: 'Settings', to: '/dashboard/settings' }
      ]
    }
  },
  fetch() {
    if (this.$auth.user.role === 'User')
      return this.$nuxt.error({ statusCode: 403, message: 'Forbidden resource' })
  }
}
</script>

<style scoped>
.border {
  color: #1f3a67;
}
</style>
