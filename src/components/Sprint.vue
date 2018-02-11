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

	export default {

		created: function() {
			//this.$store.dispatch('groups/loadByVoting', { votingId: this.votingId })
			//this.$store.dispatch('features/loadByVoting', { votingId: this.votingId })
		},

		computed: {
			...mapGetters('tasks', {
				taskSelected: 'selected'
			})
		},

		components: {
		  CardBoard,
		  CardInfo
		},

		props: [
			'sprintId'
		]
	}
</script>