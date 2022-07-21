<template>
  <div>
    <v-app-bar
      v-if="$auth.loggedIn"
      class="primary"
      elevate-on-scroll
      app
    >
      <v-spacer></v-spacer>
      <nuxt-link to="/" class="mb-1">
        <v-img src="/img/bg.png" width="120" height="100" />
      </nuxt-link>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />

      <ProfileMenu />
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--    App bar for anonymouse users -->
    <v-app-bar
      v-else
      app
      elevate-on-scroll
      :class="{ primary: !$vuetify.theme.dark }"
    >
      <v-spacer />
      <nuxt-link to="/" class="mb-1">
        <v-img src="/img/bg.png" width="120" height="100" />
      </nuxt-link>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />

      <v-btn text color="accent" to="/auth/login" class="mx-2 py-6"
        >Sign In</v-btn
      >
      <v-btn color="secondary" large to="/auth/signup" class="mx-2 py-6"
        >Sign Up</v-btn
      >
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import ProfileMenu from '~/components/appbar/profile_menu'

export default {
  name: 'AppBar',
  components: { ProfileMenu },
  data: () => ({
    miniVariant: false,
  }),
}
</script>
