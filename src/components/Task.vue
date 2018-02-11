<template>
	<md-card @click.native="click"
	         :class="{ selected: taskSelected && taskSelected.id === task.id }">
		<md-card-content>
			{{ task.name }}
		</md-card-content>
	</md-card>
</template>

<script>
	import { mapGetters } from 'vuex'
	import * as types from '../store/mutation-types'
	import '../less/task.less'

	export default {

		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			})
		},

		methods: {
			click: function(event) {
				this.$store.commit(`tasks/${types.DESELECT_TASKS}`);
				debugger
				this.$store.commit(`tasks/${types.SELECTED_TASKS}`, { taskId: this.task.id });
			}
		},

		props: ['task']
	}
</script>