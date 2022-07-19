import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Container, FlatList } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { ServiceItem } from '../../components/flatlist/ListItem';
import { Loading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { BgShape1 } from '../../components/shape';
import { ListHeaderComponent } from '../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../components/flatlist/ListEmptyComponent';
import debounce from 'lodash.debounce';

export const ServiceListScreen = ({ navigation }) => {
	const { services, setService, getService } = useContext(ActionContext);
	const [pageLoading, setPageLoading] = useState(true);
	const [search, setSearch] = useState('');

	useFocusEffect(
		useCallback(() => {
			getService({ search: search, setPageLoading: setPageLoading });
			navigation.addListener('blur', (e) => {
				setPageLoading(true);
				setSearch('');
				setService([]);
			});
		}, [search]),
	);

	if (pageLoading) return <Loading />;

	return (
		<Container h='100%' w='100%' maxWidth='100%'>
			<BgShape1 />
			<FlatList
				ListHeaderComponent={
					<ListHeaderComponent
						items={services}
						handleSearch={{
							search: search,
							setSearch: setSearch,
						}}
					/>
				}
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
	);
};
