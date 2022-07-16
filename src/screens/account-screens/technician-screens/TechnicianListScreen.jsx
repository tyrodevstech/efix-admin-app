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

import { AccountItem } from '../../../components/flatlist/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { AccountContext } from '../../../context/AccountContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { CrudLoading, Loading } from '../../../components/loading';
import { ListHeaderComponent } from '../../../components/flatlist/ListHeaderComponent';
import { BgShape1 } from '../../../components/shape';
import { ListEmptyComponent } from '../../../components/flatlist/ListEmptyComponent';

export const TechnicianListScreen = ({ navigation }) => {
	const { accounts, setAccounts, handleActivation, getAccounts } =
		useContext(AccountContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getAccounts('technician');
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
							navigateTo='TechnicianDetails'
							handleActivation={handleActivation}
							role='technician'
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</Container>
		</>
	);
};
