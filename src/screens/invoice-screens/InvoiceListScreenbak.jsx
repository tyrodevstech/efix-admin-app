import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Button,
	Image,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from '../../components/global';
const App = () => {
	const [image, setImage] = useState(null);
	const [fileResponse, setFileResponse] = useState(null);
	const _pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		alert(result.uri);
		setFileResponse(result);
		result;
	};

	const _pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		alert(result.uri);
		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	const handleSubmit = async () => {
		const authData = { files: { uri: image } };
		console.log(fileResponse);
		const data = new FormData();
		data.append('files', {
			uri: fileResponse.uri,
			name: fileResponse.name,
			type: fileResponse.mimeType,
		});
		await axios
			.post(`${BASE_URL}/api/invoice/`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => Alert.alert('Success', 'Account created successfully'))
			.catch((error) => {
				console.log(error.response, 'awdawd');
				// for (const [key, value] of Object.entries(error.response?.data)) {
				// 	Alert.alert('Error', String(value));
				// }
			});
	};
	return (
		<View style={styles.container}>
			<Button title='Upload' onPress={() => handleSubmit()} />
			<Button title='Select Document' onPress={_pickDocument} />

			<View style={{ 'marginTop': 20 }}>
				<Button title='Select Image' onPress={_pickImage} />
				{image && (
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
