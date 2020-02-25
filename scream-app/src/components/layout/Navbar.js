import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import MyButton from '../../util/MyButton';
import PostScream from '../screams/PostScream';
import Notifications from './Notifications';

class Navbar extends Component {
	render() {
		const { authenticated } = this.props;

		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostScream />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<Notifications />
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	authenticated: user.authenticated,
});

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
