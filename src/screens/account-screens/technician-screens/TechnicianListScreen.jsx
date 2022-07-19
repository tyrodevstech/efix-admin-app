import React, { useContext, useState, useCallback } from 'react';
import { Container, FlatList } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { AccountItem } from '../../../components/flatlist/ListItem';
import { AccountContext } from '../../../context/AccountContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { CrudLoading, Loading } from '../../../components/loading';
import { ListHeaderComponent } from '../../../components/flatlist/ListHeaderComponent';
import { BgShape1 } from '../../../components/shape';
import { ListEmptyComponent } from '../../../components/flatlist/ListEmptyComponent';

export const TechnicianListScreen = ({ navigation }) => {
	const { accounts, setAccounts, handleActivation, getAccounts } =
		useContext(AccountContext);
	const { crudLoading } = useContext(LoadingContext);
	const [pageLoading, setPageLoading] = useState(true);
	const [search, setSearch] = useState('');

	useFocusEffect(
		useCallback(() => {
			getAccounts({
				role: 'technician',
				search: search,
				setPageLoading: setPageLoading,
			});
			navigation.addListener('blur', (e) => {
				setPageLoading(true);
				setAccounts([]);
			});
		}, [search]),
	);

	if (pageLoading) return <Loading />;
	else if (crudLoading) return <CrudLoading />;

	return (
		<Container h='100%' w='100%' maxWidth='100%'>
			<BgShape1 />
			<FlatList
				ListHeaderComponent={
					<ListHeaderComponent
						items={accounts}
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
				data={accounts}
				renderItem={({ item }) => (
					<AccountItem
						account={item}
						navigateTo='TechnicianDetails'
						handleActivation={handleActivation}
						role='technician'
					/>
				)}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={<ListEmptyComponent />}
			/>
		</Container>
	);
};
