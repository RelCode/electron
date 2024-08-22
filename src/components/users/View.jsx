import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const ViewUsers = () => {
    const [cookies] = useCookies(['sessionToken']);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const fetchUsers = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/all`, {
                headers: {
                    Authorization: `Bearer ${cookies.sessionToken}`
                }
            }).then(response => {
                console.log('RESPONSE:::',response)
            })
        } catch (error) {
            console.log('Error::', error);
        }
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