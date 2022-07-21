<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="300">
    <template #activator="{ on, attrs }">
      <v-btn text dark small v-bind="attrs" v-on="on" >
        <v-icon left class="mr-2"> mdi-flag</v-icon
        ><span :hidden="$vuetify.breakpoint.smAndDown">Report</span>
      </v-btn>
    </template>
    <v-card>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12>
          <v-card-title class="secondary white--text"
            >Report Video</v-card-title
          >
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
                  <v-radio-group v-model="formData.content">
                    <v-radio
                      v-for="reason in reasons"
                      :key="reason"
                      :label="reason"
                      :value="reason"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" text dark @click="closeDialog">
              Close
            </v-btn>
            <v-btn
              color="primary"
              dark
              text
              :loading="loading"
              @click="saveReportHandler"
            >
              <v-icon>mdi-save</v-icon>
              Report
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
  name: 'ReportVideoDialog',
  mixins: [rules],
  props: {
    videoid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        content: '',
        userid: '',
        videoid: '',
      },
      reasons: [
        'Sexual content',
        'Violent or repulsive content',
        'Hateful or abusive content',
        'Harrassment or bullying',
        'Harmful or dangerous act',
        'Child abuse',
        'Infringes my rights',
        'Promotes terrorism',
        'Spam or misleading',
      ],
    }
  },
  computed: {
    ...mapState('dashboard/reports', ['error_message', 'reports', 'error']),
  },
  mounted() {
    this.formData.content = ''
    this.formData.userid = this.userid
    this.formData.videoid = this.videoid
  },
  methods: {
    ...mapActions('dashboard/reports', ['createReport']),

    closeDialog() {
      this.dialog = false
    },

    async saveReportHandler() {
      this.formData.videoid = this.videoid
      this.formData.userid = this.userid

      this.loading = true
      if (!this.$refs.form.validate()) return

      await this.createReport(this.formData)
      this.loading = false
      if (!this.error) this.closeDialog()
    },
  },
}
</script>
