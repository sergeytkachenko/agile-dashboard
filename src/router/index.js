import Vue from 'vue'
import Router from 'vue-router'
import Sprint from '@/components/Sprint'
import TaskEdit from '@/components/TaskEdit'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '',
			redirect: '/sprint/current'
		},
		{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			path: '/sprint/current',
			name: 'sprint',
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

router.beforeEach((to, from, next) => {
	let token = Vue.localStorage.get('token');
	if (to.name === 'login' || to.name === 'exit') {
		next();
	}
	if (!token) {
		router.replace('/login');
		return;
	}
	next();
});

export default router