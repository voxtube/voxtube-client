<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.dashboard.users.users"
    :items-per-page="5"
    class="elevation-1"
  >
    <!--      profile image sluts-->
    <template #[`item.profile_img`]="{ item }">
      <v-img
        class="ma-5"
        :src="item.profile_img"
        lazy-src="/minilogo.png"
        height="100"
        width="100"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </template>

    <!--    Actions slut      -->
    <template #[`item.actions`]="{ item }">
      <edit-user :user="item" />

    </template>
  </v-data-table>
</template>
<script>
import EditUser from './EditUser.vue'

export default {
  name: 'UsersTable',
  components: { EditUser },
  data: () => ({
    users: [],
    headers: [
      { text: 'User name', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Role', value: 'role' },
      { text: 'Profile Image', value: 'profile_img' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
}
</script>
