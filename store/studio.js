// state
import { ChannelType } from '~/util/types/channel'

export const state = () => ({
  my_channels: [],
  my_videos: [],
  error: '',
  active_channel: ChannelType,
})

// mutation
export const mutations = {
  SET_CHANNELS(state, payload) {
    state.my_channels = payload
  },
  SET_VIDEOS(state, payload) {
    state.my_videos = payload
  },
  ADD_CHANNEL(state, payload) {
    state.my_channels.push(payload)
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_ACTIVE_CHANNEL(state, payload){
    state.active_channel = payload
  }
}

// action
export const actions = {
  async getVideos(context, payload) {
    try {
      context.commit('SET_ERROR', null)
      const videos = await this.$axios.$get(`/channel/video/${payload}/video`)
      context.commit('SET_VIDEOS', videos)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response', response.data)
      context.commit('SET_ERROR', response.data.message)
    }
  },
  async getMyChannels(context) {
    try {
      context.commit('SET_ERROR', null)
      const channels = await this.$axios.$get(`/channel/mychannel`)
      context.commit('SET_CHANNELS', channels)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response', response.data)
      context.commit('SET_ERROR', response.data.message)
    }
  },
  async createChannel(context, payload) {
    try {
      context.commit('SET_ERROR', null)
      const createChannel = await this.$axios.$post(`/channel`, payload)
      context.commit('ADD_CHANNEL', createChannel)
    } catch ({ response }) {
      // eslint-disable-next-line no-console
      console.log('response', response.data)
      context.commit('SET_ERROR', response.data.message)
    }
  }
}
