import React from "react";
import { Fab } from "@mui/material";
import './../assets/css/home.css';

const Home = () => {
    return (
        <div className="component home-container">
            <Fab href="/users" variant="extended">
                Manage Users
            </Fab>
            <Fab variant="extended">
                Manage Stock
            </Fab>
            <Fab variant="extended">
                Manage Reports
            </Fab>
        </div>
    )
}

export default Home;