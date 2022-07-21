<template>
  <v-data-table
    :headers="categoryHeaders"
    :items="$store.state.dashboard.categories.categories"
    :items-per-page="5"
    class="elevation-1"
  >
    <!--    Actions slut      -->
    <template #[`item.actions`]="{ item }">
      <EditCategory :category="item" />
      <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { Confirm, Report } from 'notiflix'
import EditCategory from '~/components/core/dashboard/EditCategory'

export default {
  name: 'CategoriesTable',
  components: { EditCategory },
  data: () => ({
    addDialog: false,
    editDialog: false,
    categoryHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    closeEditDialog() {
      this.editDialog = false
    },
    editCategory(item) {
      this.closeEditDialog()
    },
    deleteItem(item) {
      Confirm.show(
        'Delete Item',
        'Are you sure you want to delete this item\nThis action cannot be undone!',
        'Yes',
        'No',
        async () => {
          try {
            await this.$store.dispatch(
              'dashboard/categories/deleteCategory',
              item
            )
            if (this.$store.state.dashboard.categories.error)
              Report.failure(
                'Error',
                this.$store.state.dashboard.categories.error_message,
                'Ok',
                async () => {
                  await this.$store.commit('dashboard/categories/SET_ERROR')
                }
              )
          } catch ({ response }) {
            Report.failure('Error', response.data.message, 'Ok')
          }
        },
        () => {}
      )
    },
  },
}
</script>

<style scoped></style>
