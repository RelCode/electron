import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const CreateUser = () => {
    return (
        <div className="component add-users">
            <Button
                startIcon={<ArrowBack/>}
                href="/users" 
                variant="contained">Go Back</Button>
        </div>
    )
}

export default CreateUser;