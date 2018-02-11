<template>
	<md-card style="flex: 1">
		<md-card-header>
			<md-layout>
				<md-layout>
					<div class="md-title">{{ taskSelected.name }}</div>
				</md-layout>
				<md-layout md-align="end" md-vertical-align="start">
					<md-button md-theme="orange"
							   @click.native="close"
							   class="close-btn md-icon-button md-primary">
						<md-icon>close</md-icon>
					</md-button>
				</md-layout>
			</md-layout>
		</md-card-header>

		<md-card-content>
			{{ taskSelected.description }}
		</md-card-content>
	</md-card>
</template>

<script>
	import { mapGetters } from 'vuex'
	import * as tasksMutation from '../store/modules/tasks/tasks-mutations'

	export default {
		components: {},
		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			})
		},

		methods: {
			close: function() {
				this.$store.commit(`tasks/${tasksMutation.DESELECT_TASKS}`);
			}
		}
	}
</script>
<style>
	.close-btn {
		position: relative;
		top: -5px;
	}
</style>