import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {
	Text,
	Container,
	Box,
	ScrollView,
	Button,
	Heading,
	VStack,
	Icon,
	HStack,
	Link,
	Badge,
} from 'native-base';

import {
	CustomInput,
	CustomSelect,
	CustomTextArea,
} from '../../components/forms';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { LoadingContext } from '../../context/LoadingContext';
import { CrudLoading, Loading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { Ionicons } from '@expo/vector-icons';

export const InvoiceDetailsScreen = ({ route, navigation }) => {
	const { updateInvoice } = useContext(ActionContext);
	const { isLoading, crudLoading, setIsLoading, setCrudLoading } =
		useContext(LoadingContext);
	const { invoice } = route.params;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			'service_title': invoice.service.title,
			'details': invoice.details,
			'tech_charge': String(invoice.tech_charge),
			'equip_charge': String(invoice.equip_charge),
			'files': invoice.files,
			'status': invoice.status,
			'created_at': invoice.created_at,
		},
	});
	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	if (crudLoading) return <CrudLoading />;
	return (
		<ScrollView h='100%' w='100%' bg='blue.50'>
			<Container h='100%' w='100%' maxWidth='100%'>
				<Box width='100%' padding='5'>
					<Heading size='md' color='#333' mb='5'>
						Invoice Details of - {invoice?.service?.servicereq_no}
					</Heading>
					<CustomInput
						type='text'
						name='service_title'
						label='Service'
						placeholder='Service'
						control={control}
						isReadOnly={true}
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
									navigation.navigate('ServiceNavigation', {
										screen: 'ServiceDetails',
										params: { service: invoice.service },
									})
								}
								variant='solid'
								p='2'
								colorScheme={'blueGray'}
								size='xs'
								mr='1.5'
								rightIcon={
									<Icon as={Ionicons} name='navigate-outline' size='xs' />
								}>
								Details
							</Button>
						}
					/>
					<CustomTextArea
						name='details'
						label='Details'
						placeholder='Details'
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
						type='number'
						name='tech_charge'
						label='Technician Charge'
						placeholder='Technician Charge'
						control={control}
						rules={{
							required: 'Field is required',
						}}
						errors={errors}
					/>
					<CustomInput
						type='text'
						name='equip_charge'
						label='Equipment Charge'
						placeholder='Equipment Charge'
						control={control}
						rules={{
							required: 'Field is required',
						}}
						errors={errors}
					/>
					<CustomSelect
						name='status'
						label='Status'
						placeholder='Status'
						control={control}
						isRequired={false}
						selectItems={[
							{ label: 'Paid', value: 'Paid' },
							{ label: 'Unpaid', value: 'Unpaid' },
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
						name='created_at'
						label='Created at'
						placeholder='Service'
						control={control}
						isReadOnly={true}
						rules={{
							required: 'Field is required',
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>

					<Box alignItems='flex-start' my='3'>
						{invoice.files ? (
							<Badge
								colorScheme='blue'
								py='1.5'
								px='3'
								leftIcon={
									<Icon as={Ionicons} name='cloud-download-outline' size='sm' />
								}>
								<Link href={invoice.files} _text={{ color: 'darkBlue.600' }}>
									Attached Files
								</Link>
							</Badge>
						) : (
							<Text>No Attached file</Text>
						)}
					</Box>
					<HStack space={2}>
						<Button
							colorScheme='lightBlue'
							mt='3'
							onPress={handleSubmit((data) => updateInvoice(data, invoice.id))}>
							Update Invoice
						</Button>
						<Button
							isDisabled
							colorScheme='red'
							mt='3'
							variant='outline'
							style={{ borderColor: 'red' }}
							onPress={() => deleteAccount(invoice.id, navigation)}>
							Delete Invoice
						</Button>
					</HStack>
				</Box>
			</Container>
		</ScrollView>
	);
};
