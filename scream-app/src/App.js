import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#00bcd4',
			dark: '#008394',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff6333',
			main: '#ff3d00',
			dark: '#b22a00',
			contrastText: '#fff',
		},
	},
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Navbar />
					<div className="container">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Signup} />
						</Switch>
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

export default App;
