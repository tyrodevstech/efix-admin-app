import { Alert } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { LoadingContext } from './LoadingContext';
import { AuthContext } from './AuthContext';
import { handleError } from '../utils';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
	const [accounts, setAccounts] = useState([]);
	const { setIsLoading, setCrudLoading } = useContext(LoadingContext);
	const { authToken } = useContext(AuthContext);

	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	const getAccounts = async (role) => {
		setIsLoading(true);
		await axios
			.get(`${BASE_URL}/api/account?role=${role}`, header)
			.then((response) => {
				setAccounts(response.data);
			})
			.catch((error) => handleError(error));
		setIsLoading(false);
	};

	const handleActivation = (id, active, role) => {
		Alert.alert(
			'Confirm?',
			`Are you sure you want to ${active ? 'deactivate' : 'activate'}?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: async () => {
						setCrudLoading(true);
						await axios
							.patch(
								`${BASE_URL}/api/account/${id}/`,
								{ active: !active },
								header,
							)
							.then((res) => {
								Alert.alert(
									'Success',
									`Account ${
										active ? 'deactivated' : 'activated'
									} successfully`,
								);
								getAccounts(role);
							})
							.catch((error) => handleError(error));
						setCrudLoading(false);
					},
				},
			],
		);
	};

	const updateAccount = async (data, id) => {
		setCrudLoading(true);
		await axios
			.patch(`${BASE_URL}/api/account/${id}/`, data, header)
			.then((res) => Alert.alert('Success', 'Account updated successfully'))
			.catch((error) => handleError(error));
		setCrudLoading(false);
	};

	const deleteAccount = (id, navigation) => {
		Alert.alert('Sign Out?', 'Are you sure you want to sign out?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					await axios
						.delete(`${BASE_URL}/api/account/${id}/`, header)
						.then((response) => {
							Alert.alert('Success', 'Account deleted successfully');
							navigation.goBack();
						})
						.catch((error) => handleError(error));
				},
			},
		]);
	};

	return (
		<AccountContext.Provider
			value={{
				accounts,
				setAccounts,
				getAccounts,
				handleActivation,
				updateAccount,
				deleteAccount,
			}}>
			{children}
		</AccountContext.Provider>
	);
};
