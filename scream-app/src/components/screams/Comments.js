import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%',
	},
	commentData: {
		marginLeft: 20,
	},
});

const Comments = ({ comments, classes }) => {
	return (
		<Grid container>
			{comments &&
				comments.map((comment, index) => {
					const { body, createdAt, userImage, userHandle } = comment;

					return (
						<React.Fragment key={createdAt}>
							<Grid item sm={12}>
								<Grid container>
									<Grid item sm={2}>
										<img src={userImage} alt="comment" className={classes.commentImage} />
									</Grid>
									<Grid item sm={9}>
										<div className={classes.commentData}>
											<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
												{userHandle}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												{dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
											</Typography>
											<hr className={classes.invisibleSeparator} />
											<Typography variabnt="body1">{body}</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							{index !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
						</React.Fragment>
					);
				})}
		</Grid>
	);
};

Comments.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
