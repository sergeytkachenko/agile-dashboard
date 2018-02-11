<template>
	<draggable class="task"
	           v-model="sortingData"
	           @start="drag=true"
	           @end="drag=false"
	           :options="{group: dropId}">
		<task v-for="task in sortingData" :task="task"></task>
	</draggable>
</template>

<script>
	import Task from '../components/Task.vue'
	import draggable from 'vuedraggable'
	import * as types from '../store/mutation-types'

	export default {

		computed: {
			sortingData: {

				get() {
					return this.$store.getters['tasks/unSortingTasks'];
				},

				set(tasks) {
					this.$store.commit(`tasks/${types.SET_TASKS_FROM_ARRAY}`, { tasks, group: undefined });
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