<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="500">
    <template #activator="{ on, attrs }">
      <v-icon
        :disabled="deactivateEdit"
        small
        class="mr-2"
        v-bind="attrs"
        v-on="on"
      >
        mdi-pencil</v-icon
      >
    </template>
    <v-card>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12>
          <v-card-title class="secondary white--text"> Edit User </v-card-title>
          <v-card-text class="mt-5">
            <v-form ref="form">
              <v-alert
                v-show="error"
                dense
                type="error"
                class="my-5"
                dismissible
              >
                {{ error_message }}
              </v-alert>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="formData.role"
                    :rules="[fieldRequired]"
                    :items="options"
                    name="role"
                    label="Role"
                    placeholder="User role"
                    dense
                    outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="formData.suspend"
                    label="Suspend User"
                    placeholder="Suspend user"
                    dense
                    outlined
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" text dark @click="closeDialog">
              <v-icon>mdi-delete</v-icon>
              Close
            </v-btn>
            <v-btn
              color="primary"
              dark
              text
              :loading="loading"
              @click="updateUserHandler"
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
  name: 'EditUser',
  components: {},
  mixins: [rules],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        role: '',
        suspend: false,
      },
    }
  },
  computed: {
    ...mapState('dashboard/users', ['error_message', 'users', 'error']),
    options() {
      return this.$auth.user.role === 'Super'
        ? ['Admin', 'Mod', 'User']
        : this.$auth.user.role === 'Admin'
        ? ['Mod', 'User']
        : ['User']
    },
    deactivateEdit() {
      if (this.$auth.user.role === 'Admin') {
        if (this.user.role === 'Super' || this.user.role === 'Admin') {
          return true
        }
      } else if (this.$auth.user.role === 'Mod') {
        if (
          this.user.role === 'Super' ||
          this.user.role === 'Admin' ||
          this.user.role === 'Mod'
        ) {
          return true
        }
      }
      return false
    },
  },
  created() {
    this.formData.id = this.user.id
    this.formData.role = this.user.role
    this.formData.suspend = this.user.suspend
  },
  methods: {
    ...mapActions('dashboard/users', ['updateUser']),

    closeDialog() {
      this.dialog = false
    },
    async updateUserHandler() {
      this.loading = true
      if (!this.$refs.form.validate()) return

      await this.updateUser(this.formData)
      this.loading = false
      if (!this.error) this.closeDialog()
    },
  },
}
</script>

<style scoped></style>
