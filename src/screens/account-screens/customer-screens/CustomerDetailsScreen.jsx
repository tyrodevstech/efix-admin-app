import React, { useContext, useEffect } from 'react';
import { Container, Box, ScrollView, Button, Heading } from 'native-base';
import { CustomInput, CustomSelect } from '../../../components/forms';
import { EMAIL_REGEX } from '../../../global';
import { useForm } from 'react-hook-form';

import { LoadingContext } from '../../../context/LoadingContext';
import { CrudLoading } from '../../../components/loading';
import { AccountContext } from '../../../context/AccountContext';
import { ActionContext } from '../../../context/ActionContext';

export const CustomerDetailsScreen = ({ route, navigation }) => {
	const { updateAccount, deleteAccount } = useContext(AccountContext);
	const { areas, getAreas } = useContext(ActionContext);
	const { crudLoading } = useContext(LoadingContext);
	const { account } = route.params;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			'name': account.name,
			'email': account.email,
			'phone': account.phone,
			'other_phone': account.other_phone,
			'role': account.role,
			'registration_type': account.registration_type,
			'nid': account.nid,
		},
	});

	useEffect(() => {
		getAreas();
	}, []);

	if (crudLoading) return <CrudLoading />;

	return (
		<ScrollView h='100%' w='100%' bg='blue.50'>
			<Container h='100%' w='100%' maxWidth='100%'>
				<Box width='100%' padding='5'>
					<Heading size='md' color='#333' mb='5'>
						Deatils of {account?.name}
					</Heading>
					<CustomInput
						type='text'
						name='name'
						label='Name'
						placeholder='Name'
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
						isRequired={false}
						rules={{
							minLength: 3,
							pattern: { value: EMAIL_REGEX, message: 'Invalid Email' },
						}}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='phone'
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
						type='text'
						name='other_phone'
						label='Alternative Phone'
						placeholder='Alternative Number'
						control={control}
						isRequired={false}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>

					<CustomSelect
						name='registration_type'
						label='Registration Type'
						placeholder='Registration Type'
						control={control}
						isRequired={false}
						selectItems={[
							{ label: 'Residential', value: 'Residential' },
							{ label: 'Commercial', value: 'Commercial' },
							{ label: 'Other', value: 'Other' },
						]}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomSelect
						name='area'
						label='Area'
						placeholder='Area'
						control={control}
						isRequired={false}
						selectItems={areas.map((item) => {
							return { label: item.area_name, value: item.id };
						})}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>

					<CustomInput
						type='text'
						name='role'
						label='Role'
						placeholder='Role'
						control={control}
						isDisabled={true}
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
						name='business_name'
						label='Business Name'
						placeholder='Business Name'
						control={control}
						isRequired={false}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='nid'
						label='NID Number'
						placeholder='NID Number'
						control={control}
						isRequired={false}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					<Button
						colorScheme='info'
						mt='3'
						onPress={handleSubmit((data) => updateAccount(data, account.id))}>
						Update Account
					</Button>
					<Button
						colorScheme='red'
						mt='3'
						onPress={() => deleteAccount(account.id, navigation)}>
						Delete Account
					</Button>
				</Box>
			</Container>
		</ScrollView>
	);
};
