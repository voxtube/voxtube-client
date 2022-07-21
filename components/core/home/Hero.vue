<template>
  <v-row class="primary">
    <v-container>
      <v-row class="mt-12">
        <v-col cols="12" md="6">
          <v-container fill-height fluid>
            <v-row>
              <v-col>
                <p class=" font-weight-bold white--text" style="font-size: 42px;">Watch it HD</p>
                <h1 class="accent--text">
                  Discover some of the most amazing contents and watch them in
                  HD
                </h1>
                <v-btn
                  color="secondary"
                  class="text-capitalize mt-2"
                  width="196px"
                  height="50px"
                  to="/videos"
                  ><span class="font-weight-bold text-h6">watch</span></v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            src="/img/hero.jpeg"
            contain
            style="border-radius: 8px"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<style scoped>
</style>