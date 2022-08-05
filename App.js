import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import { AdminProvider } from './src/context/AdminContext';
import { MiscellaneousProvider } from './src/context/MiscellaneousContext';
import { AccountProvider } from './src/context/AccountContext';
import { LoadingProvider } from './src/context/LoadingContext';
import { ActionProvider } from './src/context/ActionContext';

import { MainNavigation } from './src/navigations/MainNavigation';
import { LoginScreen } from './src/screens/initial-screens/LoginScreen';
import { AuthProvider } from './src/context/AuthContext';
import {
	setStatusBarBackgroundColor,
	setStatusBarTranslucent,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { registerForPushNotificationsAsync } from './src/utils';

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		setStatusBarTranslucent(true);
		setStatusBarBackgroundColor('transparent');
		registerForPushNotificationsAsync();
	}, []);
	return (
		<LoadingProvider>
			<AuthProvider>
				<MiscellaneousProvider>
					<AdminProvider>
						<AccountProvider>
							<ActionProvider>
								<NativeBaseProvider>
									<NavigationContainer>
										<Stack.Navigator initialRouteName='Login'>
											<Stack.Screen
												name='Login'
												component={LoginScreen}
												options={{ headerShown: false }}
											/>
											<Stack.Screen
												name='MainNav'
												component={MainNavigation}
												options={{
													headerShown: false,
												}}
											/>
										</Stack.Navigator>
									</NavigationContainer>
								</NativeBaseProvider>
							</ActionProvider>
						</AccountProvider>
					</AdminProvider>
				</MiscellaneousProvider>
			</AuthProvider>
		</LoadingProvider>
	);
}
