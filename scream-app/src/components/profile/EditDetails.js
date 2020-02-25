import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { editUserDetails } from '../../store/actions/userActions';
import MyButton from '../../util/MyButton';

const styles = (theme) => ({
	...theme.properties,
	button: {
		float: 'right',
	},
});

class EditDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false,
	};

	componentDidMount() {
		this.mapUserDetailsToState(this.props.credentials);
	}

	mapUserDetailsToState = (credentials) => {
		const { bio, website, location } = credentials;

		this.setState({
			bio: bio || '',
			website: website || '',
			location: location || '',
		});
	};

	handleOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		};

		this.props.editUserDetails(userDetails);

		this.handleClose();
	};

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
					<EditIcon color="primary" />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								rows="3"
								multiline
								placeholder="A short bio about yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="url"
								label="Website"
								placeholder="Your website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Where you live"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({
	credentials: user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
