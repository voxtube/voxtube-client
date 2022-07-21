// state
export const state = () => ({
  reports: [],
  error: false,
  error_message: '',
})

// mutation
export const mutations = {
  SET_REPORTS(state, payload) {
    state.reports = payload
  },
  REMOVE_REPORT(state, payload) {
    state.reports = state.reports.filter((report) => report.id !== payload.id)
  },
  CREATE_REPORT(state, payload) {
    state.reports.push(payload)
  },
  UPDATE_REPORT(state, payload) {
    const index = state.reports.findIndex((c) => c.id === payload.id)
    state.reports.splice(index, 1, payload)
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false
    state.error_message = payload ? payload.message : ''
  },
}

export const getters = {
  reportCount: (state) => {
    return state.reports.length.toString()
  },
}

// action
export const actions = {
  async getAllReports(context) {
    try {
      // context.commit('SET_ERROR')
      const reports = await this.$axios.$get('/reports')
      context.commit('SET_REPORTS', reports)
    } catch ({ response }) {
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
  async createReport(context, payload) {
    try {
      context.commit('SET_ERROR')
      const report = await this.$axios.$post(`/reports`, payload)
      context.commit('CREATE_REPORT', report)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
  async updateReport(context, payload) {
    try {
      context.commit('SET_ERROR')
      const report = await this.$axios.$patch(
        `/reports/${payload.videoid}`,
        payload
      )
      context.commit('UPDATE_REPORT', report)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response error', response.data)
      context.commit('SET_ERROR', {
        error: true,
        message: response.data.message,
      })
    }
  },
  async deleteReport(context, payload) {
    try {
      context.commit('SET_ERROR')
      const report = await this.$axios.$delete(`/reports/${payload.id}`)
      context.commit('REMOVE_REPORT', report)
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
