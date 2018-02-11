<template>
	<div class="task-group-wrap">
		<div class="task-group-title">
			{{ group.name  }}
		</div>
		<draggable class="task task-draggable" v-model="sortingData"
		           @start="drag=true"
		           @end="drag=false"
		           :options="{group: dropId}">
			<task v-for="task in sortingData" :task="task"></task>
		</draggable>
	</div>
</template>

<script>
	import Task from '../components/Task.vue'
	import draggable from 'vuedraggable'
	import * as tasksAction from '../store/modules/tasks/tasks-actions'
	import * as tasksMutation from '../store/modules/tasks/tasks-mutations'

	export default {

		computed: {
			sortingData: {

				get() {
					let tasks = this.$store.getters['tasks/tasks'];
					return tasks(this.group);
				},

				set(tasks) {
					tasks.forEach((task, index) => {
						task.index = index;
						task.groupId = this.group.id;
					});
					this.$store.dispatch(`tasks/${tasksAction.SAVE_ALL}`, tasks);
					this.$store.commit(`tasks/${tasksMutation.SET_TASKS_FROM_ARRAY}`, { tasks, group: this.group });
				}
			}
		},

		components: {
			draggable,
			Task
		},

		props: ['group', 'dropId']
	}
</script>