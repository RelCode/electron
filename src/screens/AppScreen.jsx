import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Home, ViewUsers, CreateUsers } from './../components';

const AppScreen = ({ cookies, removeCookie }) => {
    return (
        <Router>
            <Navbar cookies={cookies} removeCookie={removeCookie}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<ViewUsers/>}/>
                <Route path="/add-user" element={<CreateUsers/>} />
            </Routes>
        </Router>
    )
}

export default AppScreen;