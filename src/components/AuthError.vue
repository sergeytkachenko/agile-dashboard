<template>
	<md-layout>
		<md-layout md-flex-medium="15" />
		<md-layout md-flex-medium="70" md-column>
			<md-card style="flex: 1; margin-top: 20%; text-align: center">
				<md-card-header>
					<div class="md-title">Authentication error</div>
				</md-card-header>
			</md-card>
		</md-layout>
		<md-layout md-flex-medium="15" />
	</md-layout>
</template>
<script>
	import * as userMutation from '../store/modules/user/user-mutations'

	export default {
		created: function() {
			this.$store.commit(`user/${userMutation.CLEAR_CURRENT_USER}`);
		}
	}
</script>