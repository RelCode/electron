import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './components/users/UserContext';
import AuthScreen from './screens/AuthScreen';
import AppScreen from './screens/AppScreen';
import './App.css';

const queryClient = new QueryClient();

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(['sessionToken']);
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
	useEffect(() => {
		setUserIsAuthenticated(!!cookies.sessionToken);
	},[cookies]);
  	return (
		// <UserProvider token={cookies?.sessionToken}>
			<QueryClientProvider client={queryClient}>
			{
				userIsAuthenticated ? <AppScreen cookies={cookies} removeCookie={removeCookie}/> : <AuthScreen setCookie={setCookie}/>
			}
			</QueryClientProvider>
		// </UserProvider>
  	);
}

export default App;
