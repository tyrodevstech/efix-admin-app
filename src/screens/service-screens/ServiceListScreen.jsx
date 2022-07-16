import React, { useContext, useEffect } from 'react';
import {
	Container,
	Heading,
	Icon,
	Box,
	Text,
	Image,
	Center,
	Input,
	FlatList,
} from 'native-base';

import { ServiceItem } from '../../components/flatlist/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { LoadingContext } from '../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { Loading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { BgShape1 } from '../../components/shape';
import { ListHeaderComponent } from '../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../components/flatlist/ListEmptyComponent';

export const ServiceListScreen = ({ navigation }) => {
	const { services, getService } = useContext(ActionContext);
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getService();
		});
		navigation.addListener('beforeRemove', (e) => {
			getService([]);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<BgShape1 />
				<FlatList
					ListHeaderComponent={<ListHeaderComponent items={services} />}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={services}
					renderItem={({ item }) => (
						<ServiceItem service={item} navigateTo='ServiceDetails' />
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</Container>
		</>
	);
};
