import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const ViewUsers = () => {
    const [cookies] = useCookies(['sessionToken']);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const fetchUsers = async () => {
        const users = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users`,{
            headers: {
                Authorization: `Bearer ${cookies?.sessionToken}`
            }
        }).then(response => {
            console.log('SUCCESS',response);
        }).catch(err => {
            console.log('ERR: ', err);
        }).finally(() => {
            console.log('finished loading users');
        });
    }
    useEffect(() => {
        fetchUsers();
    },[refreshUsers]);
    return (
        <div className="component users-container">
            <div>
                <Button 
                    startIcon={<Add/>}
                    href="/add-user" 
                    variant="contained"
                >Add User</Button>
            </div>
        </div>
    )
}

export default ViewUsers;