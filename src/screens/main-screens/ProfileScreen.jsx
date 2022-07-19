import React, { useContext } from 'react';
import {
	Button,
	Container,
	Icon,
	Box,
	StatusBar,
	ScrollView,
	VStack,
	Text,
	Avatar,
	Image,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

export const ProfileScreen = ({ navigation }) => {
	const { user, handleLogout } = useContext(AuthContext);
	return (
		<ScrollView h='100%' w='100%'>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<Box width='100%' padding='4'>
					<Box
						mb='10'
						// height={120}
						flexDirection='row'
						width='100%'
						bg='lightBlue.50'
						shadow={2}
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
								{user?.first_name} {user?.last_name}
							</Text>
							<Text>{user?.email}</Text>
						</Box>
					</Box>

					<Box
						width='100%'
						maxWidth='100%'
						padding='5'
						bg='lightBlue.50'
						borderRadius='5'
						shadow={2}>
						<Text fontSize='sm' color='#333' mb='3' bold>
							Actions
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
								onPress={() => {
									navigation.navigate('HomeNav', {
										screen: 'AdminNavigation',
										params: {
											screen: 'AdminDetails',
											params: { admin: user },
										},
									});
								}}>
								Update Information
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
									<Icon as={Ionicons} name='key-outline' size='sm' mr='5' />
								}>
								Change Password
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
									<Icon as={Ionicons} name='help-outline' size='sm' mr='5' />
								}>
								About
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
									<Icon as={Ionicons} name='log-out-outline' size='sm' mr='5' />
								}
								onPress={() => handleLogout(navigation)}>
								Log out
							</Button>
						</VStack>
						<Image
							mt='10'
							size='xl'
							resizeMode='contain'
							w='100%'
							source={require('../../../assets/profile_1.png')}
							alt='profile_bg'
						/>
					</Box>
				</Box>
			</Container>
		</ScrollView>
	);
};
