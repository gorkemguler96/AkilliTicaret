import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Login = ({navigation}: {navigation: NativeStackNavigationProp<any>}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login} = useLogin();

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      // @ts-ignore
      const authToken = result.data.token;
      await AsyncStorage.setItem('authToken', authToken);
      if (result) {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.gidasanayim.com/uploads/firmalogo/basdas-market-gidasanayim-86450-96933-1538407559.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.headerText}>Hoşgeldiniz</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FE5A00"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#FE5A00"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    height: 100,
    marginLeft: '10%',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FE5A00',
    fontWeight: '700',
  },
  loginContainer: {
    marginHorizontal: '15%',
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#FE5A00',
    marginVertical: 10,
    fontSize: 16,
    color: '#FE5A00',
  },
  loginButton: {
    backgroundColor: '#FE5A00',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default Login;
