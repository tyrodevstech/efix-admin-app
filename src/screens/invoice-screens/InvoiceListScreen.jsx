import React, { useContext, useEffect } from 'react';
import {
	Container,
	Heading,
	Icon,
	Box,
	Text,
	Image,
	Center,
	Input,
	FlatList,
} from 'native-base';

import { InvoiceItem } from '../../components/flatlist/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { LoadingContext } from '../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { Loading, CrudLoading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';

export const InvoiceListScreen = ({ navigation }) => {
	const { invoices, getInvoices, handlePaymentStatus } =
		useContext(ActionContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getInvoices();
		});
		navigation.addListener('beforeRemove', (e) => {
			getInvoices([]);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;
	else if (crudLoading) return <CrudLoading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<FlatList
					ListHeaderComponent={
						<Box width='100%' p='5' pb='3'>
							{/* <Heading size='md' color='#333' mb='5'>
								Invoice List
							</Heading> */}
							<Box
								width='100%'
								bg='lightBlue.50'
								shadow={3}
								borderRadius='5'
								padding='3'
								mb='5'>
								<Input
									placeholder='Search People & Places'
									width='100%'
									borderRadius='4'
									size='md'
									variant='underlined'
									InputLeftElement={
										<Icon
											m='2'
											mr='3'
											size='6'
											color='gray.400'
											as={<Ionicons name='search-outline' />}
										/>
									}
									InputRightElement={
										<Icon
											m='2'
											ml='3'
											size='6'
											color='gray.400'
											as={<Ionicons name='location-outline' />}
										/>
									}
								/>
							</Box>
							<Text fontSize='sm' color='#333' bold>
								Total accounts - {invoices.length}
							</Text>
						</Box>
					}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={invoices}
					renderItem={({ item }) => (
						<InvoiceItem
							invoice={item}
							navigateTo='InvoiceDetails'
							handlePaymentStatus={handlePaymentStatus}
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={
						<Center mt='5' key={'empty-container'}>
							<Image
								key={'empty-image'}
								source={require('../../../assets/no_data.png')}
								alt='Alternate Text'
								size='xl'
							/>
							<Text key={'empty-text'}>No data !!!</Text>
						</Center>
					}
				/>
			</Container>
		</>
	);
};
