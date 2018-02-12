import * as mutation from './tasks-mutations'
import * as action from './tasks-actions'
import Vue from 'vue'

const description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, 
			nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo 
			quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.`

const state = {
	all: {}
};

const getters = {

	selected: state => {
		const values = Object.values(state.all);
		const found = values.find(f => f.selected);
		if (found) {
			return state.all[found.id];
		}
	},

	byId: state => id => {
		const values = Object.values(state.all);
		return values.find(f => f.id === id);
	},

	tasks: state => group => {
		const tasks = Object.values(state.all);
		const foundTasks = tasks.filter(f => f.groupId === group.id);
		return getters._sort(foundTasks)
	},

	unSortingTasks: state => {
		const tasks = Object.values(state.all);
		const foundTasks = tasks.filter(f => !f.groupId);
		return getters._sort(foundTasks)
	},

	toArray: state => {
		return Object.values(state.all);
	},

	_sort(tasks) {
		tasks.sort((one, two) => {
			if (one.index > two.index) {
				return 1;
			}
			if (one.index < two.index) {
				return -1;
			}
			return 0;
		});
		return tasks;
	}
}

const actions = {

	[action.FETCH_ALL]({ commit }) {
		const url = `/api/task/current-sprint`;
		return Vue.http.get(`${url}`)
			.then(res => {
				const tasks = getters._sort(res.body);
				commit(mutation.SET_ALL_FROM_ARRAY, tasks);
			});
	},

	[action.ADD]: function ({ commit }, task) {
		return Vue.http.post(`/api/task/add`, task)
			.then(res => {
				const task = res.body;
				commit(mutation.ADD, task);
			});
	},

	[action.REMOVE]: function ({ commit }, id) {
		return Vue.http.delete(`/api/task/remove/${id}`)
			.then(() => {
				commit(mutation.REMOVE_TASK, id);
			});
	},

	[action.SAVE]: function ({ commit }, task) {
		return Vue.http.post(`/api/task/save`, task)
			.then(res => {
				const task = res.body;
				commit(mutation.CHANGE, task);
			});
	},

	[action.SAVE_ALL]: function ({ commit }, tasks) {
		const functions = [];
		tasks.forEach(task => {
			let fn = Vue.http.patch(`/api/task/save`, {
				groupId: task.groupId,
				index: task.index,
				id: task.id
			});
			functions.push(fn);
		});
		return Promise.all(functions);
	}
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
	},

	[mutation.SET_ALL_FROM_ARRAY] (state, tasks) {
		const obj = {};
		tasks.forEach(task => {
			obj[task.id] = task;
		});
		Vue.set(state, 'all', obj);
	},

	[mutation.ADD] (state, task) {
		Vue.set(state.all, task.id, task);
	},

	[mutation.CHANGE] (state, task) {
		Vue.set(state.all, task.id, task);
	},

	[mutation.REMOVE_TASK] (state, id) {
		Vue.delete(state.all, id);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}