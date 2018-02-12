<template>
	<div class="task-group-wrap">
		<div class="task-group-title">
			{{ group.name  }}
			({{ tasksSorting.length }})
		</div>
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
	import { mapGetters } from 'vuex'
	import Task from '../components/Task.vue'
	import draggable from 'vuedraggable'
	import * as tasksAction from '../store/modules/tasks/tasks-actions'
	import * as tasksMutation from '../store/modules/tasks/tasks-mutations'

	export default {

		computed: {

			...mapGetters('tasks', {
				tasks: 'tasks'
			}),

			tasksSorting: {

				get() {
					return this.tasks(this.group);
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