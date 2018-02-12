<template>
	<md-layout md-gutter>
		<md-layout :md-flex="taskSelected ? 80: 100">
			<card-board></card-board>
		</md-layout>
		<md-layout md-flex="20" v-if="taskSelected">
			<card-info></card-info>
		</md-layout>
	</md-layout>
</template>

<script>
	import { mapGetters } from 'vuex'

	import CardBoard from '../components/CardBoard.vue'
	import CardInfo from '../components/CardInfo.vue'
	import * as groupAction from '../store/modules/groups/groups-actions'

	export default {

		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			})
		},

		created() {
			this.$store.dispatch(`groups/${groupAction.FETCH_ALL}`);
			this.$store.dispatch(`tasks/${groupAction.FETCH_ALL}`);
		},

		components: {
		  CardBoard,
		  CardInfo
		}
	}
</script>