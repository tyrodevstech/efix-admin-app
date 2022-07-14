import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeNavigation } from './HomeNavigation';
import { ProfileScreen } from '../screens/main-screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {},
			}}>
			<Tab.Screen
				name='HomeNav'
				component={HomeNavigation}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='home-outline'
							color={color}
							size={26}
						/>
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
					title:'Profile',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='account-outline'
							color={color}
							size={26}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
