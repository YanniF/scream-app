import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import store from './store/store';
import { SET_AUTHENTICATED } from './store/types';
import { logoutUser, getUserData } from './store/actions/userActions';

import AuthRoute from './util/AuthRoute';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

import './App.css';
import themeObject from './util/theme';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL = 'https://europe-west1-yanni-scream.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
	const decodedToken = jwtDecode(token);

	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
	else {
		// move to actions
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<BrowserRouter>
						<Navbar />
						<div className="container">
							<Switch>
								<Route path="/" exact component={Home} />
								<AuthRoute exact path="/login" component={Login} />
								<AuthRoute exact path="/signup" component={Signup} />
								<Route exact path="/users/:handle" component={User} />
								<Route exact path="/users/:handle/scream/:screamId" component={User} />
							</Switch>
						</div>
					</BrowserRouter>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
