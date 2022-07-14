import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main-screens/HomeScreen';
import { AdminNavigation } from './AdminNavigation';
import { CustomerNavigation } from './CustomerNavigation';
import { TechnicianNavigation } from './TechnicianNavigation';
import { AreaScreen } from '../screens/area-screens/AreaScreen';
import { ServiceNavigation } from './ServiceNavigation';
import { InvoiceNavigation } from './InvoiceNavigation';

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{ headerShown: false}}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='AdminNavigation' component={AdminNavigation} />
			<Stack.Screen name='CustomerNavigation' component={CustomerNavigation} />
			<Stack.Screen
				name='TechnicianNavigation'
				component={TechnicianNavigation}
			/>
			<Stack.Screen name='ServiceNavigation' component={ServiceNavigation} />
			<Stack.Screen
				name='AreaScreen'
				component={AreaScreen}
				options={{
					headerShown:true,
					headerStyle: { backgroundColor: '#000e21' },
					headerTintColor: '#fff',
					title:'Area List'
				}}
				
			/>
			<Stack.Screen name='InvoiceNavigation' component={InvoiceNavigation} />
		</Stack.Navigator>
	);
};
