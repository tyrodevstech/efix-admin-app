import React, { useCallback, useContext, useState } from 'react';
import { Container, FlatList } from 'native-base';
import { InvoiceItem } from '../../components/flatlist/ListItem';
import { LoadingContext } from '../../context/LoadingContext';
import { useFocusEffect } from '@react-navigation/native';
import { Loading, CrudLoading } from '../../components/loading';
import { ActionContext } from '../../context/ActionContext';
import { BgShape1 } from '../../components/shape';
import { ListHeaderComponent } from '../../components/flatlist/ListHeaderComponent';
import { ListEmptyComponent } from '../../components/flatlist/ListEmptyComponent';

export const InvoiceListScreen = ({ navigation }) => {
	const { invoices, setInvoices, getInvoices, handlePaymentStatus } =
		useContext(ActionContext);
	const { crudLoading } = useContext(LoadingContext);
	const [pageLoading, setPageLoading] = useState(true);
	const [search, setSearch] = useState('');

	useFocusEffect(
		useCallback(() => {
			getInvoices({ search: search, setPageLoading: setPageLoading });
			navigation.addListener('blur', (e) => {
				setPageLoading(true);
				setInvoices([]);
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
						items={invoices}
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
	);
};
