import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import { AdminProvider } from './src/context/AdminContext';
import { AccountProvider } from './src/context/AccountContext';
import { LoadingProvider } from './src/context/LoadingContext';
import { ActionProvider } from './src/context/ActionContext';

import { MainNavigation } from './src/navigations/MainNavigation';
import { LoginScreen } from './src/screens/initial-screens/LoginScreen';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<LoadingProvider>
			<AuthProvider>
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
			</AuthProvider>
		</LoadingProvider>
	);
}
