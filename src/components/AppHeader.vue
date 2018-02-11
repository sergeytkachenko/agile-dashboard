<template>
	<md-toolbar>
		<md-button class="md-icon-button" @click.native="goToMain">
			<md-icon>menu</md-icon>
		</md-button>

		<h2 class="md-title" style="flex: 1">{{ sprint.name }}</h2>

		<md-button class="md-raised md-accent" @click.native="createTask" v-if="user">Create task</md-button>
	</md-toolbar>
</template>

<script>
	import '../less/main.less'
	import { mapGetters, mapState } from 'vuex'

	export default {

		methods: {
			createTask: function() {
				this.$router.push(`/task/create`);
			},

			goToMain() {
				this.$router.push('/');
			}
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
