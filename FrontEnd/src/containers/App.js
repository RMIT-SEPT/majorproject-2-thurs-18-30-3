import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
class App extends Component {
	state = {
		bookings: []
	}
	
	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/posts').then(
			res => res.json()).then(
				(data) => {
					this.setState({ bookings: data })
				}
			).catch(
				console.log
			)
	}
	
	
	render() {
		let bookings = this.state.bookings.map((booking) => {
			return (
		<tr key ={booking.id}>
						<td>{booking.id}</td>
						<td>{booking.title}</td>
						<td>{booking.body}</td>
						<td>
							<Button color = "success" size = "sm" className = "mr-2">Edit</Button>
							<Button color = "danger" size = "sm">Delete</Button>
						</td>
					</tr>
			)
		});
		return (
		<div className = "app container">
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>SERVICE</th>
						<th>DESCRIPTION</th>
						<th>ACTTION</th>
					</tr>
				</thead>
				
				<tbody>
					{bookings}
				</tbody>
			</Table>
		</div>
		);
	}
}
export default App;
