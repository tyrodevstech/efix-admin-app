import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
	MaterialCommunityIcons,
	FontAwesome5,
	Ionicons,
	Feather,
} from '@expo/vector-icons';
import { HomeNavigation } from './HomeNavigation';
import { ProfileScreen } from '../screens/main-screens/ProfileScreen';
import { TransactionScreen } from '../screens/main-screens/TransactionScreen';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName='HomeNav'
			backBehavior='initialRoute'
			screenOptions={{
				headerShown: false,
				tabBarStyle: {},
				tabBarShowLabel: false,
				// tabBarActiveBackgroundColor: '#000e21',
				tabBarActiveTintColor: '#1D4ED8',
				tabBarInactiveTintColor: '#888',
			}}>
			<Tab.Screen
				name='Transaction'
				component={TransactionScreen}
				options={{
					tabBarLabel: 'Transaction',
					tabBarIcon: ({ color }) => (
						<Feather name='activity' color={color} size={20} />
					),
				}}
			/>
			<Tab.Screen
				name='HomeNav'
				component={HomeNavigation}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<Feather name='codesandbox' color={color} size={36} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					headerShown: true,
					headerStyle: { backgroundColor: '#000e21' },
					headerTintColor: '#fff',
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<Feather name='user' color={color} size={20} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
