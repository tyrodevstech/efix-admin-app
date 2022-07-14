import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ServiceListScreen } from '../screens/service-screens/ServiceListScreen';
import { ServiceDetailsScreen } from '../screens/service-screens/ServiceDetailsScreen';

const Stack = createNativeStackNavigator();

export const ServiceNavigation = () => {
	return (
		<Stack.Navigator initialRouteName='CustomerList'
		screenOptions={{
			headerStyle: { backgroundColor: '#000e21' },
			headerTintColor: '#fff',
		}}>
			<Stack.Screen name='ServiceList' component={ServiceListScreen} options={{ title: 'Service List' }} />
			<Stack.Screen name='ServiceDetails' component={ServiceDetailsScreen} options={{ title: 'Service Details' }} />
		</Stack.Navigator>
	);
};
