import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import ServiceList from '../containers/ServiceListContainer'
import EmployeeList from '../containers/EmployeeListContainer'

import Nav from '../components/Nav'
import About from '../components/About'
import Create from '../components/Create'
import Login from '../components/Login'
import ServiceDetail from '../components/ServiceDetail'
// import Booking from '../components/Booking'

import AuthService from '../services/auth.service'
import CurrentUser from '../context/CurrentUser'

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
        <Nav />
        <Switch>
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/about" exact component={About} />

          <PrivateRoute path="/">
            <Route path="/services" exact component={ServiceList} />
            <Route path="/employees" exact component={EmployeeList} />
            {/*<Route path="/bookings" exact component={Booking} />*/}
            <Route path="/services/:id" component={ServiceDetail} />
          </PrivateRoute>
        </Switch>
      </CurrentUser.Provider>
    </Router>
  )
}

export default App
