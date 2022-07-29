import React, { useContext, useEffect } from 'react';
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
	HStack,
	Divider,
} from 'native-base';
import { Feather, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { TransactionContext } from '../../context/TransactionContext';
import { useIsFocused } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {
	const { user } = useContext(AuthContext);
	const { due, getTotalDue } = useContext(TransactionContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		navigation.addListener('focus', (e) => {
			getTotalDue();
		});
	}, [isFocused]);

	return (
		<ScrollView h='100%' w='100%' bg='#1D4ED8'>
			<StatusBar animated={true} barStyle='light-content' />
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
					<Heading fontSize={20} fontWeight='500' color='#fff' mb='5' mt='12'>
						Welcome, {user?.first_name}
					</Heading>
					<HStack
						mb='10'
						justifyContent='space-evenly'
						alignItems='center'
						width='100%'
						bg='#1D4ED8'
						shadow={2}
						borderRadius='5'
						padding='5'>
						<VStack space={3} alignItems='center'>
							<Text color='#fff'>Total Paid</Text>
							<Icon as={Feather} name='calendar' size='lg' color='#fff' />
							<Heading size='md' color='#fff'>
								৳ {parseFloat(due?.totalPaid).toFixed(2)}
							</Heading>
						</VStack>
						<Divider bg='blue.400' height='50%' orientation='vertical' />
						<VStack space={3} alignItems='center'>
							<Text color='#fff'>Total Due</Text>
							<Icon as={Feather} name='calendar' size='lg' color='#fff' />
							<Heading size='md' color='#fff'>
								৳ {parseFloat(due?.totalDue).toFixed(2)}
							</Heading>
						</VStack>
					</HStack>

					<Box
						width='100%'
						maxWidth='100%'
						padding='5'
						bg='lightBlue.50'
						borderRadius='5'
						shadow={2}>
						<Text fontSize='sm' color='#555' mb='3' bold>
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
										as={Feather}
										name='users'
										size='md'
										color='#1D4ED8'
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
									<Icon
										as={Feather}
										name='briefcase'
										size='md'
										color='#1D4ED8'
										mr='5'
									/>
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
									<Icon
										as={Ionicons}
										name='hammer-outline'
										size='md'
										color='#1D4ED8'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('TechnicianNavigation')}>
								Technician Accounts
							</Button>

							<Text fontSize='sm' color='#555' mb='0' bold>
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
										as={Feather}
										name='settings'
										size='md'
										color='#1D4ED8'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('ServiceNavigation')}>
								Requested Service
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
										as={Feather}
										name='navigation'
										size='md'
										color='#1D4ED8'
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
										as={Feather}
										name='file-text'
										size='md'
										color='#1D4ED8'
										mr='5'
									/>
								}
								// style={{borderBottomWidth:1,borderBottomColor:'#e5e7ff'}}
								onPress={() => navigation.navigate('InvoiceNavigation')}>
								All Invoice
							</Button>
						</VStack>
					</Box>
				</Box>
			</Container>
		</ScrollView>
	);
};
