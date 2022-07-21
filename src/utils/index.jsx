import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
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
	} else if (error?.response?.data) {
		for (const [key, value] of Object.entries(error.response.data)) {
			Alert.alert('Error', String(value));
		}
	} else
		Alert.alert('Error', 'An unknown error occure. Please try again later.');
};

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const schedulePushNotification = async () => {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: 'Here is the notification body',
			data: { data: 'goes here' },
		},
		trigger: { seconds: 2 },
	});
};

export const registerForPushNotificationsAsync = async () => {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		await SecureStore.setItemAsync('devicetoken',token)
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};
