import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/screens/Main/Main';

type RootStackParamList = {
  LoginScreen: undefined;
  Main: {authToken: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const retrieveAuthToken = async () => {
    try {
      const storedAuthToken = await AsyncStorage.getItem('authToken');
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
      }
    } catch (error) {
      console.error('Error retrieving AuthToken:', error);
    }
  };

  useEffect(() => {
    retrieveAuthToken();
  }, [authToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!authToken ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : null}
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
