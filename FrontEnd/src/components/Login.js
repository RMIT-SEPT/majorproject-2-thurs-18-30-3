import React, {useContext, useState} from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import {Button, Card, CardActions, CardContent, Grid, Snackbar, TextField} from '@material-ui/core'
import {yupResolver} from '@hookform/resolvers/yup'
import {makeStyles} from '@material-ui/core/styles'

import UserType from '../config/userType'
import AuthService from '../services/auth.service'
import CurrentUser from '../context/CurrentUser'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8, 'Must be at least 8 characters').max(19, 'Must be less than 20 characters'),
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

//Handles form input when user clicks submit
const Login = () => {
  const classes = useStyles()
  const [active] = React.useState('true')

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  })
  const [alertMsg, setAlertMsg] = useState('')
  const [, setCurrentUser] = useContext(CurrentUser)
  const history = useHistory()

  //Verifies user and initialises currentUser variable
  const handleLogin = async (data) => {
    const {username, password} = data
    //Calling login function to make a GET REQUEST
    try {
      const user = await AuthService.login(username, password)
      setCurrentUser(user)

      if (user.userType.toLowerCase() === UserType.Customer) history.push('/services')
      else if (user.userType.toLowerCase() === UserType.Admin) history.push('/employees')
      else history.push('/')
    } catch (err) {
      console.error('Login response error from backend', err.response)
      const resMessage = err.response?.data?.message ?? err.message
      setAlertMsg(resMessage)
    }
  }

  //Handle Panel close
  const handleClose = () => {
    setAlertMsg('')
  }

  //Main login form
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={classes.card}>
          <form noValidate autoComplete="off" fieldset onSubmit={handleSubmit(handleLogin)}>
            <CardContent>
              <h3>Login</h3>
              <TextField
                inputRef={register}
                name="username"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
                enabled={active}
                fullWidth
              />

              <TextField
                inputRef={register}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                enabled={active}
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="submit" variant="contained" color="primary" enabled={active}>
                  Sign In
                </Button>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={!!alertMsg}>
        <Alert onClose={handleClose} severity="error">
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

//Styles for login
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  card: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
}))

export default Login
