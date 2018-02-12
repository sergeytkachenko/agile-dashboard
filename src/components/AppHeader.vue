<template>
	<md-toolbar>
		<md-button class="md-icon-button" @click.native="goToMain">
			<md-icon>menu</md-icon>
		</md-button>

		<h2 class="md-title"
		    v-if="user.login"
		    style="flex: 1">{{ sprint.name }}</h2>

		<md-button v-if="user.login"
		           class="md-raised md-accent"
		           @click.native="createTask">Create task</md-button>
	</md-toolbar>
</template>

<script>
	import '../less/main.less'
	import { mapGetters, mapState } from 'vuex'

	import * as sprintAction from '../store/modules/sprints/sprints-actions'

	export default {

		methods: {
			createTask: function() {
				this.$router.push(`/task/edit/new`);
			},

			goToMain() {
				this.$router.push('/');
			}
		},

		mounted() {
			this.$store.dispatch(`sprints/${sprintAction.FETCH_CURRENT}`);
		},

		computed: {

			...mapState({
				user: state => state.user.current,
				sprint: state => state.sprints.current
			}),

			...mapGetters('tasks', {
				tasks: 'toArray'
			})
		},

		props: [
			'title'
		]
	}
</script>
