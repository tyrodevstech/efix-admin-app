import React, { useContext, useEffect } from 'react';
import {
	Container,
	FlatList,
} from 'native-base';

import { InvoiceItem } from '../../components/flatlist/ListItem';
import { LoadingContext } from '../../context/LoadingContext';
import { useIsFocused } from '@react-navigation/native';
import { Loading, CrudLoading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { BgShape1 } from '../../components/shape';
import { ListHeaderComponent } from '../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../components/flatlist/ListEmptyComponent';

export const InvoiceListScreen = ({ navigation }) => {
	const { invoices, getInvoices, handlePaymentStatus } =
		useContext(ActionContext);
	const { isLoading, crudLoading, setIsLoading } = useContext(LoadingContext);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		navigation.addListener('focus', (e) => {
			getInvoices();
		});
		navigation.addListener('beforeRemove', (e) => {
			getInvoices([]);
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
					ListHeaderComponent={<ListHeaderComponent items={invoices} />}
					width='100%'
					maxWidth='100%'
					flex={1}
					height='100%'
					data={invoices}
					renderItem={({ item }) => (
						<InvoiceItem
							invoice={item}
							navigateTo='InvoiceDetails'
							handlePaymentStatus={handlePaymentStatus}
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={<ListEmptyComponent />}
				/>
			</Container>
		</>
	);
};
