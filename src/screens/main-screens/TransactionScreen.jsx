import React from 'react';
import { ScrollView, VStack, Image } from 'native-base';

export const TransactionScreen = ({ navigation }) => {
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
				// shadow={2}
			>
				<Image
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
