import React, { useContext, useEffect } from 'react';
import {
	Button,
	Container,
	Heading,
	Icon,
	Box,
	HStack,
	Text,
	Input,
	FlatList,
	Image,
	Center,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AdminContext } from '../../../context/AdminContext';
import { useIsFocused } from '@react-navigation/native';
import { AdminItem } from '../../../components/flatlist/ListItem';
import { Loading } from '../../../components/loading';
import { LoadingContext } from '../../../context/LoadingContext';

export const AdminListScreen = ({ navigation }) => {
	const { admins, setAdmins, getAdmins } = useContext(AdminContext);
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAdmins();
		});
		navigation.addListener('beforeRemove', (e) => {
			setAdmins([]);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				<FlatList
					ListHeaderComponent={
						<Box width='100%' p='5' key='list_header_comp' pb='3'>
							<HStack justifyContent='flex-end' alignItems='center' mb='5'>
								<Button
									colorScheme='darkBlue'
									size='sm'
									leftIcon={
										<Icon
											size='sm'
											as={<Ionicons name='add-outline' />}
										/>
									}
									onPress={() => navigation.navigate('AdminCreate')}>
									Create Admin
								</Button>
							</HStack>
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
								Total accounts - {admins.length}
							</Text>
						</Box>
					}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={admins}
					renderItem={({ item }) => (
						<AdminItem admin={item} navigation={navigation} />
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
