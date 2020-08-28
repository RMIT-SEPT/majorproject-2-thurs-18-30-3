import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

import ServiceList from '../containers/ServiceListContainer';
import EmployeeList from '../containers/EmployeeListContainer';
import ServiceDetail from '../containers/ServiceDetailContainer';

import Nav from '../components/Nav';
import About from '../components/About';
import Create from '../components/Create';
import Login from '../components/Login';

//Root Component

class App extends Component {	
	render() {
		return (
		<div className = "app-container">
			
			<Router>
				<Nav />
				<div className = "app-body">
					<Switch>
						<Route path ="/create" exact component = {Create} />
						<Route path ="/about" exact component = {About} />
						<Route path ="/login" exact component = {Login} />
						<Route path ="/employees" exact component = {EmployeeList} />
						<Route path ="/services" exact component = {ServiceList} />
						<Route path ="/bookings" exact component = {ServiceList} />
						<Route path ="/services/:id" component = {ServiceDetail} />
					</Switch>
				</div>
			</Router>
			<footer>
				<hr className = "sector-divider"/>
				<span>Carl Dietz 2020</span>
			</footer>
		</div>
		);
	}
}
export default App;
