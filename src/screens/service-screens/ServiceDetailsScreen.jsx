import React, { useContext } from 'react';
import { ScrollView, Button, Heading, Icon, VStack, HStack } from 'native-base';
import { useForm } from 'react-hook-form';
import {
	CustomInput,
	CustomSelect,
	CustomTextArea,
} from '../../components/forms';
import { ActionContext } from '../../context/ActionContext';
import { LoadingContext } from '../../context/LoadingContext';
import { CrudLoading } from '../../components/loading';
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
			'assigned_to': service?.technician
				? service?.technician.name
				: 'Not assigned yet',
			'title': service.title,
			'priority': service.priority,
			'details': service.details,
			'status': service.status,
			'files': service.files,
			'created_at': service.created_at,
		},
	});

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
							service?.technician ? (
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
							) : (
								<></>
							)
						}
					/>
					<CustomInput
						type='text'
						name='title'
						label='Title'
						placeholder='Title'
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

					<CustomSelect
						name='priority'
						label='Priority'
						placeholder='Priority'
						control={control}
						isRequired={false}
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
				</VStack>
				<HStack p='4' justifyContent='space-between' space={2}>
					<Button
						colorScheme='info'
						mt='3'
						flex={1}
						onPress={handleSubmit((data) => updateService(data, service.id))}>
						Update Service
					</Button>
					<Button
						colorScheme='red'
						mt='3'
						flex={1}
						onPress={() => deleteAccount(account.id, navigation)}>
						Delete Service
					</Button>
				</HStack>
			</VStack>
		</ScrollView>
	);
};
