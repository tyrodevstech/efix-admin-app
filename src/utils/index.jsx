import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export const setSSValueFor = async (key, value) => {
	await SecureStore.setItemAsync(key, value);
};

export const getSSValueFor = async (key, setValue) => {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		setValue(result);
	} else {
		setValue(null);
	}
};

export const handleError = (error) => {
	if (error.response.status === 0) {
		Alert.alert(
			'Error',
			'Faild to connect to the server. Please try again later.',
		);
	} else if (error?.response?.error) {
		for (const [key, value] of Object.entries(error.response.data)) {
			Alert.alert('Error', String(value));
		}
	} else
		Alert.alert('Error', 'An unknown error occure. Please try again later.');
};
