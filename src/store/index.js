import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import groups from './modules/groups/groups'
import tasks from './modules/tasks/tasks'
import sprints from './modules/sprints/sprints'
import voting from './modules/voting/voting'
import user from './modules/user/user'

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