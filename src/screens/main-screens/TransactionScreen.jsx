import React, { useContext } from 'react';
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
import { AuthContext } from '../../context/AuthContext';

export const TransactionScreen = ({ navigation }) => {
	const { user, handleLogout } = useContext(AuthContext);
	return (
		<ScrollView h='100%' w='100%'>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<Box width='100%' padding='5'>
					{/* <Heading size='lg' color='#333' mb='5'>
						Profile
					</Heading> */}
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
				</Box>
			</Container>
		</ScrollView>
	);
};
