import * as mutation from './tasks-mutations'
import * as action from './tasks-actions'
import Vue from 'vue'

const description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, 
			nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo 
			quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.`

const state = {
	all: {
		'id1': {
			id: 'id1',
			groupId: 'group1',
			name: 'Report',
			description: description
		},
		'id2': {
			id: 'id2',
			groupId: 'group1',
			name: 'RTL',
			description: description
		},
		'id3': {
			id: 'id3',
			groupId: 'group1',
			name: 'Fast work',
			description: description
		},
		'id4': {
			id: 'id4',
			groupId: 'group1',
			name: 'Mega hands',
			description: description
		},
		'id5': {
			id: 'id5',
			groupId: 'group1',
			name: 'Digital signature',
			description: description
		},

		'id6': {
			id: 'id6',
			groupId: 'group3',
			name: 'Process designer',
			description: description
		},
		'id7': {
			id: 'id7',
			groupId: 'group3',
			name: 'Process designer 2 version',
			description: description
		},

		'id8': {
			id: 'id8',
			groupId: 'group2',
			name: 'Quick think',
			description: description
		},
		'id9': {
			id: 'id9',
			groupId: 'group2',
			name: 'Fast people leads',
			description: description
		},
		'id10': {
			id: 'id10',
			groupId: 'group2',
			name: 'Slow open card',
			description: description
		},

		'id11': {
			id: 'id11',
			name: 'not sorting feature 1',
			description: description
		},
		'id12': {
			id: 'id12',
			name: 'not sorting feature 2',
			description: description
		},
		'id13': {
			id: 'id13',
			name: 'not sorting feature 3',
			description: description
		},
		'id14': {
			id: 'id14',
			name: 'not sorting feature 4',
			description: description
		}
	}
}

const getters = {

	selected: state => {
		const values = Object.values(state.all);
		return values.find(f => f.selected);
	},

	tasks: state => group => {
		const tasks = Object.values(state.all);
		return tasks.filter(f => f.groupId === group.id);
	},

	unSortingTasks: state => {
		const tasks = Object.values(state.all);
		return tasks.filter(f => !f.groupId);
	},

	toArray: state => {
		return Object.values(state.all);
	}
}

const actions = {

};

const mutations = {

	[mutation.SET_ALL_TASKS] (state, { tasks }) {
		Vue.set(state, 'all', tasks);
	},

	[mutation.SELECTED_TASKS] (state, { taskId }) {
		Vue.set(state.all[taskId], 'selected', true);
	},

	[mutation.DESELECT_TASKS] (state) {
		const keys = Object.keys(state.all);
		keys.forEach(taskId => Vue.set(state.all[taskId], 'selected', false));
	},

	[mutation.SET_TASKS_FROM_ARRAY] (state, { tasks, group }) {
		const newTasks = {};
		tasks.forEach(task => {
			const featureId = task.id;
			newTasks[featureId] = task;
			newTasks[featureId].groupId = group ? group.id : undefined;
			delete state.all[featureId];
		});
		Vue.set(state, 'all', Object.assign({}, state.all, newTasks));
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}