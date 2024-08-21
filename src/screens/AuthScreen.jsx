import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Grid, TextField, Typography, Button, CircularProgress } from "@mui/material";
import './../assets/css/authScreen.css';

const AuthScreen = ({ setCookie }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleLogin = async () => {
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
        },1500)
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
                        Create User
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item container xs={12}>
                                {/* <Grid item xs={12} md={6} sx={{ pr: { md: 1 } }}> */}
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                    />
                                {/* </Grid> */}
                            </Grid>
                            <Grid item container xs={12}>
                                {/* <Grid item xs={12} md={6} sx={{ pr: { md: 1 } }}> */}
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                    />
                                {/* </Grid> */}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    LET ME IN
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
            {/* <div className="login shadow-container">
                <h1>Login</h1>
                <form method="post">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    {
                        loggingIn ? <div style={{width:'100%',textAlign:'center'}}>
                            <CircularProgress
                                size={22}
                            />
                        </div> : <Button 
                                    className="btn-block"
                                    style={{backgroundColor:'#2196F3',color:'#FFF'}}
                                    onClick={handleLogin}
                                >Let Me In.</Button>
                        }
                    {
                        message !== null ? <div className="error-msg">{message}</div> : message
                    }
                </form>
            </div> */}
        </div>
    )
}

export default AuthScreen;