import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActions, CardContent, TextField, Button, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import AuthService from '../services/auth.service'
import CurrentUser from '../context/CurrentUser'
//Use react hook form
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required().min(8, 'Must be at least 8 characters').max(19, 'Must be less than 20 characters'),
  confirmPassword: yup
    .string()
    .required()
    .min(8, 'Must be at least 8 characters')
    .max(20, 'Must be not more than 20 characters'),
  email: yup.string().email().required(),
  address: yup.string().required(),
  mobileNum: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be at least 10 digits')
    .max(12, 'Must be less than 13 digits')
    .default(),
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Create = () => {
  const classes = useStyles()
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  })
  const [alertMsg, setAlertMsg] = useState('')

  const [, setCurrentUser] = useContext(CurrentUser)
  const history = useHistory()
  //Checking whether confirm password match password
  //Before POST request to the backend
  const onSubmit = async (data) => {
    console.log('Registration data', data)
    const {firstName, lastName, username, email, address, mobileNum, password, confirmPassword} = data
    if (password !== confirmPassword) return setAlertMsg('Password mismatch')

    try {
      const payload = {
        firstName,
        lastName,
        username,
        email,
        address,
        mobileNum,
        password,
        confirmPassword,
      }
      const userData = await AuthService.register(payload)
      setCurrentUser(userData)
      history.push('/services')
    } catch (err) {
      console.error('Register response error from backend', err.response)
      const resMessage = err.response?.data?.message ?? err.message
      setAlertMsg(resMessage)
    }
  }

  const handleClose = () => {
    setAlertMsg('')
  }

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={classes.card}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <h3>Register</h3>
              <div>
                <TextField
                  inputRef={register}
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  inputRef={register}
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </div>
              <div>
                <TextField
                  inputRef={register}
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  inputRef={register}
                  name="mobileNum"
                  label="Mobile phone"
                  variant="outlined"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              </div>
              <TextField
                inputRef={register}
                name="username"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
              />
              <TextField
                inputRef={register}
                name="address"
                multiline={true}
                label="Address"
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address?.message}
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
                fullWidth
              />
              <TextField
                inputRef={register}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="submit" variant="contained" color="primary">
                  Create Account
                </Button>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={!!alertMsg}>
        <Alert onClose={handleClose} severity={'error'}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

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

export default Create
