import * as SecureStore from 'expo-secure-store';

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
