import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import AppIcon from '../images/icon.png';
// import { loginUser } from '../redux/actions/userActions';
import axios from 'axios';

const styles = (theme) => ({
	...theme.properties,
});

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
		loading: false,
	};

	/* componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
  } */

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.post('/login', userData)
			.then((res) => {
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
				this.setState({ loading: false });

				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					errors: err.response.data,
					loading: false,
				});
			});
		// this.props.loginUser(userData, this.props.history);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		// const { classes, UI: { loading } } = this.props;
		const { classes } = this.props;
		const { errors, loading } = this.state;

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="monkey" className={classes.image} />
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={!!errors.email}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors.password}
							error={!!errors.password}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
							Login
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
						<br />
						<br />
						<small>
							Don't have an account? Sign up <Link to="/signup">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
