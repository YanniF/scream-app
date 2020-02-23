import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
	const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, CommentCount } } = props;
	dayjs.extend(relativeTime);

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
			</CardContent>
		</Card>
	);
};

export default withStyles(styles)(Scream);
