import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AuthScreen from './screens/AuthScreen';
import AppScreen from './screens/AppScreen';
import './App.css';

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(['sessionToken']);
	const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
	useEffect(() => {
		setUserIsAuthenticated(!!cookies.sessionToken);
	},[cookies]);
  	return (
		<>
			{
				userIsAuthenticated ? <AppScreen cookies={cookies} removeCookie={removeCookie}/> : <AuthScreen setCookie={setCookie}/>
			}
		</>
  	);
}

export default App;
