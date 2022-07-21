// state
export const state = () => ({
  categories: [],
  error: false,
  error_message: ''
})

// mutation
export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  ADD_CATEGORIES(state, payload) {
    state.categories.push(payload)
  },
  REMOVE_CATEGORY(state, payload) {
    state.categories = state.categories.filter((category) => category.id !== payload.id)
  },
  UPDATE_CATEGORY(state, payload) {
    const index = state.categories.findIndex((c) => c.id === payload.id)
    state.categories.splice(index, 1, payload)
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false
    state.error_message = payload ? payload.message : ''
  }
}

// action
export const actions = {
  async getAllCategories(context) {
    try {
      // context.commit('SET_ERROR')
      const categories = await this.$axios.$get('/category')
      context.commit('SET_CATEGORIES', categories)
    } catch ({ response }) {
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message
      })
    }
  },
  async addCategory(context, payload) {
    try {
      context.commit('SET_ERROR')
      const category = await this.$axios.$post('/category', payload)
      context.commit('ADD_CATEGORIES', category)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message
      })
    }
  },
  async updateCategory(context, payload) {
    try {
      context.commit('SET_ERROR')
      const category = await this.$axios.$patch(`/category/${payload.id}`, payload)
      context.commit('UPDATE_CATEGORY', category)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message
      })
    }
  },
  async deleteCategory(context, payload) {
    try {
      context.commit('SET_ERROR')
      const category = await this.$axios.$delete(`/category/${payload.id}`)
      context.commit('REMOVE_CATEGORY', category)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message
      })
    }
  }
}
