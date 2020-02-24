import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import { likeScream, unlikeScream } from '../store/actions/dataActions'
import MyButton from '../util/MyButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
	},
	image: {
		minWidth: 200,
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
};

const Scream = (props) => {
	const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user: { authenticated } } = props;
	dayjs.extend(relativeTime);

	const likedScream = () => {
		return props.user.likes && props.user.likes.find(like => like.screamId === screamId)
	}

	const likeScream = () => {
		props.likeScream(screamId)
	}

	const unlikeScream = () => {
		props.unlikeScream(screamId)
	}

	let likeButton

	if(!authenticated) {
		likeButton = (
			<MyButton tip='Like'>
				<Link to='/login'>
					<FavoriteBorder color="primary" />
				</Link>
			</MyButton>
		)
	}
	else {
		const isLiked = likedScream()

		if(isLiked) {
			likeButton = (
				<MyButton tip='Unlike' onClick={unlikeScream}>
					<FavoriteIcon color="primary"/>
				</MyButton>
			)
		}
		else {
			likeButton = (
				<MyButton tip='Like' onClick={likeScream}>
					<FavoriteBorder color="primary"/>
				</MyButton>
			)
		}
	}

	return (
		<Card className={classes.card}>
			<CardMedia image={userImage} title={'Profile image'} className={classes.image} />
			<CardContent className={classes.content}>
				<Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
					{userHandle}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="body1">{body}</Typography>
				{likeButton}
				<span>{likeCount} likes</span>
				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} comments</span>
			</CardContent>
		</Card>
	);
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = {
	likeScream,
	unlikeScream,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream));
