import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import axios from 'axios';
import {
	Container,
	Box,
	ScrollView,
	Button,
	Heading,
	VStack,
	HStack,
} from 'native-base';
import { CustomInput } from '../../../components/forms';
import { BASE_URL, EMAIL_REGEX } from '../../../global';
import { AdminContext } from '../../../context/AdminContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { CrudLoading } from '../../../components/loading';

export const AdminDetailsScreen = ({ route, navigation }) => {
	const { updateAdmin, deleteAdmin } = useContext(AdminContext);
	const { crudLoading, setCrudLoading } = useContext(LoadingContext);
	const { admin } = route.params;

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: {
			'first_name': admin.first_name,
			'last_name': admin.last_name,
			'email': admin.email,
			'username': admin.username,
		},
	});

	if (crudLoading) return <CrudLoading />;

	return (
		<ScrollView w='100%'  h='100%' contentContainerStyle={{ flexGrow: 1 }}>
			<VStack h='100%' flex={1} w='100%' maxWidth='100%' justifyContent='space-between' bg='#fff'>
				<VStack width='100%' padding='4'>
					<Heading size='md' color='#333' mb='5'>
						Deatils of {admin?.first_name}
					</Heading>
					<CustomInput
						type='text'
						name='first_name'
						label='First Name'
						placeholder='First Name'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='last_name'
						label='Last Name'
						placeholder='Last Name'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='username'
						label='Phone'
						placeholder='Phone Number'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomInput
						type='email'
						name='email'
						label='Email Address'
						placeholder='Email Address'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: 3,
							pattern: { value: EMAIL_REGEX, message: 'Invalid Email' },
						}}
						errors={errors}
					/>
				</VStack>
				<HStack p='4'  justifyContent='space-between'>
					<Button
						colorScheme='info'
						mt='3'
						onPress={handleSubmit((data) => updateAdmin(admin.id, data))}>
						Update Account
					</Button>
					<Button
						colorScheme='red'
						mt='3'
						onPress={() => deleteAdmin(admin.id, navigation)}>
						Delete Account
					</Button>
				</HStack>
			</VStack>
		</ScrollView>
	);
};
