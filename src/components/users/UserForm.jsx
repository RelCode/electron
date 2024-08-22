import { useState, useEffect } from "react";
import { Button, Container, Box, Typography, Grid, TextField, Select, MenuItem } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import './../../assets/css/userForm.css';

const fetchUserTypes = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/userTypes`);
    console.log('fetchUserTypes RES', data);
    return data;
}

const UserForm = ({ type }) => {
    const [cookies] = useCookies(['sessionToken']);
    const [user, setUser] = useState({});
    const { data, isLoading, error } = useQuery('userTypes', fetchUserTypes, {
        initialData: () => {
            return {
                types: [{
                    typeID: 1,
                    typeName: 'operator'
                }]
            }
        }
    });
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        userType: 0,
        password: '',
        confirm: ''
    });
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState('error');

    const generateSelectItems = () => {
        const types = data.types;
        let options = [<MenuItem value={0} key={0}>Select User Type</MenuItem>];
        if(Object.values(user).length > 0){
            types.map((type, index) => {
                //users with more privileges have lower numerical typeID. e.g) super admin has an ID of 1 and Operator = 4. therefore minus typeIDs will only equal 0 or less for lesser privileges
                if ((user.typeID - type.typeID) >= 0 && user.typeID > 1) {
                    return;
                }
                options.push(<MenuItem value={type.typeID} key={index + 1}>{type.typeName.charAt(0).toUpperCase()}{(type.typeName).substring(1)}</MenuItem>);
            });
        }
        return options;
    }

    const handleSubmit = async (e) => {
        // console.log(formValues);
        e.preventDefault();
        // Handle form submission
        if(formValues.firstName === ""){
            showMessage("Provide First Name");
        }else if(formValues.lastName === ""){
            showMessage("Provide Last Name");
        }else if (formValues.userName === "") {
            showMessage("Provide User Name");
        }else if (isNaN(formValues.userType) || formValues.userType < 1) {
            showMessage("Select a Valid User Type");
        } else if (formValues.password === "") {
            showMessage("Provide a Secure Password");
        } else if (formValues.confirm === "") {
            showMessage("Repeat the Provided Password");
        } else if (formValues.password.toLowerCase() !== formValues.confirm.toLowerCase()) {
            showMessage("Passwords Provided Should Match");
        }else{
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/create`, {
                payload: formValues
            }, {
                headers: {
                    Authorization: `Bearer ${cookies?.sessionToken}`
                }
            }).then(response => {
                setStatus('success');
                showMessage(response.data.message,() => {
                    console.log('Callback');
                    setStatus('error');
                })
            }).catch(err => {
                console.log(err);
                // showMessage(err.response.data.message);
            })
        }
    };

    const showMessage = (msg, cb) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
            cb && cb();
        }, 3000);
    }

    const decodeToken = () => {
        const userData = jwtDecode(cookies?.sessionToken);
        setUser(userData);
    }
    useEffect(() => {
        decodeToken();
        // testGet();
    },[]);
    return (
        <>
            <Container maxWidth="sm" sx={{ ml: {
                sm: 0,
                md: 'auto'
            } }} className="shadow-container">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item container xs={12}>
                                <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstname"
                                        value={formValues.firstName}
                                        onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{
                                    mt: { xs: 2, sm: 0 },
                                    pl: { sm: 1 }
                                }}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastname"
                                        value={formValues.lastName}
                                        onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={formValues.userName}
                                        onChange={(e) => setFormValues({ ...formValues, userName: e.target.value })}
                                        type="text"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{
                                    mt: { xs: 2, sm: 0 },
                                    pl: { sm: 1 }
                                }}>
                                    <Select
                                        fullWidth
                                        label="Select User Type"
                                        name="password"
                                        value={formValues.userType}
                                        onChange={(e) => setFormValues({ ...formValues, userType: e.target.value })}
                                    >
                                        {
                                            generateSelectItems()
                                        }
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="Create Password"
                                        name="password"
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        type="password"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ 
                                    mt: { xs: 2, sm: 0 },
                                    pl: { sm: 1 } 
                                    }}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="password"
                                        value={formValues.confirm}
                                        onChange={(e) => setFormValues({ ...formValues, confirm: e.target.value })}
                                        type="password"
                                        
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    { type === 'create' ? 'Create User' : 'Edit User' }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Container maxWidth="sm" className="warning-box">
                    {
                        message !== null ? <Typography className={ status }>{message}</Typography> : null
                    }
                </Container>
            </Container>
        </>
    )
}

export default UserForm;