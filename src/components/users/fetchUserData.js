import axios from "axios";

let users = [];

const fetchUserData = async (sessionToken, reload = false) => {
    console.log('sessions', users)
    if(users.length === 0 || reload){
        const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/all`,{
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        users = data.users;
    }
    return users;
}

export default fetchUserData;