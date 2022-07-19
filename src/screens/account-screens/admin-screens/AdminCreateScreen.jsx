import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
	Container,
	Box,
	ScrollView,
	Button,
	VStack,
	HStack,
} from 'native-base';

import { CustomInput } from '../../../components/forms';
import { EMAIL_REGEX } from '../../../global';
import { CrudLoading } from '../../../components/loading';
import { LoadingContext } from '../../../context/LoadingContext';
import { AdminContext } from '../../../context/AdminContext';

export const AdminCreateScreen = ({ route }) => {
	const { crudLoading, setCrudLoading } = useContext(LoadingContext);
	const { createAdmin } = useContext(AdminContext);
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const pwd = watch('password');

	if (crudLoading) return <CrudLoading />;

	return (
		<ScrollView w='100%' h='100%' contentContainerStyle={{ flexGrow: 1 }}>
			<VStack
				h='100%'
				flex={1}
				w='100%'
				maxWidth='100%'
				justifyContent='space-between'
				bg='#fff'>
				<VStack width='100%' padding='4'>
					<CustomInput
						type='text'
						name='first_name'
						label='First Name'
						placeholder='First Name'
						control={control}
						rules={{ required: 'Field is required', minLength: 3 }}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='last_name'
						label='Last Name'
						placeholder='Last Name'
						control={control}
						rules={{ required: 'Field is required', minLength: 3 }}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='username'
						label='Phone'
						placeholder='Phone Number'
						control={control}
						rules={{ required: 'Field is required', minLength: 3 }}
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
					<CustomInput
						type='password'
						name='password'
						label='Password'
						placeholder='Password'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 6,
								message: 'Password should be at least 6 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomInput
						type='password'
						name='cpassword'
						label='Confirm Password'
						placeholder='Confirm Password'
						control={control}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 6,
								message: 'Password should be at least 6 characters long',
							},
							validate: (value) => value === pwd || 'Password do no match',
						}}
						errors={errors}
					/>
				</VStack>
				<HStack p='4' justifyContent='space-between' space={2}>
					<Button colorScheme='blue' onPress={handleSubmit(createAdmin)} width='100%'>
						Create Account
					</Button>
				</HStack>
			</VStack>
		</ScrollView>
	);
};
