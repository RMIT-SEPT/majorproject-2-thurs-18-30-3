import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import ServiceList from '../containers/ServiceListContainer'
import EmployeeList from '../containers/EmployeeListContainer'

import NavigationBar from '../components/NavigationBar'
import About from '../components/About'
import Create from '../components/Create'
import Login from '../components/Login'
import BookingDetail from '../components/BookingDetail'
// import Booking from '../components/Booking'

import CurrentUser from '../context/CurrentUser'
import AuthService from '../services/auth.service'

//Root Component

function App() {
  const [user, setUser] = useState(AuthService.getCurrentUser())

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute({children, ...rest}) {
    return (
      <Route
        {...rest}
        render={({location}) =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: location},
              }}
            />
          )
        }
      />
    )
  }

  return (
    <Router>
      <CurrentUser.Provider value={[user, setUser]}>
        <NavigationBar />
        <Switch>
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/about" exact component={About} />

          <PrivateRoute path="/">
            <Route path="/services" exact component={ServiceList} />
            <Route path="/employees" exact component={EmployeeList} />
            {/*<Route path="/bookings" exact component={Booking} />*/}
            <Route path="/bookings/:id" component={BookingDetail} />
          </PrivateRoute>
        </Switch>
      </CurrentUser.Provider>
    </Router>
  )
}

export default App
