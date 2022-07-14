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

import { AccountItem } from '../../../components/flatlist/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { AccountContext } from '../../../context/AccountContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { CrudLoading, Loading } from '../../../components/loading';

export const TechnicianListScreen = ({ navigation }) => {
	const { accounts, setAccounts, handleActivation, getAccounts } =
		useContext(AccountContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAccounts('technician');
		});
		navigation.addListener('beforeRemove', (e) => {
			setAccounts([]);
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
								Technician accounts
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
								Total accounts - {accounts.length}
							</Text>
						</Box>
					}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={accounts}
					renderItem={({ item }) => (
						<AccountItem
							account={item}
							navigateTo='TechnicianDetails'
							handleActivation={handleActivation}
							role='technician'
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={
						<Center mt='5' key={'empty-container'}>
							<Image
								key={'empty-image'}
								source={require('../../../../assets/no_data.png')}
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
