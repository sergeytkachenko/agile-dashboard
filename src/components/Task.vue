<template>
	<md-card @click.native="click"
	         @dblclick.native="dblClick"
	         :class="{ selected: taskSelected && taskSelected.id === task.id }">
		<md-card-content>
			{{ task.name }}
		</md-card-content>
	</md-card>
</template>

<script>
	import { mapGetters } from 'vuex'
	import * as tasksMutation from '../store/modules/tasks/tasks-mutations'
	import '../less/task.less'

	export default {

		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			})
		},

		methods: {
			click: function() {
				this.$store.commit(`tasks/${tasksMutation.DESELECT_TASKS}`);
				this.$store.commit(`tasks/${tasksMutation.SELECTED_TASKS}`, { taskId: this.task.id });
			},

			dblClick() {
				this.$router.push(`/task/edit/${this.taskSelected.id}`);
			}
		},

		props: ['task']
	}
</script>