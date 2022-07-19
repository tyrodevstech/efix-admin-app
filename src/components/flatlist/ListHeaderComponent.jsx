import { Box, Center, HStack, Icon, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { CustomSearchInput } from '../forms';
import { Feather } from '@expo/vector-icons';
export const ListHeaderComponent = ({ items, handleSearch }) => {
	return (
		<Box width='100%' p='4' pb='3'>
			<CustomSearchInput
				handleSearch={handleSearch}
				placeholder='Search People & Places'
			/>
			<HStack justifyContent='space-around' alignItems='center'>
				<Text fontSize='sm' color='#fff' bold>
					Total accounts - {items.length}
				</Text>
				<TouchableOpacity>
					<Icon
						m='2'
						ml='3'
						size='md'
						color='blue.300'
						as={<Feather name='sliders' />}
					/>
				</TouchableOpacity>
			</HStack>
		</Box>
	);
};
