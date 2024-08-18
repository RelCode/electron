import axios from "axios";

const cachedData = {};

export const cachedUserTypes = async (key = 'default') => {
    console.log('cachedData', cachedData)
    if (!cachedData[key]) {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/userTypes`);
            cachedData[key] = data.types; // Ensure the API returns a 'types' field
        } catch (error) {
            console.error('Error fetching user types:', error);
            throw error; // Re-throw the error to be handled by the calling function
        }
    }
    return cachedData[key];
};
