import Vue from 'vue'
import Router from 'vue-router'
import Sprint from '@/components/Sprint'
import TaskEdit from '@/components/TaskEdit'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			redirect: '/sprint/8db272e0-526d-42f0-8f17-6a02241e88a5'
		},
		{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			path: '/sprint/:sprintId',
			name: 'index',
			component: Sprint,
			props: true
		},
		{
			path: '/task/edit/:taskId',
			name: 'task.create',
			component: TaskEdit,
			props: true
		},
		{
			path: '/auth-error',
			name: 'auth-error',
			component: Login
		}
	]
})
