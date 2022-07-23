<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <v-img src="/img/play.svg" contain height="100%" width="100%" />
      </v-col>
      <v-col cols="12" md="6">

        <v-container>
          <v-card flat width="500">
            <div class="d-flex justify-center align-center">
              <v-card-text>
                <div class="d-flex ">
                  <v-btn style="position: absolute; top: -20px" icon to="/">
                    <v-icon>mdi-arrow-left-circle</v-icon>
                  </v-btn>
                  <p class="text-h4 font-weight-bold primary--text">Sign Up</p>
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
                  @submit.prevent="signUpHandler"
                >
                  <v-row>
                    <v-col cols="12" md="12" class="py-0">
                      <span class="text-body-1">Username</span>
                      <v-text-field
                        v-model="formData.username"
                        name="username"
                        type="text"
                        aria-label="username"
                        :rules="[usernameVal]"
                        outlined
                        placeholder="Username"
                      />
                    </v-col>
                    <v-col cols="12" md="12" class="py-0">
                      <span class="text-body-1">Email Address</span>
                      <v-text-field
                        v-model="formData.email"
                        name="email"
                        type="email"
                        aria-label="email"
                        :rules="[emailRule]"
                        outlined
                        placeholder="Email Address"
                      />
                    </v-col>
                    <v-col cols="12" md="12" class="py-0">
                      <span class="text-body-1">Country</span>
                      <v-select
                        v-model="formData.country"
                        name="country"
                        menu-props="auto"
                        type="select"
                        :items="country_list"
                        aria-label="country"
                        :rules="[fieldRequired]"
                        outlined
                      />
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <span class="text-body-1">Password</span>

                      <v-text-field
                        v-model="formData.password"
                        outlined
                        aria-label="password"
                        :rules="[min]"
                        placeholder="Password"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_password ? 'text' : 'password'"
                        name="password"
                        @click:append="show_password = !show_password"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <span class="text-body-1">Confirm Password</span>

                      <v-text-field
                        v-model="passwordConfirm"
                        outlined
                        aria-label="confirm password"
                        :rules="[
                          min,
                          passwordMatch(passwordConfirm, formData.password),
                        ]"
                        placeholder="Confirm Password"
                        :append-icon="
                          show_password1 ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="show_password1 ? 'text' : 'password'"
                        name="confirm password"
                        @click:append="show_password1 = !show_password1"
                      />
                    </v-col>
                    <v-col cols="12" md="12" class="py-0">
                      <v-switch
                        v-model="tos"
                        :rules="[tosValidator]"
                        label="Accept terms and condition"
                      ></v-switch>
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
                      Have an Account?
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
import { Report } from 'notiflix'
import rules from '~/mixins/rules'

export default {
  name: 'RegisterPage',
  auth: 'guest',
  mixins: [rules],
  layout: 'auth',
  data: () => ({
    valid: false,
    loading: false,
    error: false,
    error_message: '',
    show_password: false,
    show_password1: false,
    passwordConfirm: '',
    formData: {
      email: '',
      username: '',
      country: 'Nigeria',
      password: '',
    },
    tos: false,
    country_list: [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua &amp; Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia &amp; Herzegovina',
      'Botswana',
      'Brazil',
      'British Virgin Islands',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Cape Verde',
      'Cayman Islands',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      'Cote D Ivoire',
      'Croatia',
      'Cruise Ship',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'France',
      'French Polynesia',
      'French West Indies',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Isle of Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kuwait',
      'Kyrgyz Republic',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Namibia',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Pierre &amp; Miquelon',
      'Samoa',
      'San Marino',
      'Satellite',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'South Africa',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'St Kitts &amp; Nevis',
      'St Lucia',
      'St Vincent',
      'St. Lucia',
      'Sudan',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      "Timor L'Este",
      'Togo',
      'Tonga',
      'Trinidad &amp; Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks &amp; Caicos',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'Uruguay',
      'Uzbekistan',
      'Venezuela',
      'Vietnam',
      'Virgin Islands (US)',
      'Yemen',
      'Zambia',
      'Zimbabwe',
    ],
  }),
  head: {
    title: 'Sign Up',
  },
  computed: {},
  methods: {
    async signUpHandler() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.error = false
      this.error_message = ''

      try {
        const response = await this.$axios.$post('/auth/signup', this.formData)
        await this.$auth.setUserToken(response.token)
        await this.$auth.fetchUser()
        this.loading = false
        await this.$router.push('/')
        Report.success(
          'Success',
          '"Your account was successfully created',
          'Ok'
        )
      } catch ({ response }) {
        this.error = true
        this.error_message = response.data.message
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
