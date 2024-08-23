import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children, token }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('fetch users');
                const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.log('ERR:: ', error);
            } finally {
                setLoading(false);
            }
        }
        
        if(reload || !data){
            fetchData();
        }
    },[reload]);

    const toggleReload = () => {
        setReload(prev => !prev);
    }

    return (
        <UserContext.Provider value={{ data, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}