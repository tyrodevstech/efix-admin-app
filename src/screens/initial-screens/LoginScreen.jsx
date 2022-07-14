import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ImageBackground, StatusBar } from 'react-native';
import axios from 'axios';
import {
	Container,
	Button,
	Heading,
	Text,
	VStack,
	FormControl,
	Input,
	Icon,
	Link,
} from 'native-base';
import jwt_decode from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { BASE_URL } from '../../global';
import { CrudLoading } from '../../components/loading';
import { AuthContext } from '../../context/AuthContext';
import { LoadingContext } from '../../context/LoadingContext';
import { setSSValueFor } from '../../utils';

const image = require('../../../assets/login-bg.png');

export const LoginScreen = ({ route, navigation }) => {
	const { crudLoading, setCrudLoading } = useContext(LoadingContext);
	const { setUser, authToken, setAuthToken } = useContext(AuthContext);
	const [passShow, setPassShow] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const getUser = (token, userId) => {
		axios
			.get(`${BASE_URL}/api/admin/${userId}`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${token}`,
				},
			})
			.then((response) => {
				if (response.status == 200) {
					setUser(response.data);
					setAuthToken(token);
					navigation.replace('MainNav');
				}
			})
			.catch((error) => {
				for (const [key, value] of Object.entries(error.response.data)) {
					Alert.alert('Error', String(value));
				}
			});
	};

	const authenticate = async () => {
		let token = await SecureStore.getItemAsync('token');
		let expiryDate = await SecureStore.getItemAsync('expiry_date');
		let userId = await SecureStore.getItemAsync('user_id');

		if (token && new Date() < new Date(expiryDate * 1000)) {
			getUser(token, userId);
		} else {
			setAuthToken(null);
		}
	};

	useEffect(() => {
		authenticate();
		// navigation.addListener('focus', (e) => {
		// 	getAdmins();
		// });
	}, []);

	const onSubmit = async (data) => {
		setCrudLoading(true);
		await axios
			.post(`${BASE_URL}/api/token`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.status == 200) {
					const token = res.data.access;
					const decoded = jwt_decode(token);
					setSSValueFor('token', token);
					setSSValueFor('expiry_date', String(decoded.exp));
					setSSValueFor('user_id', String(decoded.user_id));
					getUser(token, decoded.user_id);
					Alert.alert('Success', 'Logged in successfully');
				}
			})
			.catch((error) => {
				console.log(error.response);
				for (const [key, value] of Object.entries(error.response.data)) {
					Alert.alert('Error', String(value));
				}
			});
		setCrudLoading(false);
	};

	if (crudLoading) return <CrudLoading />;

	return (
		<ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}>
			<StatusBar
				translucent
				backgroundColor='transparent'
				animated={true}
				barStyle='light-content'
			/>
			<Container h='100%' w='100%' maxWidth='100%'>
				<VStack
					width='100%'
					padding='7'
					color='#fff'
					justifyContent='center'
					flex={1}>
					<VStack h='50%' justifyContent='center' mt='5'>
						<Heading size='xl' color='#fff' mb='2'>
							Welcome Back
						</Heading>
						<Text color='#fff'>Please sign in to continue</Text>
					</VStack>
					<VStack h='50%' justifyContent='center' space={4}>
						<FormControl isRequired={true} isInvalid={'username' in errors}>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<Input
											onBlur={onBlur}
											placeholder='Username'
											onChangeText={(val) => onChange(val)}
											value={value}
											type='text'
											variant='underlined'
											InputLeftElement={
												<Icon
													m='2'
													size='md'
													mr='5'
													color='gray.400'
													as={<Ionicons name='person-outline' />}
												/>
											}
										/>
										<FormControl.ErrorMessage>
											{errors['username']?.message}
										</FormControl.ErrorMessage>
									</>
								)}
								name='username'
								rules={{
									required: 'Field is required',
									minLength: {
										value: 3,
										message: 'Password should be at least 6 characters long',
									},
								}}
								defaultValue=''
							/>
						</FormControl>
						<FormControl isRequired={true} isInvalid={'password' in errors}>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<Input
											onBlur={onBlur}
											placeholder='Password'
											onChangeText={(val) => onChange(val)}
											value={value}
											type={passShow ? 'text' : 'password'}
											variant='underlined'
											InputLeftElement={
												<Icon
													m='2'
													size='md'
													mr='5'
													color='gray.400'
													as={<Ionicons name='key-outline' />}
												/>
											}
											InputRightElement={
												<Icon
													m='2'
													size='md'
													mr='5'
													color='gray.400'
													as={
														<Ionicons
															name={
																passShow ? 'eye-outline' : 'eye-off-outline'
															}
															onPress={() => setPassShow(!passShow)}
														/>
													}
												/>
											}
										/>
										<FormControl.ErrorMessage>
											{errors['password']?.message}
										</FormControl.ErrorMessage>
									</>
								)}
								name='password'
								rules={{
									required: 'Field is required',
									minLength: {
										value: 6,
										message: 'Password should be at least 6 characters long',
									},
								}}
								defaultValue=''
							/>
						</FormControl>
						<Link
							href='https://efixbd.com/password_reset/'
							bold
							ml='auto'
							mt='-2'
							_text={{ color: 'blue.600' }}>
							Forgot password?
						</Link>

						<Button
							bg='blue.500'
							mt='4'
							_text={{
								fontSize: 16,
								fontWeight: 600,
							}}
							onPress={handleSubmit(onSubmit)}>
							Login
						</Button>
					</VStack>
				</VStack>
			</Container>
		</ImageBackground>
	);
};
