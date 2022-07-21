// state
export const state = () => ({
  users: [],
  error: false,
  error_message: '',
})

// mutation
export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },
  REMOVE_USER(state, payload) {
    state.users = state.users.filter((user) => user.id !== payload.id)
  },
  UPDATE_USER(state, payload) {
    const index = state.users.findIndex((c) => c.id === payload.id)
    state.users.splice(index, 1, payload)
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false
    state.error_message = payload ? payload.message : ''
  },
}

// getters
export const getters = {
  userCount: (state) => {
    return state.users.length.toString()
  },
}

// action
export const actions = {
  async getAllUsers(context) {
    try {
      // context.commit('SET_ERROR')
      const users = await this.$axios.$get('/users')
      context.commit('SET_USERS', users)
    } catch ({ response }) {
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
  async updateUser(context, payload) {
    try {
      if (this.$auth.user.role === 'Admin' && payload.role === 'Admin') {
        context.commit('SET_ERROR', {
          error: true,
          message: 'You can not change the role to Admin',
        })
        return
      }
      context.commit('SET_ERROR')
      const user = await this.$axios.$patch(`/users/${payload.id}`, payload)
      context.commit('UPDATE_USER', user)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
  async deleteUser(context, payload) {
    try {
      context.commit('SET_ERROR')
      const user = await this.$axios.$delete(`/users/${payload.id}`)
      context.commit('REMOVE_USER', user)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
}
