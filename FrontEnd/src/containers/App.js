import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

import ServiceList from '../containers/ServiceListContainer';
import EmployeeList from '../containers/EmployeeListContainer';

import Nav from '../components/Nav';
import About from '../components/About';
import Create from '../components/Create';
import Login from '../components/Login';
import BookingDetail from '../components/BookingDetail';

//Root Component

class App extends Component {	
	render() {
		return (
		<div className = "app-container">
			<Router>
				<Nav />
				<Switch>
					<Route path ="/create" exact component = {Create} />
					<Route path ="/about" exact component = {About} />
					<Route path ="/login" exact component = {Login} />
					<Route path ="/employees" exact component = {EmployeeList} />
					<Route path ="/services" exact component = {ServiceList} />
					<Route path ="/bookings" exact component = {ServiceList} />
					<Route path ="/bookings/:id" component = {BookingDetail} />
				</Switch>
			</Router>
		</div>
		);
	}
}
export default App;
