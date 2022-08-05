import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Alert,
	ImageBackground,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
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
import { CrudLoading, InitLoading } from '../../components/loading';
import { AuthContext } from '../../context/AuthContext';
import { LoadingContext } from '../../context/LoadingContext';
import { handleError, setSSValueFor } from '../../utils';

const image = require('../../../assets/login-bg.png');

export const LoginScreen = ({ route, navigation }) => {
	const { crudLoading, setCrudLoading } = useContext(LoadingContext);
	const { setUser, setAuthToken, setDeviceToken } = useContext(AuthContext);
	const [passShow, setPassShow] = useState(false);
	const [initLoading, setInitLoading] = useState(true);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const getUser = async (token, userId) => {
		const header = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${token}`,
			},
		};
		await axios
			.get(`${BASE_URL}/api/admin/${userId}`, header)
			.then(async (response) => {
				if (response.status == 200) {
					setUser(response.data);
					setAuthToken(token);
					const deviceToken = await SecureStore.getItemAsync('devicetoken');
					await axios
						.post(
							`${BASE_URL}/api/userdevicetoken/`,
							{ user_id: parseInt(userId), device_token: deviceToken },
							header,
						)
						.catch((error) => handleError(error));
					navigation.replace('MainNav');
				}
			})
			.catch((error) => handleError(error));
		setInitLoading(false);
	};

	const authenticate = async () => {
		let token = await SecureStore.getItemAsync('token');
		let expiryDate = await SecureStore.getItemAsync('expiry_date');
		let userId = await SecureStore.getItemAsync('user_id');

		if (token && new Date() < new Date(expiryDate * 1000)) {
			getUser(token, userId);
		} else {
			setAuthToken(null);
			setInitLoading(false);
		}
	};

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
			.catch((error) => handleError(error));
		setCrudLoading(false);
	};

	useEffect(() => {
		authenticate();
	}, []);

	if (initLoading) return <InitLoading />;
	else if (crudLoading) return <CrudLoading />;

	return (
		<ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}>
			{/* <StatusBar
				translucent
				backgroundColor='transparent'
				animated={true}
				barStyle='light-content'
			/> */}
			<Container h='100%' w='100%' maxWidth='100%'>
				<VStack
					width='100%'
					padding='5'
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
										message: 'Username should be at least 3 characters long',
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
												<TouchableOpacity
													onPress={() => setPassShow(!passShow)}>
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
															/>
														}
													/>
												</TouchableOpacity>
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
										value: 4,
										message: 'Password should be at least 4 characters long',
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
							colorScheme='blue'
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
