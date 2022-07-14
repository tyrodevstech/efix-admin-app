import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authToken, setAuthToken] = useState(null);
	const handleLogout = (navigation) => {
		Alert.alert('Sign Out?', 'Are you sure you want to sign out?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async() => {
					await SecureStore.deleteItemAsync('token')
					await SecureStore.deleteItemAsync('expiry_Date')
					setUser(null)
					navigation.replace('Login',);
				},
			},
		]);
	};

	return (
		<AuthContext.Provider
			value={{ user, authToken, setUser, setAuthToken, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
