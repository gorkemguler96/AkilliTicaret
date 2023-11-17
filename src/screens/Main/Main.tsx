import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CategoriesScreen from '../Categories/Categories';
import {Home, Search, ShoppingBag, Tag, User} from '../../components/icons';
import HamburgerScreen from '../HamburgerScreen';
import BasketScreen from '../BasketScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
let t = 1;

const handleNavigationBasket = (navigation: NativeStackNavigationProp<any>) => {
  t = t + 1;
  if (t > 10) {
    t = 0;
  }
  navigation.navigate('BasketScreen', {renderPage: t + 1});
};

const Main = ({navigation}: {navigation: NativeStackNavigationProp<any>}) => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarShowLabel: false,
      headerShown: false,
    })}
    sceneContainerStyle={styles.container}
    tabBar={() => (
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Home stroke={'#FFF'} width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Search stroke={'#FFF'} width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationBasket(navigation)}>
          <ShoppingBag stroke={'#FFF'} width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Tag stroke={'#FFF'} width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <User stroke={'#FFF'} width={32} height={32} />
        </TouchableOpacity>
      </View>
    )}>
    <Tab.Screen name={'HomeScreen'} component={HomeScreen} />
    <Tab.Screen name={'CategoriesScreen'} component={CategoriesScreen} />
    <Tab.Screen name={'HamburgerScreen'} component={HamburgerScreen} />
    <Tab.Screen name={'BasketScreen'} component={BasketScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: '#FE5B00',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: '3%',
  },
});

export default Main;
