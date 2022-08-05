import React from 'react';
import {
	ScrollView,
	VStack,
	Image,
	Heading,
	Text
} from 'native-base';
export const AboutScreen = ({ navigation }) => {
	return (
		<ScrollView h='100%' w='100%' contentContainerStyle={{ flexGrow: 1 }}>
			<VStack
				maxWidth='100%'
				flex={1}
				m='4'
				// bg='lightBlue.50'
				rounded='4'
				alignItems='center'
				justifyContent='center'
				space={3}>
				<Heading size='md' color='dark.300' mb='3'>
					About Developer
				</Heading>

				<Image
					source={require('../../../assets/itsource-logo.png')}
					alt='itsource-logo'
					resizeMode='contain'
					size='xl'
				/>
				<VStack justifyContent='center' alignItems='center' px='5'>
					<Text style={{ fontSize: 16 }}>BANGLADESH OFFICE</Text>
					<Text style={{ fontSize: 14, marginTop: 5, textAlign: 'center' }}>
						House# 10, Road# 18, Sector# 14,Uttara Model Town, Dhaka 1230
					</Text>
					<Text style={{ fontSize: 14 }}>Phone: (+88) 01873-666673</Text>
					<Text style={{ fontSize: 14 }}>Mail: sales@itsourcebd.com</Text>
				</VStack>
				<Image
					mt='5'
					size='xl'
					resizeMode='contain'
					w='100%'
					source={require('../../../assets/transaction_bg.png')}
					alt='profile_bg'
				/>
			</VStack>
		</ScrollView>
	);
};
