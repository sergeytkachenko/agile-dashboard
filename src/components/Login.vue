<template>
	<md-layout>
		<md-layout md-flex-medium="15" />
		<md-layout md-flex-medium="70" md-column>
			<md-card style="flex: 1; margin-top: 20%">
				<md-card-header>
					<div class="md-title">Login form</div>
					<error class="md-subhead" :message="error"></error>
					<success class="md-subhead" :message="success"></success>
				</md-card-header>
				<md-divider></md-divider>
				<md-card-content>
					<form novalidate @submit.stop.prevent="submit">
						<md-input-container>
							<label>Enter you login</label>
							<md-input required v-model="login" @change="changeForm"
							          @keyup.enter.native="doLogin"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Enter you password</label>
							<md-input required type="password" v-model="password"
							          @change="changeForm" @keyup.enter.native="doLogin"></md-input>
						</md-input-container>
					</form>
				</md-card-content>
				<md-card-actions>
					<md-progress class="md-warn" md-indeterminate v-if="loading"></md-progress>
					<md-button class="md-raised md-primary" @click.native="doLogin" :disabled="loading">
						Login
					</md-button>
				</md-card-actions>
			</md-card>
		</md-layout>
		<md-layout md-flex-medium="15" />
	</md-layout>
</template>
<script>
	import { mapState } from 'vuex'
	import Error from './Error'
	import Success from './Success'

	import * as userMutation from '../store/modules/user/user-mutations'

	export default {

		computed: {
			...mapState({
				user: state => state.user.current
			})
		},

		data: () => ({
			login: '',
			password: '',
			error: null,
			success: null,
			loading: false
		}),

		created: function () {
			this.login = this.$localStorage.get('login');
			this.$store.commit(`user/${userMutation.CLEAR_CURRENT_USER}`);
		},

		methods: {

			changeForm: function() {
				this.error = null;
			},

			doLogin: function () {
				this.loading = true;
				let params = {
					login: this.login,
					password: this.password
				};
				this.$http.post('/api/login', params).then(res => {
					this.loading = false;
					let body = res.body;
					this.error = body.error;
					this.success = body.message;
					if (body.success) {
						this.$store.commit(`user/${userMutation.SET_CURRENT}`, {
							id: body.id,
							token: body.token,
							login: this.login
						});
						this.successRedirect();
					}
				}).catch(res => {
					this.loading = false;
					this.error = res.bodyText || res.body;
				});
			},

			successRedirect: function() {
				this.$router.push('/')
			}
		},
		components: {
			Error,
			Success
		}
	};
</script>
