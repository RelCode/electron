import { useState } from "react";
import { Button, Container, Box, Typography, Grid, TextField } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

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
        username: '',
        firstName: '',
        lastName: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formValues.username}
                                    onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                    type="email"
                                    required
                                />
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={12} md={6}>
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
                                <Grid item xs={12} md={6} sm={{ marginTop: 2 }}>
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