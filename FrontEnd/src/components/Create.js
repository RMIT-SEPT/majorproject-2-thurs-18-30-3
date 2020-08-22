import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActions, CardContent, TextField, Button, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import AuthService from '../services/auth.service'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8, 'Must be at least 8 characters').max(19, 'Must be less than 20 characters'),
  confirmPassword: yup
    .string()
    .required()
    .min(8, 'Must be at least 8 characters')
    .max(20, 'Must be not more than 20 characters'),
  email: yup.string().email().required(),
  mobile: yup
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
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const onSubmit = async (data) => {
    console.log('Registration data', data)
    const {username, password, confirmPassword, email} = data
    if (password !== confirmPassword) return setAlertMsg('Password mismatch')

    try {
      await AuthService.register(username, email, password)
      setRegisterSuccess(true)
      setAlertMsg('Successfully registered')
    } catch (err) {
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
              <TextField
                inputRef={register}
                name="username"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
              />
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
                  name="mobile"
                  label="Mobile phone"
                  variant="outlined"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              </div>

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
                  Sign In
                </Button>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={!!alertMsg}>
        <Alert onClose={handleClose} severity={registerSuccess ? 'success' : 'error'}>
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
