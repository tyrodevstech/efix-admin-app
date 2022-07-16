import React, { useContext, useEffect } from 'react';
import { Container, Text, Image, Center, FlatList } from 'native-base';

import { AccountItem } from '../../../components/flatlist/ListItem';
import { AccountContext } from '../../../context/AccountContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { CrudLoading, Loading } from '../../../components/loading';
import { BgShape1 } from '../../../components/shape';
import { ListHeaderComponent } from '../../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../../components/flatlist/ListEmptyComponent';

export const CustomerListScreen = ({ navigation }) => {
	const { accounts, setAccounts, handleActivation, getAccounts } =
		useContext(AccountContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAccounts('customer');
		});
		navigation.addListener('beforeRemove', (e) => {
			setAccounts([]);
		});
	}, [isFocused]);

	if (isLoading) return <Loading />;
	else if (crudLoading) return <CrudLoading />;

	return (
		<>
			<Container h='100%' w='100%' maxWidth='100%'>
				{/* <StatusBar animated={true} barStyle='light-content' /> */}
				<BgShape1 />
				<FlatList
					ListHeaderComponent={<ListHeaderComponent items={accounts} />}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={accounts}
					renderItem={({ item }) => (
						<AccountItem
							account={item}
							navigateTo='CustomerDetails'
							handleActivation={handleActivation}
							role='customer'
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</Container>
		</>
	);
};
