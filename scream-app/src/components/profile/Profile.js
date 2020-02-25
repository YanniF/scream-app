import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

import { Button, Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { LocationOn, CalendarToday, KeyboardReturn } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';

import MyButton from '../../util/MyButton';
import EditDetails from './EditDetails';
import { logoutUser, uploadImage } from '../../store/actions/userActions';
import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = (theme) => ({
	...theme.properties,
});

class Profile extends Component {
	handleImageChange = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);

		this.props.uploadImage(formData);
	};

	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			classes,
			user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated },
		} = this.props;

		let profileMarkup = !loading ? authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile" className="profile-image" />
						<input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
						<MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
							<EditIcon color="primary" />
						</MyButton>
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
							@{handle}
						</MuiLink>
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<Fragment>
								<LocationOn color="primary" /> <span>{location}</span>
								<hr />
							</Fragment>
						)}
						{website && (
							<Fragment>
								<LinkIcon color="primary" />
								<a href={website} target="_blank" rel="noopener noreferrer">
									{' '}
									{website}
								</a>
								<hr />
							</Fragment>
						)}
						<CalendarToday color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
					</div>
					<MyButton tip="Logout" onClick={this.handleLogout}>
						<KeyboardReturn color="primary" />
					</MyButton>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					No profile found, please login again
				</Typography>
				<div className={classes.buttons}>
					<Button variant="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
					<Button variant="contained" color="secondary" component={Link} to="/signup">
						Signup
					</Button>
				</div>
			</Paper>
		) : (
			<ProfileSkeleton />
		);

		return profileMarkup;
	}
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	uploadImage: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
