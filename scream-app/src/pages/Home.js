import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { getScreams } from '../store/actions/dataActions'

class Home extends Component {
	componentDidMount() {
		this.props.getScreams()
	}

	render() {
		const { screams, loading } = this.props.data;

		return (
			<Grid container spacing={3}>
				<Grid item sm={8} xs={12}>
					{!loading ? screams.map((scream) => <Scream key={scream.screamId} scream={scream} />) : <p>Loading...</p>}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

Home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

const mapStateToProps = ({ data }) => ({
	data,
})

export default connect(mapStateToProps, { getScreams })(Home);
