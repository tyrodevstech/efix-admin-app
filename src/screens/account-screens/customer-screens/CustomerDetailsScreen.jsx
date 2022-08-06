import React, { useContext, useEffect } from 'react';
import {
	ScrollView,
	Button,
	Heading,
	VStack,
	HStack,
	Icon,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from "expo-linking";
import { CustomInput, CustomSelect } from '../../../components/forms';
import { EMAIL_REGEX } from '../../../global';

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
			'#id': String(account.reg_no),
			'name': account.name,
			'email': account.email,
			'phone': account.phone,
			'other_phone': account.other_phone,
			'role': account.role,
			'work_area': account.work_area,
			'registration_type': account.registration_type,
			'business_name': account.business_name,
			// 'country': account.country,
			// 'post_office_or_union': account.post_office_or_union,
			'house_info': account.house_info,
			'nid': account.nid,
			'active': account.active,
			'date': account.date,
		},
	});

	useEffect(() => {
		getAreas({});
	}, []);

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
					<Heading size='md' color='#333' mb='5'>
						Deatils of {account?.name}
					</Heading>
					<CustomInput
						type='text'
						name='#id'
						label='#ID'
						control={control}
						isReadOnly={true}
						rules={{
							required: 'Field is required',
						}}
						errors={errors}
					/>
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
						InputRightElement={
							<Button
								onPress={() =>
									Linking.openURL(`tel:${account.phone}`)
								}
								variant='solid'
								p='2'
								colorScheme={'teal'}
								size='xs'
								mr='1.5'
								leftIcon={<Icon as={Ionicons} name='call-outline' size='xs' />}>
								Call
							</Button>
						}
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
					<CustomSelect
						name='work_area'
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
					<CustomSelect
						name='role'
						label='Role'
						placeholder='Role'
						control={control}
						isRequired={true}
						selectItems={[
							{ label: 'Customer', value: 'customer' },
							{ label: 'Technician', value: 'technician' },
						]}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
					{/* <CustomInput
						type='text'
						name='country'
						label='Country'
						placeholder='Country'
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
						name='post_office_or_union'
						label='Post office / Union'
						placeholder='Post office / Union'
						control={control}
						isRequired={false}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/> */}
					<CustomInput
						type='text'
						name='house_info'
						label='House Info'
						placeholder='House Info'
						control={control}
						isRequired={false}
						rules={{}}
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
					<CustomSelect
						name='active'
						label='Account Status'
						placeholder='Please Select'
						control={control}
						isRequired={true}
						selectItems={[
							{ label: 'Active', value: true },
							{ label: 'Inactive', value: false },
						]}
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
						name='date'
						label='Joined At'
						placeholder='Joined At'
						control={control}
						isReadOnly={true}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>
				</VStack>
				<HStack p='4' justifyContent='space-between' space={2}>
					<Button
						colorScheme='info'
						mt='3'
						flex={1}
						onPress={handleSubmit((data) => updateAccount(data, account.id))}>
						Update Account
					</Button>
					<Button
						colorScheme='red'
						mt='3'
						flex={1}
						onPress={() => deleteAccount(account.id, navigation)}>
						Delete Account
					</Button>
				</HStack>
			</VStack>
		</ScrollView>
	);
};
