import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

import Nav from '../components/Nav';
import About from '../components/About';
import Create from '../components/Create';
import Login from '../components/Login';
import Bookings from '../components/Bookings';
import BookingDetail from '../components/BookingDetail';

class App extends Component {	
	render() {
		return (
		<div className = "app container">
			<Router>
				<Nav />
				<Switch>
					<Route path ="/create" exact component = {Create} />
					<Route path ="/about" exact component = {About} />
					<Route path ="/login" exact component = {Login} />
					<Route path ="/bookings" exact component = {Bookings} />
					<Route path ="/bookings/:id" component = {BookingDetail} />
				</Switch>
			</Router>
		</div>
		);
	}
}
export default App;
