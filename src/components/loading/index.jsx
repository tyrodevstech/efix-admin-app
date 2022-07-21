import React from 'react';
import { Heading, HStack, VStack, Image, Spinner, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

export const Loading = () => {
	return (
		<HStack
			justifyContent='center'
			alignItems='center'
			position='absolute'
			zIndex={99999}
			space={2}
			top='0'
			bottom='0'
			right='0'
			left='0'>
			<Spinner size='lg' accessibilityLabel='Loading posts' />
			<Heading color='primary.500' fontSize='md'>
				Loading...
			</Heading>
		</HStack>
	);
};

export const CrudLoading = () => {
	return (
		<VStack
			space={2}
			justifyContent='center'
			alignItems='center'
			position='absolute'
			backgroundColor='transparent'
			zIndex={99999}
			top='0'
			bottom='0'
			right='0'
			left='0'>
			<Image
				source={require('../../../assets/Gear-0.3s-200px.gif')}
				alt='Alternate Text'
				size='sm'
			/>
			<Heading color='info.600' fontSize='md'>
				Loading...
			</Heading>
		</VStack>
	);
};

export const InitLoading = () => {
	return (
		<VStack
			space={2}
			justifyContent='center'
			alignItems='center'
			position='absolute'
			backgroundColor='#fff'
			zIndex={2}
			top='0'
			bottom='0'
			right='0'
			left='0'>
			<ImageBackground
				source={require('../../../assets/splash_e.png')}
				resizeMode='cover'
				style={{ flex: 1, width: '100%' }}></ImageBackground>
			<HStack
				bottom='5%'
				position='absolute'
				zIndex={1}
				justifyContent='center'
				alignItems='flex-end'>
				<Text color='#1D4ED8' fontSize='md'>
					Loading
				</Text>
				<AnimatedEllipsis
					style={{
						color: '#1D4ED8',
						fontSize: 24,
					}}
				/>
			</HStack>
		</VStack>
	);
};
