import React, { useContext, useEffect, useState } from 'react';
import {
	Button,
	Container,
	Heading,
	Icon,
	Box,
	Text,
	Image,
	Center,
	Input,
	Flex,
	FlatList,
	HStack,
	Modal,
} from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import { ActionContext } from '../../context/ActionContext';
import { LoadingContext } from '../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { Loading, CrudLoading } from '../../components/loading';

export const AreaScreen = ({ navigation }) => {
	const { areas, setAreas, getAreas, createArea, updateArea, deleteArea } =
		useContext(ActionContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const [areaId, setAreaId] = useState(null);
	const [area, setArea] = useState('');
	const isFocused = useIsFocused();
	const [mode, setMode] = useState('Create');
	const [showModal, setShowModal] = useState(false);

	const handleSave = () => {
		mode == 'Create'
			? createArea(area, setArea, setShowModal)
			: updateArea(areaId, area, setArea, setShowModal);
	};
	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAreas();
		});
		navigation.addListener('beforeRemove', (e) => {
			setAreas([]);
			setShowModal(false);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;
	else if (crudLoading) return <CrudLoading />;
	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<Modal
					isOpen={showModal}
					onClose={() => {
						setArea('');
						setShowModal(false);
					}}
					animationPreset='slide'>
					<Modal.Content>
						<Modal.CloseButton />
						<Modal.Header borderBottomWidth={0}>{`${mode} Area`}</Modal.Header>
						<Modal.Body m='0' p='0' px='5'>
							<Input
								placeholder='Area Name'
								onChangeText={(val) => setArea(val)}
								value={area}
								type='text'
								InputLeftElement={
									<Icon
										m='2'
										ml='3'
										size='6'
										color='gray.400'
										as={<Ionicons name='create-outline' />}
									/>
								}
							/>
						</Modal.Body>
						<Modal.Footer borderTopWidth={0}>
							<Button.Group space={2}>
								<Button
									variant='ghost'
									colorScheme='blueGray'
									onPress={() => {
										setArea('');
										setShowModal(false);
									}}>
									Cancel
								</Button>
								<Button onPress={() => handleSave()}>Save</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
				<FlatList
					ListHeaderComponent={
						<Box width='100%' p='5' pb='3'>
							<HStack justifyContent='flex-end' alignItems='center' mb='5'>
								<Button
									colorScheme='darkBlue'
									size='sm'
									leftIcon={
										<Icon size='sm' as={<Ionicons name='add-outline' />} />
									}
									onPress={() => {
										setMode('Create');
										setShowModal(true);
									}}>
									Add area
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
								Total areas - {areas.length}
							</Text>
						</Box>
					}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					bg='red'
					data={areas}
					renderItem={({ item }) => (
						<Flex
							direction='row'
							justify='flex-start'
							align='center'
							shadow='1'
							bg='muted.50'
							mx='5'
							mb='3'
							py='2'
							px='2'
							rounded='2'>
							<Icon
								mr='3'
								size='md'
								color='gray.400'
								as={<Ionicons name='location-outline' />}
							/>
							<Text color='coolGray.800' fontWeight='400' fontSize='lg'>
								{item.area_name}
							</Text>
							<Button
								size='sm'
								bg='info.600'
								ml='auto'
								p='2'
								mr='1'
								onPress={() => {
									setMode('Update');
									setAreaId(item.id);
									setArea(item.area_name);
									setShowModal(true);
								}}>
								<Icon
									size='sm'
									color='#fff'
									as={<Ionicons name='create-outline' />}
								/>
							</Button>
							<Button
								size='sm'
								bg='error.600'
								p='2'
								onPress={() => deleteArea(item.id)}>
								<Icon
									size='sm'
									color='#fff'
									as={<Ionicons name='trash-outline' />}
								/>
							</Button>
						</Flex>
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
