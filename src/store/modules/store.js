import Vue from 'vue';

import stateToGetters from '@/store/helpers/stateToGetters';
import stateToMutations from '@/store/helpers/stateToMutations';

// initial state
const messages = {
  realtors: [],
  realtor: {},
  messages: [],
  message: null
};

// actions
const actions = {
  getRealtors({ commit }) {
    return Vue.$api.get('/realtors').then(({ data }) => {
      commit('SET_REALTORS', data);
    });
  },
  getRealtor({ commit }, id) {
    return Vue.$api.get(`/realtors/${id}`).then(({ data }) => {
      commit('SET_REALTOR', data);
    });
  },
  getRealtorMessages(context, params) {
    return Vue.$api.get(`/realtors/${params.id}/messages`, { params }).then(({ data }) => {
      if (params.increment) {
        context.commit('SET_MESSAGES', [...context.state.messages, ...data]);
      } else {
        context.commit('SET_MESSAGES', data);
      }
    });
  },
  getMessageDetails({ commit }, { realtorId, messageId }) {
    commit('SET_MESSAGE', null);
    return Vue.$api.get(`/realtors/${realtorId}/messages/${messageId}`).then(({ data }) => {
      commit('SET_MESSAGE', data);
    });
  },
  editMessage({ commit }, payload) {
    const { body } = payload;
    // local API doesn't accept id in the payload ???
    delete body.id;
    return Vue.$api.patch(`/realtors/${payload.params.realtorId}/messages/${payload.params.messageId}`, body).then(({ data }) => {
      commit('SET_MESSAGE', data);
    });
  },
};

export default {
  namespaced: true,
  state: messages,
  getters: stateToGetters(messages),
  actions,
  mutations: stateToMutations(messages),
};
