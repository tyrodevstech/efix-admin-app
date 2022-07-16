import { Text, Center, Image } from 'native-base';

export const ListEmptyComponent = () => {
	return (
		<Center mt='25%' key={'empty-container'}>
			<Image
				key={'empty-image'}
				source={require('../../../assets/no_data.png')}
				alt='Alternate Text'
				size='xl'
			/>
			<Text key={'empty-text'}>No data !!!</Text>
		</Center>
	);
};
