<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template #activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          color="primary"
          fab
          large
          dark
          bottom
          left
          class="fb"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>
      <v-toolbar dark color="secondary">
        <v-toolbar-title>Create Channel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-card-text class="mt-5">
            <v-form ref="form">
              <v-row>
                <!--    Name col    -->
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="formData.name"
                    :rules="[fieldRequired]"
                    name="name"
                    label="Name"
                    placeholder="Channel Name..."
                    dense
                    outlined
                  />
                </v-col>

                <!--    Description col    -->
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="formData.description"
                    label="Description"
                    placeholder="Description..."
                    hint="[Optional]"
                    dense
                    outlined
                  />
                </v-col>
                <v-col cols="12" class="py-0" >
                  <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn  class="primary" @click="createChannelHandler" >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import rules from '~/mixins/rules'

export default {
  name: 'CreateChannelFloatBtn',
  components: {},
  mixins: [rules],
  data() {
    return {
      dialog: false,
      formData: {
        name: '',
        description: '',
      },
    }
  },
  methods: {
    ...mapActions('studio', ['createChannel']),
    closeDialog() {
      this.dialog = false
    },
    createChannelHandler() {
      if (!this.$refs.form.validate()) return

      this.createChannel(this.formData)
      this.dialog = false
    },
  },
}
</script>

<style scoped>
.fb {
  bottom: 10px;
  right: 30px;
  position: absolute;
}
</style>
