import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store/store';
import { SET_AUTHENTICATED } from './store/types';
import AuthRoute from './util/AuthRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';
import themeObject from './util/theme';

const theme = createMuiTheme(themeObject);
let authenticated;

const token = localStorage.FBIdToken;

if (token) {
	const decodedToken = jwtDecode(token);

	if (decodedToken.exp * 1000 < Date.now()) {
		authenticated = false;
		window.location.href = '/login';
	}
	else {
		authenticated = true;
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
								<AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
								<AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
							</Switch>
						</div>
					</BrowserRouter>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
