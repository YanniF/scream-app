import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/screams/Scream';
import StaticProfile from '../components/profile/StaticProfile';
// import ScreamSkeleton from '../util/ScreamSkeleton';
// import ProfileSkeleton from '../util/ProfileSkeleton';
import { getUserData } from '../store/actions/dataActions';

class user extends Component {
	state = {
		profile: null,
		screamIdParam: null,
	};

	componentDidMount() {
		const { handle, screamId } = this.props.match.params;

		if (screamId) {
			this.setState({ screamIdParam: screamId });
		}

		this.props.getUserData(handle);

		axios
			.get(`/user/${handle}`)
			.then((res) => {
				this.setState({
					profile: res.data.user,
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { screams, loading } = this.props.data;
		const { screamIdParam } = this.state;

		let screamsMarkup;

		if (loading) {
			// screamsMarkup = <ScreamSkeleton />
			screamsMarkup = <div>ScreamSkeleton</div>;
		}
		else if (screams === null) {
			screamsMarkup = <p>No screams from this user</p>;
		}
		else if (!screamIdParam) {
			screamsMarkup = screams.map((scream) => <Scream key={scream.screamId} scream={scream} />);
		}
		else {
			screams.map((scream) => {
				if (scream.screamId !== screamIdParam) {
					return <Scream key={scream.screamId} scream={scream} />;
				}
				else {
					return <Scream key={scream.screamId} scream={scream} openDialog />;
				}
			});
		}

		return (
			<Grid container spacing={4}>
				<Grid item sm={8} xs={12}>
					{screamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						// <ProfileSkeleton />
						<div>ProfileSkeleton</div>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = ({ data }) => ({
	data,
});

export default connect(mapStateToProps, { getUserData })(user);
