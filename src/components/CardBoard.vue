<template>
	<md-layout>
		<md-layout class="card-group" v-if="isShowUnSortingFeatures">
			<un-sorting-task-group :drop-id="everywhere"></un-sorting-task-group>
		</md-layout>
		<md-layout class="card-group" v-for="group in groups" :key="group.id" :item="group">
			<task-group :group="group" :drop-id="getGroupDrop(group)"></task-group>
		</md-layout>
	</md-layout>
</template>

<script>
	import '../less/card-board.less';

	import { mapState, mapGetters } from 'vuex'
	import TaskGroup from '../components/TaskGroup.vue'
	import UnSortingTaskGroup from '../components/UnSortingTaskGroup.vue'

	import * as sprintAction from '../store/modules/sprints/sprints-actions'

	export default {

		data: () => ({
			everywhere: 'everywhere'
		}),

		computed: {
			...mapState({
				groups: state => state.groups.all,
				isMultipleGroupsSortingMode: state => state.voting.isMultipleGroupsSortingMode,
				isAllowDropEverywhere: state => state.voting.isAllowDropEverywhere
			}),

			...mapGetters('groups', [
				'groups'
			]),

			isShowUnSortingFeatures: state => state.isMultipleGroupsSortingMode && state.isAllowDropEverywhere
		},

		methods: {

			getGroupDrop: function(group) {
				return this.isAllowDropEverywhere ? this.everywhere : group.id;
			}
		},

		mounted() {
			this.$store.dispatch(`sprints/${sprintAction.FETCH_CURRENT}`);
		},

		components: {
			TaskGroup,
			UnSortingTaskGroup
		}
	}
</script>