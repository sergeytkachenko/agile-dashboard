import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import groups from './modules/groups'
import tasks from './modules/tasks'
import sprints from './modules/sprints'
import voting from './modules/voting'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		groups,
		tasks,
		sprints,
		user,
		voting
	}
})