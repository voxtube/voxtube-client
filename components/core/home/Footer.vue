<template>
    <v-footer class="black" padless>
     <v-container>
      <v-card flat tile class="black white--text text-center">
        <v-card-text class="white--text pt-0">
        </v-card-text>
        <v-row
          justify="center"
          no-gutters
        >
          <v-btn
            v-for="link in links"
            :key="link.name"
            :to="link.url"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link.name }}
          </v-btn>
        </v-row>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>VoxTube</strong>
        </v-card-text>
      </v-card>
      </v-container>
    </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { name: 'Planet Scale', url: 'https://planetscale.com', },
        { name: 'HashNode', url: 'https://townhall.hashnode.com/planetscale-hackathon', },
        { name: 'Policy', url: '/policy', },
        { name: 'Terms Of Use', url: '/tos', },
      ]
    }),
  }
</script>
