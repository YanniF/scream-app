import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import AppIcon from '../images/icon.png';
import { loginUser } from '../store/actions/userActions';

const styles = (theme) => ({
	...theme.properties,
});

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.loginUser(userData, this.props.history);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		const { classes, UI: { loading } = {} } = this.props;
		const { errors } = this.state;

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
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.ui,
});

const mapDispatchToProps = {
	loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
