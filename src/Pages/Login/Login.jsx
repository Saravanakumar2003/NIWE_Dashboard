import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { Paper } from "@mui/material"

const Login = ({ currUser, notify }) => {
    const navigate = useNavigate()
    const theme = createTheme();

    const [studentSignIn] = useState(true) // if the user is signing in as a student or as an admin

    const [error, setError] = useState("this is") // error state to store the error message
    const [userData, setUserData] = useState({ // userData state to store the user data
        email: "",
        password: "",
    })

    useEffect(() => {
        if (currUser) { // if the currUser state is not empty
            navigate("/studentDashboard") 
            return
        }
    }, [currUser, navigate]) // if the currUser state changes, navigate to the student dashboard

    useEffect(() => { // when the component is mounted
        setError("") // set the error to empty
    }, []) 

    const signInEmailFunction = async (email, password) => { // sign in with email and password
        try { 
            await signInWithEmailAndPassword(auth, userData.email, userData.password) 
            console.log('Signed In Successfully !'); // log the success message
            if (studentSignIn) {
                navigate("/studentDashboard") 
            }
        } catch (error) { // if error occurs
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " ")) // set the error to the error code
            console.log(error) // log the error
        }
    }

    const forgotPassword = async () => { // when the forgot password button is clicked
        try { // try to send the password reset email

            await sendPasswordResetEmail(auth, userData.email) // send the password reset email
            notify("Password reset email sent!", "info") // notify the user that the password reset email has been sent
        }
        catch (error) { // if error occurs
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " ")) // set the error to the error code
            console.log(error) // log the error
        }

    }

    const handleChange = (event) => {   // when the input is changed
        const { name, value } = event.target // get the name and value of the input
        setUserData({ // set the userData state
            ...userData, // spread operator to copy the userData state
            [name]: value, // set the value of the input to the userData state
        })
    }

    const handleSubmit = (event) => { // when the form is submitted
        event.preventDefault(); // prevent the default form submit behaviour
        setError("") // set the error to empty
        signInEmailFunction() // call the signInEmailFunction
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Paper elevation={3} sx={{ margin: 4, padding: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {
                                    studentSignIn ? "Student | " : "Admin | "
                                }
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            value={userData.email}
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            value={userData.password}
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>


                                    {error ? // if error is not empty
                                        <>
                                            <Grid item xs={12}> {/* display error */}
                                                <Alert severity="error">{error}</Alert>
                                            </Grid>
                                        </>
                                        : <></>}
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    <LoginIcon sx={{ marginRight: 1 }} />Sign In
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2" onClick={forgotPassword}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={() => navigate("/signup")}> 
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default Login