import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../containers/App.css';

class Bookings extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookings: []
        }
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
					<Link to={`/bookings/${booking.id}`}>
                        <td>{booking.title}</td>
                    </Link>
				<td>{booking.body}</td>
				<td>
					<Button color = "success" size = "sm" className = "mr-2">Edit</Button>
					<Button color = "danger" size = "sm">Delete</Button>
				</td>
			</tr>
			) 
		});
		return (
		<div className = "bookings-list">
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>SERVICE</th>
						<th>DESCRIPTION</th>
						<th>ACTION</th>
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
export default Bookings;