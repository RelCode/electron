import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Grid, TextField, Typography, Button, LinearProgress } from "@mui/material";
import './../assets/css/authScreen.css';

const AuthScreen = ({ setCookie }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleLogin = async (e) => {
        e.preventDefault();
        if(username === ""){
            showMessage("Input Username");
        }else if(password === ""){
            showMessage("Input Password");
        }else{
            setLoggingIn(true);
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth`,{
                username: username,
                password: password
            }).then(({data}) => {
                setCookie('sessionToken', data.accessToken,{
                    path: '/',
                    maxAge: 3600 * 8
                });
            }).catch(err => {
                showMessage(err.response.data.message);
            }).finally(() => {
                setLoggingIn(false);
            });
        }
    }
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        },3000);
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        },1000)
    },[]);
    if(loading){
        return (
            <></>
        )
    }
    return (
        <div className="login">
            <Container maxWidth="sm" className="shadow-container">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Login
                    </Typography>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <Grid container spacing={2}>
                            <Grid item container xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                    />
                            </Grid>
                            <Grid item container xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loggingIn}
                                    >
                                        LET ME IN
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    loggingIn ? <LinearProgress /> : null
                                }
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Container maxWidth="sm" className="warning-box">
                    {
                        message !== null ? <Typography className="error">{message}</Typography> : null
                    }
                </Container>
            </Container>
        </div>
    )
}

export default AuthScreen;