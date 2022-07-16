import React, { useContext, useEffect } from 'react';
import { Container, FlatList } from 'native-base';
import { AdminContext } from '../../../context/AdminContext';
import { useIsFocused } from '@react-navigation/native';
import { AdminItem } from '../../../components/flatlist/ListItem';
import { Loading } from '../../../components/loading';
import { LoadingContext } from '../../../context/LoadingContext';
import { BgShape1 } from '../../../components/shape';
import { ListHeaderComponent } from '../../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../../components/flatlist/ListEmptyComponent';

export const AdminListScreen = ({ navigation }) => {
	const { admins, setAdmins, getAdmins } = useContext(AdminContext);
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAdmins();
		});
		navigation.addListener('beforeRemove', (e) => {
			setAdmins([]);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				<BgShape1 />
				<FlatList
					ListHeaderComponent={<ListHeaderComponent items={admins} />}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={admins}
					renderItem={({ item }) => (
						<AdminItem admin={item} navigation={navigation} />
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</Container>
		</>
	);
};
