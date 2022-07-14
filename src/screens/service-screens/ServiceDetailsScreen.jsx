import React, { useContext, useEffect } from 'react';
import { Container, Box, ScrollView, Button, Heading, Icon } from 'native-base';
import { useForm } from 'react-hook-form';
import {
	CustomInput,
	CustomSelect,
	CustomTextArea,
} from '../../components/forms';
import { ActionContext } from '../../context/ActionContext';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../../components/loading';
import { Ionicons } from '@expo/vector-icons';

export const ServiceDetailsScreen = ({ route, navigation }) => {
	const { updateService } = useContext(ActionContext);
	const { crudLoading } = useContext(LoadingContext);
	const { service } = route.params;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			'servicereq_no': service.servicereq_no,
			'created_by': service.customer.name,
			'assigned_to': service?.technician.name,
			'title': service.title,
			'priority': service.priority,
			'details': service.details,
			'status': service.status,
			'files': service.files,
			'created_at': service.created_at,
		},
	});

	if (crudLoading) return <Loading />;

	return (
		<ScrollView h='100%' w='100%' bg='blue.50'>
			<Container h='100%' w='100%' maxWidth='100%'>
				<Box width='100%' padding='5'>
					<Heading size='md' color='#333' mb='5'>
						Deatils of {service?.servicereq_no}
					</Heading>
					<CustomInput
						type='text'
						name='servicereq_no'
						label='#ID'
						placeholder=''
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
					<CustomInput
						type='text'
						name='created_by'
						label='Created By'
						placeholder=''
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
									navigation.navigate('CustomerNavigation', {
										screen: 'CustomerDetails',
										params: { account: service?.customer },
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
					<CustomInput
						type='text'
						name='assigned_to'
						label='Assigned To'
						placeholder=''
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
									navigation.navigate('TechnicianNavigation', {
										screen: 'TechnicianDetails',
										params: { account: service?.technician },
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
					<CustomInput
						type='text'
						name='title'
						label='Title'
						placeholder='Title'
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
					<CustomTextArea
						name='details'
						label='Details'
						placeholder='Details'
						control={control}
						isRequired={false}
						isReadOnly={true}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>

					<CustomSelect
						name='priority'
						label='Priority'
						placeholder='Priority'
						control={control}
						isRequired={false}
						isDisabled={true}
						selectItems={[
							{ label: 'High', value: 'High' },
							{ label: 'Medium', value: 'Medium' },
							{ label: 'Low', value: 'Low' },
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
						name='status'
						label='Status'
						placeholder='Status'
						control={control}
						isRequired={false}
						isDisabled={true}
						selectItems={[
							{ label: 'New', value: 'new' },
							{ label: 'In Progress', value: 'in_progress' },
							{ label: 'Waitting on Customer', value: 'waittingoncustomer' },
							{ label: 'Fixed', value: 'fixed' },
							{ label: 'Closed', value: 'closed' },
							{ label: 'Cancelled', value: 'cancelled' },
						]}
						rules={{
							minLength: {
								value: 3,
								message: 'Value should be at least 3 characters long',
							},
						}}
						errors={errors}
					/>

					<Button colorScheme='info' mt='3' onPress={handleSubmit(data=>updateService(data,service.id))}>
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
