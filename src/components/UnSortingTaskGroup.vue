<template>
	<div class="task-group-wrap">
		<div class="task-group-title">TO DO</div>
		<draggable class="task task-draggable"
		           v-model="tasksSorting"
		           @start="drag=true"
		           @end="drag=false"
		           :options="{group: dropId}">
			<task v-for="task in tasksSorting" :task="task"></task>
		</draggable>
	</div>
</template>

<script>
	import Task from '../components/Task.vue'
	import draggable from 'vuedraggable'
	import * as tasksMutation from '../store/modules/tasks/tasks-mutations'
	import * as tasksAction from '../store/modules/tasks/tasks-actions'

	export default {

		computed: {
			tasksSorting: {

				get() {
					return this.$store.getters['tasks/unSortingTasks'];
				},

				set(tasks) {
					tasks.forEach((task, index) => {
						task.index = index;
						task.groupId = null;
					});
					this.$store.dispatch(`tasks/${tasksAction.SAVE_ALL}`, tasks);
					this.$store.commit(`tasks/${tasksMutation.SET_TASKS_FROM_ARRAY}`, { tasks, group: undefined });
				}
			}
		},

		components: {
			draggable,
			Task
		},

		props: ['drop-id']
	}
</script>