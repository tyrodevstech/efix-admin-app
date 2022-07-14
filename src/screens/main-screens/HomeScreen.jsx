import React, { useEffect } from 'react';
import {
	Button,
	Container,
	Heading,
	Icon,
	Box,
	StatusBar,
	ScrollView,
	VStack,
	Text,
	Avatar,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = ({ navigation }) => {
	return (
		<ScrollView h='100%' w='100%' bg='#1D4ED8'>
			<Container h='100%' w='100%' maxWidth='100%'>
				<Box
					height='300px'
					bg='#000e21'
					width='150%'
					position='absolute'
					top='0'
					left='-60'
					right='0'
					borderBottomRightRadius={400}
					borderBottomLeftRadius={100}
				/>
				<Box width='100%' padding='5'>
					<Heading size='lg' color='#fff' mb='5' mt='5'>
						Welcome
					</Heading>
					<Box
						mb='10'
						height={130}
						flexDirection='row'
						width='100%'
						bg='lightBlue.50'
						shadow={3}
						borderRadius='5'
						padding='5'>
						<Avatar
							bg='pink.600'
							size='lg'
							mr='5'
							source={{
								uri: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
							}}>
							Profile Image
						</Avatar>
						<Box>
							<Text fontSize='xl' bold>
								Sanaullah Rabbi
							</Text>
							<Text>admin@gmail.com</Text>
						</Box>
					</Box>

					<Box
						width='100%'
						maxWidth='100%'
						padding='5'
						bg='lightBlue.50'
						borderRadius='5'
						shadow={3}>
						<Text fontSize='sm' color='#777' mb='3'>
							Accounts
						</Text>
						{/* <Divider /> */}
						<VStack space={1} width='100%'>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon
										as={Ionicons}
										name='information-circle-outline'
										size='sm'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('AdminNavigation')}>
								Admin Accounts
							</Button>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon as={Ionicons} name='person-outline' size='sm' mr='5' />
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('CustomerNavigation')}>
								Customer Accounts
							</Button>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon as={Ionicons} name='hammer-outline' size='sm' mr='5' />
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('TechnicianNavigation')}>
								Technician Accounts
							</Button>

							<Text fontSize='sm' color='#333' mb='0' bold>
								Actions
							</Text>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon
										as={Ionicons}
										name='settings-outline'
										size='sm'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('ServiceNavigation')}>
								Service List
							</Button>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon
										as={Ionicons}
										name='location-outline'
										size='sm'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('AreaScreen')}>
								Area Data
							</Button>
							<Button
								bg='lightBlue.50'
								_text={{
									color: '#1F2937',
								}}
								_icon={{ color: '#333' }}
								_pressed={{ bg: 'blueGray.200' }}
								justifyContent='flex-start'
								leftIcon={
									<Icon
										as={Ionicons}
										name='document-text-outline'
										size='sm'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('InvoiceNavigation')}>
								Invoice List
							</Button>
						</VStack>
					</Box>
				</Box>
			</Container>
		</ScrollView>
	);
};
