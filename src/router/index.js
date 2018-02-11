import Vue from 'vue'
import Router from 'vue-router'
import Sprint from '@/components/Sprint'
import AuthError from '@/components/AuthError'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			redirect: '/sprint/8db272e0-526d-42f0-8f17-6a02241e88a5'
		},
		{
			path: '/sprint/:sprintId',
			name: 'index',
			component: Sprint,
			props: true
		},
		{
			path: '/auth-error',
			name: 'auth-error',
			component: AuthError
		}
	]
})
