import React, { useState } from "react";
import * as yup from 'yup'
import AuthService from "../services/auth.service";
import MuiAlert from "@material-ui/lab/Alert";
import {useForm} from "react-hook-form";
import {Button, Card, CardActions, CardContent, Grid, Snackbar} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {yupResolver} from "@hookform/resolvers";
import {makeStyles} from "@material-ui/core/styles";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(8, 'Must be at least 8 characters').max(19, 'Must be less than 20 characters'),
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}



const Login = () => {
    const classes = useStyles()
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    })
    const [alertMsg, setAlertMsg] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false)

    const handleLogin = async (data) => {
        console.log('Login data', data)
        const {username,password} = data

        try {
            await AuthService.login(username,password)
            setLoginSuccess(true)
            setAlertMsg('Successfully login')
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
                <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
                    <CardContent>
                        <h3>Login</h3>
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
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password?.message}
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
                <Alert onClose={handleClose} severity={loginSuccess ? 'success' : 'error'}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </div>
    );
};

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

export default Login;