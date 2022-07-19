import React, { useContext } from 'react';
import {
	Text,
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
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import {
	CustomInput,
	CustomSelect,
	CustomTextArea,
} from '../../components/forms';
import { LoadingContext } from '../../context/LoadingContext';
import { CrudLoading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { BASE_URL } from '../../global';

export const InvoiceDetailsScreen = ({ route, navigation }) => {
	const { updateInvoice } = useContext(ActionContext);
	const { crudLoading} =
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
				</VStack>
				<HStack px='4' justifyContent='space-between' space={2}>
					<Button
						colorScheme='lightBlue'
						mt='3'
						flex={1}
						onPress={handleSubmit((data) => updateInvoice(data, invoice.id))}>
						Update Invoice
					</Button>
					<Button
						// isDisabled
						colorScheme='red'
						mt='3'
						flex={1}
						onPress={() => deleteAccount(invoice.id, navigation)}>
						Delete Invoice
					</Button>
				</HStack>
				<VStack p='4' alignItems='center'>
					<Link
						href={`${BASE_URL}/api/download-invoice/${invoice.id}`}
						rounded={3}
						bg='gray.200'
						width='60%'
						py='2.5'
						px='4'
						justifyContent='center'>
						<Text>Download Invoice</Text>
					</Link>
				</VStack>
			</VStack>
		</ScrollView>
	);
};
