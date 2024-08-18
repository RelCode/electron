import React, { useState } from "react";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UserForm from "./UserForm";

const CreateUser = () => {
    return (
        <div className="component add-users">
            <Button
                startIcon={<ArrowBack />}
                href="/users"
                variant="contained"
            >
                Go Back
            </Button>
            <UserForm type={'create'}/>
        </div>
    );
};

export default CreateUser;
