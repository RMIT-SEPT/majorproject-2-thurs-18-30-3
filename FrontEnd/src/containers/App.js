import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import ServiceList from '../containers/ServiceListContainer'
import EmployeeList from '../containers/EmployeeListContainer'

import Nav from '../components/Nav'
import About from '../components/About'
import Create from '../components/Create'
import Login from '../components/Login'
import ServiceDetailContainer from '../containers/ServiceDetailContainer'
import AddServiceContainer from '../containers/AddServiceContainer'
// import Booking from '../components/Booking'

import CurrentUser from '../context/CurrentUser'
import AuthService from '../services/auth.service'
import EmployeeMyService from '../pages/EmployeeMyServices'

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

  function LoginRoute({children, ...rest}) {
    return (
      // Show the component only when the user is logged in
      <Route {...rest} render={() => (user ? <Redirect to="/services" /> : children)} />
    )
  }

  //Routing list of major pages in application
  return (
    <Router>
      <CurrentUser.Provider value={[user, setUser]}>
        <Nav />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/add" exact component={AddServiceContainer} />
          <Route path="/create" exact component={Create} />

          <LoginRoute path="/login">
            <Route path="/login" exact component={Login} />
          </LoginRoute>

          <PrivateRoute path="/">
            <Route path="/services" exact component={ServiceList} />
            <Route path="/employees" exact component={EmployeeList} />
            <Route path="/myservices" exact component={EmployeeMyService} />
            {/*<Route path="/bookings" exact component={Booking} />*/}
            <Route path="/services/:id" component={ServiceDetailContainer} />
          </PrivateRoute>
        </Switch>
      </CurrentUser.Provider>
    </Router>
  )
}

export default App
