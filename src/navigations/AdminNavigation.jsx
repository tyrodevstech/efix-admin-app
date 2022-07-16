import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminListScreen } from '../screens/account-screens/admin-screens/AdminListScreen';
import { AdminDetailsScreen } from '../screens/account-screens/admin-screens/AdminDetailsScreen';
import { AdminCreateScreen } from '../screens/account-screens/admin-screens/AdminCreateScreen';
import { Button, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';
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
				options={({ navigation, route }) => ({
					title: 'Admin Account List',
					headerRight: () => (
						<Button
							colorScheme='darkBlue'
							size='sm'
							leftIcon={<Icon size='sm' as={<Feather name='user-plus' />} />}
							onPress={() => navigation.navigate('AdminCreate')}>
						</Button>
					),
				})}
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
