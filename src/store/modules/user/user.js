import Vue from 'vue'
import * as mutation from './user-mutations'

const state = {
	current: {
		id: 'userid',
		token: 'token-id',
		login: 'sergey@mail.ru'
	}
}

const getters = {}

const actions = {
}

const mutations = {
	[mutation.CLEAR_CURRENT_USER] () {
		Vue.localStorage.set('token', null);
		Vue.set(state, 'current', null);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}