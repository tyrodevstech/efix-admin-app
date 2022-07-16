import { Box } from 'native-base';
import { Dimensions } from 'react-native';

export const BgShape1 = () => {
	const width = Dimensions.get('window').width;
	return (
		<>
			<Box
				style={{
					borderBottomRightRadius: width,
					borderBottomLeftRadius: width,
					width: width * 1.5,
					height: width / 1.35,
					backgroundColor: '#000e21',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					left: -width / 3,
					top: -70,
					zIndex:-1,
				}}
			/>
		</>
	);
};
