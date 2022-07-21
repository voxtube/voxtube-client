<template>
  <v-dialog v-model='dialog' max-width='450'>
    <template #activator='{ on, attrs }'>
      <v-btn
        :color='color'
        class='text-capitalize'
        dark
        v-bind='attrs'
        v-on='on'
      >
        <v-icon v-if='icon'>{{ icon }}</v-icon>
        {{ label }}
      </v-btn>
    </template>
    <v-card class='pa-1'>
      <v-card-text>
        <v-list-item class='px-0 py-4'>
          <v-list-item-content>
            <v-list-item-title> Confirm Password</v-list-item-title>
            <v-list-item-subtitle>
              Please enter your password
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-row>
          <v-col cols='12' md='12' class='py-0'>
            <v-form ref='form' v-model='valid' lazy-validation @submit.prevent='verifyPassword'>
              <v-text-field
                v-model='formData.password'
                outlined
                aria-label='password'
                :rules='[fieldRequired, min]'
                placeholder='Enter Your Password'
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                :error='!!errorMsg'
                :hint='errorMsg'
                persistent-hint
                label='Password'
                name='password'
                @click:append='show_password = !show_password'
              />
            </v-form>
          </v-col>
          <v-col cols='12' md='12'>
            <v-btn
              block
              large
              :loading='loading'
              :disabled='loading'
              type='submit'
              class='white--text text-capitalize'
              color='primary'
              @click='verifyPassword'
            >
              Verify Password
            </v-btn>
          </v-col>
          <v-col cols='12' md='12'>
            <div class='d-flex align-center justify-center'>
              <v-btn
                text
                color='primary'
                class='text-capitalize'
                @click='closeDialog'
              >
                Cancel
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <p v-if="errorMsg" class='red--text text-center'>{{ errorMsg }}</p>
        <p v-if='successMsg' class='text-center'>
          Success! your password is verified
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import rules from '~/mixins/rules'

export default {
  name: 'ConfirmPassword',
  mixins: [rules],
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  data: () => ({
    dialog: false,
    email: '',
    valid: false,
    loading: false,
    successMsg: false,
    errorMsg: '',
    show_password: false,
    formData: {
      password: ''
    }
  }),
  methods: {
    closeDialog() {
      this.formData.password = ''
      this.errorMsg = ''
      this.successMsg = ''
      this.dialog = false
    },
    async verifyPassword() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      this.errorMsg = ''
      // making api call for login
      try {
        const password = await this.$axios.$post('/users/check-password', this.formData)
        if (!password.match) {
          this.error = true
          this.loading = false
          this.errorMsg = 'Incorrect Password'
          return
        }
        // console.log(response)
        this.loading = false
        this.$emit('action')
        this.closeDialog()
      } catch (err) {
        // console.log(err.response.data)
        this.error = true
        this.error_message = err.response.data.message
        // this.form_data.password = ''
        this.closeDialog()
        // eslint-disable-next-line no-console
        console.log('err', err)
        // eslint-disable-next-line no-console
        console.log('response', err.response.data)
      }
    }
  }
}
</script>
