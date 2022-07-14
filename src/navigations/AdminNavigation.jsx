import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminListScreen } from '../screens/account-screens/admin-screens/AdminListScreen';
import { AdminDetailsScreen } from '../screens/account-screens/admin-screens/AdminDetailsScreen';
import { AdminCreateScreen } from '../screens/account-screens/admin-screens/AdminCreateScreen';

const Stack = createNativeStackNavigator();

export const AdminNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='AdminList'
			screenOptions={{
				headerStyle: { backgroundColor: '#000e21' },
				headerTintColor: '#fff',
			}}>
			<Stack.Screen
				name='AdminList'
				component={AdminListScreen}
				options={{ title: 'Admin Account List' }}
			/>
			<Stack.Screen
				name='AdminDetails'
				component={AdminDetailsScreen}
				options={{ title: 'Admin Account Details' }}
			/>
			<Stack.Screen
				name='AdminCreate'
				component={AdminCreateScreen}
				options={{ title: 'Create Admin Account' }}
			/>
		</Stack.Navigator>
	);
};
