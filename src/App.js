import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class App extends Component {
	state = {
		selectedMenuTab: 0,
		isAuthenticated: false
	};

	handleNavMenuChange = (event, selectedMenuTab) => {
		this.setState({ selectedMenuTab });
	};

	handleAuthenticationChange = authenticated => {
		this.setState({ authenticated });
	};

	render() {
		const { classes } = this.props;
		const { selectedMenuTab, isAuthenticated } = this.state;

		return (
			<Router>
				<div>
					<div className={classes.root}>
						<Header
							handleNavMenuChange={this.handleNavMenuChange}
							selectedMenuTab={selectedMenuTab}
						/>
					</div>
					<PrivateRoute
						path="/"
						exact
						authenticated={isAuthenticated}
						render={() => (
							<Main selectedMenuTab={selectedMenuTab} />
						)}
					/>
					{/* Comment out the private route and enable the one below to access the main part of the app */}
					{/* <Route
						path="/"
						render={() => (
							<Main selectedMenuTab={selectedMenuTab} />
						)}
					/> */}
					<Route
						path="/login"
						render={() => (
							<Login
								handleAuthenticationChange={
									this.handleAuthenticationChange
								}
							/>
						)}
					/>
					<Route
						path="/register"
						render={() => (
							<Register
								handleAuthenticationChange={
									this.handleAuthenticationChange
								}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default withStyles(styles)(App);
