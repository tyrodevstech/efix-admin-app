import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InvoiceListScreen } from '../screens/invoice-screens/InvoiceListScreen';
import { InvoiceDetailsScreen } from '../screens/invoice-screens/InvoiceDetailsScreen';

const Stack = createNativeStackNavigator();

export const InvoiceNavigation = () => {
	return (
		<Stack.Navigator initialRouteName='CustomerList'
		screenOptions={{
			headerStyle: { backgroundColor: '#000e21' },
			headerTintColor: '#fff',
		}}>
			<Stack.Screen name='InvoiceList' component={InvoiceListScreen} options={{ title: 'Invoice List' }} />
			<Stack.Screen name='InvoiceDetails' component={InvoiceDetailsScreen} options={{ title: 'Invoice Details' }} />
		</Stack.Navigator>
	);
};
