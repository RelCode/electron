import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserProvider ,useUserContext } from "./UserContext";

const ViewUsers = () => {
    const [cookies] = useCookies(['sessionToken']);
    const { data, loading, error } = useUserContext();
    const [refreshUsers, setRefreshUsers] = useState(false);
    const fetchUsers = async () => {

    }
    useEffect(() => {
        fetchUsers();
    },[refreshUsers]);
    return (
        <UserProvider token={cookies?.sessionToken}>
        <div className="component users-container">
            <div>
                <Button 
                    startIcon={<Add/>}
                    href="/add-user" 
                    variant="contained"
                >Add User</Button>
            </div>
        </div>
        </UserProvider>
    )
}

export default ViewUsers;