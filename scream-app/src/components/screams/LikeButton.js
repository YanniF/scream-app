import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import MyButton from '../../util/MyButton';
import { likeScream, unlikeScream } from '../../store/actions/dataActions';

const LikeButton = (props) => {
	const { screamId, user: { authenticated } } = props;

	const likedScream = () => {
		return props.user.likes && props.user.likes.find((like) => like.screamId === screamId);
	};

	const likeScream = () => {
		props.likeScream(screamId);
	};

	const unlikeScream = () => {
		props.unlikeScream(screamId);
	};

	let likeButton;

	if (!authenticated) {
		likeButton = (
			<Link to="/login">
				<MyButton tip="Like">
					<FavoriteBorder color="primary" />
				</MyButton>
			</Link>
		);
	}
	else {
		const isLiked = likedScream();

		if (isLiked) {
			likeButton = (
				<MyButton tip="Unlike" onClick={unlikeScream}>
					<FavoriteIcon color="primary" />
				</MyButton>
			);
		}
		else {
			likeButton = (
				<MyButton tip="Like" onClick={likeScream}>
					<FavoriteBorder color="primary" />
				</MyButton>
			);
		}
	}

	return likeButton;
};

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = {
	likeScream,
	unlikeScream,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
