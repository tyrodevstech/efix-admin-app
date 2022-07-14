import { Alert } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { LoadingContext } from './LoadingContext';
import { AuthContext } from './AuthContext';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
	const [admins, setAdmins] = useState([]);
	const { authToken } = useContext(AuthContext);
	const { setIsLoading, setCrudLoading } = useContext(LoadingContext);
	
	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	const getAdmins = async () => {
		setIsLoading(true);
		await axios
			.get(`${BASE_URL}/api/admin`, header)
			.then((response) => {
				setAdmins(response.data);
			})
			.catch((error) => console.log(error));
		setIsLoading(false);
	};

	const createAdmin = async (data) => {
		setCrudLoading(true);
		const authData = { ...data, is_superuser: true };
		await axios
			.post(`${BASE_URL}/api/admin/`, authData, header)
			.then((res) => Alert.alert('Success', 'Account created successfully'))
			.catch((error) => {
				for (const [key, value] of Object.entries(error.response.data)) {
					Alert.alert('Error', String(value));
				}
			});
		setCrudLoading(false);
	};

	const updateAdmin = async (id, data) => {
		setCrudLoading(true);
		await axios
			.patch(`${BASE_URL}/api/admin/${id}/`, data, header)
			.then((res) => Alert.alert('Success', 'Account updated successfully'))
			.catch((error) => {
				for (const [key, value] of Object.entries(error.response.data)) {
					Alert.alert('Error', String(value));
				}
			});
		setCrudLoading(false);
	};

	const deleteAdmin = (id, navigation) => {
		Alert.alert('Delete?', 'Are you sure you want to delete this account?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					await axios
						.delete(`${BASE_URL}/api/admin/${id}/`, header)
						.then((response) =>
							Alert.alert('Success', 'Account deleted successfully'),
						)
						.catch((error) => console.log(error));
					navigation.goBack();
				},
			},
		]);
	};

	return (
		<AdminContext.Provider
			value={{
				admins,
				setAdmins,
				getAdmins,
				createAdmin,
				updateAdmin,
				deleteAdmin,
			}}>
			{children}
		</AdminContext.Provider>
	);
};
