<template>
  <v-app class="">
    <v-row>
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <v-img src="/img/play.svg" contain height="100%" width="100%" />
      </v-col>
      <v-col cols="12" md="6">
        <v-container fill-height>
          <v-card flat width="500" color="">
            <div class="d-flex justify-center align-center">
              <v-card-text>
                <div class="d-flex">
                  <v-btn style="position: absolute; top: -20px" icon to="/">
                    <v-icon>mdi-arrow-left-circle</v-icon>
                  </v-btn>
                  <p class="text-h4 mx-3 font-weight-bold primary--text">
                    Log In
                  </p>
                </div>
                <v-alert v-if="error" dense type="error" dismissible>
                  {{ error_message }}
                </v-alert>
                <div>
                  <p class="text-h6 mx-3 font-weight-regular grey--text">
                    Access Your Account
                  </p>
                </div>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="userLogin"
                >
                  <v-col cols="12" md="12">
                    <span class="text-body-1">Email or Username</span>
                    <v-text-field
                      v-model="form_data.username"
                      name="email"
                      type="email"
                      aria-label="email"
                      :rules="[fieldRequired]"
                      outlined
                      placeholder="Enter your Email or Username"
                    />
                  </v-col>
                  <v-col cols="12" md="12" class="py-0">
                    <span class="text-body-1">Password</span>
                    <v-text-field
                      v-model="form_data.password"
                      outlined
                      aria-label="password"
                      :rules="[fieldRequired]"
                      placeholder="Enter Your Password"
                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_password ? 'text' : 'password'"
                      name="password"
                      @click:append="show_password = !show_password"
                    />
                  </v-col>
                  <div class="d-flex">
                    <v-spacer></v-spacer>
                    <ForgotPassword />
                  </div>

                  <v-col cols="12" md="12">
                    <div>
                      <v-btn
                        block
                        x-large
                        :loading="loading"
                        :disabled="!valid"
                        type="submit"
                        color="primary"
                        class="white--text text-capitalize px-8 mt-1"
                        elevation="3"
                      >
                        Login</v-btn
                      >
                    </div>
                  </v-col>
                </v-form>
                <v-col cols="12" md="12">
                  <div class="d-flex align-center justify-center">
                    <span class=""
                      >Dont Have an Account?
                      <v-btn
                        color="primary text-capitalize"
                        text
                        small
                        to="signup"
                        >Sign Up</v-btn
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
import { Notify } from 'notiflix'
import ForgotPassword from '../../components/core/forgotPassword.vue'
import rules from '~/mixins/rules'

export default {
  name: 'LoginPage',
  auth: 'guest',
  components: {
    ForgotPassword,
  },
  mixins: [rules],
  layout: 'auth',
  data: () => ({
    valid: false,
    loading: false,
    error: false,
    error_message: '',
    form_data: {
      username: '',
      password: '',
    },
    show_password: false,
  }),

  head: {
    title: 'Login',
  },
  computed: {},
  methods: {
    async userLogin() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.error = false
      this.error_message = ''

      // making api call for login
      try {
        await this.$auth.loginWith('local', {
          data: this.form_data,
        })
        // console.log(response)
        this.loading = false
        Notify.success('Login Success', {
          timeout: 1000,
          position: 'right-bottom',
        })
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

<style scoped></style>
