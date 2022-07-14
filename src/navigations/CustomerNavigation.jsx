import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerListScreen } from '../screens/account-screens/customer-screens/CustomerListScreen';
import { CustomerDetailsScreen } from '../screens/account-screens/customer-screens/CustomerDetailsScreen';

const Stack = createNativeStackNavigator();

export const CustomerNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='CustomerList'
			screenOptions={{
				headerStyle: { backgroundColor: '#000e21' },
				headerTintColor: '#fff',
			}}>
			<Stack.Screen name='CustomerList' component={CustomerListScreen} options={{ title: 'Customer Account List' }} />
			<Stack.Screen name='CustomerDetails' component={CustomerDetailsScreen} options={{ title: 'Customer Account Details' }} />
		</Stack.Navigator>
	);
};
