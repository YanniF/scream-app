import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';

class Home extends Component {
	state = {
		screams: null,
	};

	componentDidMount() {
		axios
			.get('/screams')
			.then((res) => {
				this.setState({
					screams: res.data,
				});
			})
			.catch((err) => console.error(err));
	}

	render() {
		const { screams } = this.state;

		return (
			<Grid container spacing={3}>
				<Grid item sm={8} xs={12}>
					{screams ? screams.map((scream) => <Scream key={Math.random()} scream={scream} />) : <p>Loading...</p>}
				</Grid>
				<Grid item sm={4} xs={12}>
					profile
				</Grid>
			</Grid>
		);
	}
}

export default Home;
