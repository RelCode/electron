import { useState } from "react";
import { Button, Container, Box, Typography, Grid, TextField, Select } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import './../../assets/css/userForm.css';

const fetchUserTypes = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/userTypes`);
    return data;
}

const UserForm = ({ type }) => {
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
        userType: '',
        password: '',
        confirm: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    return (
        <>
            <Container maxWidth="sm" className="shadow-container">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item container xs={12}>
                                <Grid item xs={12} md={6} sx={{ pr: { md: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstname"
                                        value={formValues.firstName}
                                        onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{
                                    mt: { xs: 2, md: 0 },
                                    pl: { md: 1 }
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
                                <Grid item xs={12} md={6} sx={{ pr: { md: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={formValues.userName}
                                        onChange={(e) => setFormValues({ ...formValues, userName: e.target.value })}
                                        type="text"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{
                                    mt: { xs: 2, md: 0 },
                                    pl: { md: 1 }
                                }}>
                                    <TextField
                                        fullWidth
                                        label="Select User Type"
                                        name="password"
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        type="text"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={12} md={6} sx={{ pr: { md: 1 } }}>
                                    <TextField
                                        fullWidth
                                        label="Create Password"
                                        name="password"
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        type="password"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ 
                                    mt: { xs: 2, md: 0 },
                                    pl: { md: 1 } 
                                    }}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="password"
                                        value={formValues.password}
                                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                                        type="password"
                                        required
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
            </Container>
        </>
    )
}

export default UserForm;