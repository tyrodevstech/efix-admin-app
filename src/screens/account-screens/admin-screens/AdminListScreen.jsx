import React, { useCallback, useContext, useState } from 'react';
import { Center, Container, FlatList, Image, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { AdminContext } from '../../../context/AdminContext';
import { AdminItem } from '../../../components/flatlist/ListItem';
import { Loading } from '../../../components/loading';
import { BgShape1 } from '../../../components/shape';
import { ListHeaderComponent } from '../../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../../components/flatlist/ListEmptyComponent';

export const AdminListScreen = ({ navigation }) => {
	const { admins, setAdmins, getAdmins } = useContext(AdminContext);
	const [pageLoading, setPageLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			getAdmins({
				search: search,
				setPageLoading: setPageLoading,
				setSearchLoading: setSearchLoading,
			});
			navigation.addListener('blur', (e) => {
				setPageLoading(true);
				setAdmins([]);
			});
		}, [search]),
	);

	if (pageLoading) return <Loading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				<BgShape1 />
				<ListHeaderComponent
					items={admins}
					handleSearch={{
						search: search,
						searchLoading: searchLoading,
						setSearch: setSearch,
						setSearchLoading: setSearchLoading,
					}}
				/>
				{searchLoading ? (
					<Center mt='25%' key={'empty-container'} w='100%'>
						<Image
							key={'empty-image'}
							source={require('../../../../assets/Magnify-1.4s-200px.gif')}
							alt='Alternate Text'
							size='xl'
						/>
						<Text key={'empty-text'}>Searching...</Text>
					</Center>
				) : (
					<FlatList
						// ListHeaderComponent={

						// }
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
				)}
			</Container>
		</>
	);
};
