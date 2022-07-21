<template>
  <v-app class="">

    <v-row>
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <v-img src="/img/play.svg" contain height="100%" width="100%" />
      </v-col>
      <v-col cols="12" md="6" align-self='center'>

        <v-container>
          <v-card flat width="500">
            <div class="d-flex justify-center align-center">
              <v-card-text>
                <div>
                  <p class="text-h4 font-weight-bold primary--text">Reset password</p>
                </div>
                <v-alert v-if="error" dense type="error" dismissible>
                  {{ error_message }}
                </v-alert>
                <div>
                  <p class="text-h6 font-weight-regular grey--text">
                    Create an Account
                  </p>
                </div>

                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="resetPassword"
                >
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <span class="text-body-1">Password</span>

                      <v-text-field
                        v-model="formData.password"
                        outlined
                        aria-label="password"
                        :rules="[min]"
                        placeholder="Password"
                        :append-icon="show_password_1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_password_1 ? 'text' : 'password'"
                        name="password"
                        @click:append="show_password_1 = !show_password_1"
                      />
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <span class="text-body-1">Confirm Password</span>

                      <v-text-field
                        v-model="confirm_password"
                        outlined
                        aria-label="confirm password"
                        :rules="[
                          min,
                          passwordMatch(passwordMatch, formData.password),
                        ]"
                        placeholder="Confirm Password"
                        :append-icon="
                          show_password1 ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="show_password_2 ? 'text' : 'password'"
                        name="confirm password"
                        @click:append="show_password_2 = !show_password_2"
                      />
                    </v-col>
                    <v-col cols="12" md="12" class="pt-0">
                      <div>
                        <v-btn
                          block
                          x-large
                          color="primary"
                          class="white--text text-capitalize px-8 mt-1"
                          elevation="3"
                          :loading="loading"
                          :disabled="!valid"
                          type="submit"
                        >
                          Sign Up</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
                <v-col cols="12" md="12">
                  <div class="d-flex align-center justify-center">
                    <span class="">
                      Remember Password?
                      <v-btn color="primary" text small to="login"
                      >Login</v-btn
                      ></span
                    >
                  </div>
                </v-col>
              </v-card-text>
            </div>
          </v-card>
        </v-container>
      </v-col>
    </v-row>

  </v-app>
</template>

<script>
import { Confirm } from 'notiflix'
import rules from '~/mixins/rules'

export default {
  name: 'PasswordResetPage',
  mixins: [rules],
  layout: 'auth',
  auth: 'guest',
  data: () => ({
    valid: false,
    loading: false,
    show_password_1: false,
    show_password_2: false,
    confirm_password: '',
    error_message: '',
    error: false,
    formData: {
      password: '',
    },
  }),
  methods: {
    async resetPassword(){
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.error = false
      this.error_message = ''

      const email = this.$route.query.email
      if (!email) return

      // making api call for login
      try {

        // console.log(response)
        this.loading = false
        Confirm.show(
          'success',
          'Password reset successful\nlogin now',
          'Ok'
        )
        await this.$router.push('/auth/login')
      } catch (err) {
        // console.log(err.response.data)
        this.error = true
        this.error_message = err.response.data.message
        // this.form_data.password = ''
        this.loading = false
        // eslint-disable-next-line no-console
        console.log('err', err)
        // eslint-disable-next-line no-console
        console.log('response', err.response.data)
      }
    },
  },
}
</script>

<style scoped>

</style>
