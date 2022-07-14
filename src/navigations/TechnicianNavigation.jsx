import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TechnicianListScreen } from '../screens/account-screens/technician-screens/TechnicianListScreen';
import { TechnicianDetailsScreen } from '../screens/account-screens/technician-screens/TechnicianDetailsScreen';

const Stack = createNativeStackNavigator();

export const TechnicianNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='CustomerList'
			screenOptions={{
				headerStyle: { backgroundColor: '#000e21' },
				headerTintColor: '#fff',
			}}>
			<Stack.Screen name='TechnicianList' component={TechnicianListScreen} options={{ title: 'Technician Account List' }} />
			<Stack.Screen
				name='TechnicianDetails'
				component={TechnicianDetailsScreen}
				options={{ title: 'Technician Account Details' }}
			/>
		</Stack.Navigator>
	);
};
