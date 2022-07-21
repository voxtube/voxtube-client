<template>
  <v-dialog
    v-model='dialog'
    transition='scroll-y-transition'
    width='500'
  >
    <template #activator='{ on, attrs }'>
      <v-fab-transition>
        <v-btn
          color='secondary'
          fab
          large
          dark
          bottom
          left
          class='fb'
          v-bind='attrs'
          v-on='on'
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>

      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm12
        >
          <v-card-title class='secondary white--text'>
            Create Category
          </v-card-title>


          <v-card-text class='mt-5'>
            <v-form ref='form'>

              <v-alert v-show='error' dense type='error' class='my-5' dismissible>
                {{ error_message }}
              </v-alert>

              <v-row>

                <!--    Name col    -->
                <v-col cols='12'>
                  <v-text-field v-model='formData.name'
                                :rules='[fieldRequired]'
                                name='name'
                                label='Name'
                                placeholder='Channel Name...'
                                dense
                                outlined />
                </v-col>

                <!--    Description col    -->
                <v-col cols='12'>
                  <v-text-field v-model='formData.description'
                                label='Description'
                                placeholder='Description...'
                                hint='[Optional]'
                                dense
                                outlined />
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color='secondary'
              text
              dark
              @click='closeDialog'
            >
              <v-icon>mdi-delete</v-icon>
              Close
            </v-btn>
            <v-btn
              color='primary'
              dark
              text
              :loading='loading'
              @click='createChannelHandler'
            >
              <v-icon>mdi-save</v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import rules from '~/mixins/rules'

export default {
  name: 'CategoryFloatingBtn',
  components: {},
  mixins: [rules],
  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('dashboard/categories', ['error_message', 'categories', 'error'])
  },
  methods: {
    ...mapActions('dashboard/categories', ['addCategory']),
    closeDialog() {
      this.formData.name = ''
      this.formData.description = ''
      this.dialog = false
    },
    async createChannelHandler() {
      this.loading = true
      if (!this.$refs.form.validate()) return

      await this.addCategory(this.formData)
      this.loading = false
      if (!this.error)
        this.closeDialog()
    }
  }
}
</script>

<style scoped>
.fb {
  bottom: 10px;
  right: 30px;
  position: absolute;
}
</style>
