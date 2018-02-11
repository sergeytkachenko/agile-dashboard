<template>
	<md-card>
		<md-card-content>
			<md-button @click.native="cancel" class="back">
				<md-icon>keyboard_backspace</md-icon>
				Back to sprint
			</md-button>

			<form novalidate @submit.stop.prevent="submit">
				<md-input-container>
					<label>Task title</label>
					<md-input required v-model="task.name"></md-input>
				</md-input-container>
				<md-input-container>
					<label>Task description</label>
					<md-textarea required v-model="task.description"></md-textarea>
				</md-input-container>
				<md-input-container>
					<label for="sprint">Sprint</label>
					<md-select name="sprint" id="sprint" v-model="task.sprintId" required>
						<md-option :value="sprint.id"
						           style="width: 240px" v-for="sprint in sprints">{{ sprint.name }}</md-option>
					</md-select>
				</md-input-container>
			</form>
		</md-card-content>

		<md-card-actions>
			<md-button class="md-raised" @click.native="cancel">Cancel</md-button>
			<md-button class="md-raised md-accent" @click.native="save" style="margin-left: 16px">Save</md-button>
		</md-card-actions>

	</md-card>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import * as sprintAction from '../store/modules/sprints/sprints-actions'
	import * as taskAction from '../store/modules/tasks/tasks-actions'

	export default {

		computed: {
			...mapGetters('tasks', {
				byId: 'byId'
			}),

			...mapState({
				sprints: state => state.sprints.all
			}),

			task() {
				return this.byId(this.taskId) || {};
			}
		},

		mounted() {
			this.$store.dispatch(`sprints/${sprintAction.FETCH_ALL}`);
		},

		methods: {
			cancel: function() {
				this.$router.back();
			},

			save() {
				const action = this.task.id ? `tasks/${taskAction.SAVE}` : `tasks/${taskAction.ADD}`;
				this.$store.dispatch(action, this.task).then(() => {
					this.$router.back();
				});
			}
		},

		props: ['taskId']
	}
</script>