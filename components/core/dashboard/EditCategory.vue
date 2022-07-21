<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="500">
    <template #activator="{ on, attrs }">
      <v-icon small class="mr-2" v-bind="attrs" v-on="on"> mdi-pencil</v-icon>
    </template>

    <v-card>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12>
          <v-card-title class="secondary white--text">
            Edit Category
          </v-card-title>

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
                <!--    Name col    -->
                <v-col cols="12">
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
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.description"
                    label="Description"
                    placeholder="Description..."
                    hint="[Optional]"
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
              @click="createChannelHandler"
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
  name: 'EditCategory',
  components: {},
  mixins: [rules],
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        name: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapState('dashboard/categories', [
      'error_message',
      'categories',
      'error',
    ]),
  },
  created() {
    this.formData.id = this.category.id
    this.formData.name = this.category.name
    this.formData.description = this.category.description
  },
  methods: {
    ...mapActions('dashboard/categories', ['updateCategory']),
    closeDialog() {
      this.formData.name = ''
      this.formData.description = ''
      this.dialog = false
    },
    async createChannelHandler() {
      this.loading = true
      if (!this.$refs.form.validate()) return

      await this.updateCategory(this.formData)
      this.loading = false
      if (!this.error) this.closeDialog()
    },
  },
}
</script>

<style scoped></style>
