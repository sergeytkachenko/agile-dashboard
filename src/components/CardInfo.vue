<template>
	<md-card style="flex: 1">
		<md-card-header>
			<md-layout>
				<md-layout class="header-title" md-flex="60">
					<div class="md-title">{{ taskSelected.name }}</div>
				</md-layout>
				<md-layout md-align="end" md-vertical-align="start">
					<md-menu>
						<md-button md-menu-trigger>
							<md-icon>more_horiz</md-icon>
						</md-button>

						<md-menu-content>
							<md-menu-item @click.native="editTask">
								<div>
									<md-icon>edit</md-icon>
									Edit
								</div>
							</md-menu-item>
							<md-menu-item @click.native="removeTask">
								<div>
									<md-icon>delete</md-icon>
									Remove
								</div>
							</md-menu-item>
						</md-menu-content>
					</md-menu>
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

		<md-card-actions style="padding-right: 15px;">
			<span class="tag"
			      v-for="tag in taskSelected.tags">{{ tag }}</span>
		</md-card-actions>
	</md-card>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'

	import * as taskMutation from '../store/modules/tasks/tasks-mutations'
	import * as taskAction from '../store/modules/tasks/tasks-actions'

	import MdCardActions from "vue-material/src/components/mdCard/mdCardActions";

	export default {
		components: {MdCardActions},
		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			}),

			...mapState({
				tasks: state => state.tasks.all,
			})
		},

		methods: {
			close: function() {
				this.$store.commit(`tasks/${taskMutation.DESELECT_TASKS}`);
			},

			removeTask() {
				if (window.confirm(`You are sure delete this task "${this.taskSelected.name}"?`)) {
					const id = this.taskSelected.id;
					this.$store.commit(`tasks/${taskMutation.DESELECT_TASKS}`);
					this.$store.dispatch(`tasks/${taskAction.REMOVE}`, id);
				}
			},

			editTask() {
				const id = this.taskSelected.id;
				this.$router.push(`/task/edit/${id}`);
			}
		}
	}
</script>
<style scoped>
	.header-title, .md-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.close-btn {
		position: relative;
		top: -5px;
	}
</style>