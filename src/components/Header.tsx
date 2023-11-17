import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Bell, Navigation, Hamburger} from './icons';
import {useRoute} from '@react-navigation/native';

interface HeaderProps {
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const [menu, setMenu] = useState<string>('');
  const route = useRoute();

  useEffect(() => {
    setMenu(route.name);
  }, [route.name]);

  const openHamburgerMenu = () => {
    const navigationObject = navigation;
    if (navigationObject) {
      if (menu !== 'HamburgerScreen') {
        navigationObject.navigate('HamburgerScreen');
      } else {
        navigationObject.goBack();
      }
    } else {
      console.log('navigationObject is null');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <TouchableOpacity onPress={openHamburgerMenu}>
          <Hamburger stroke={'#FE5B00'} width={22} height={22} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri: 'https://www.gidasanayim.com/uploads/firmalogo/basdas-market-gidasanayim-86450-96933-1538407559.png',
          }}
          height={85}
          width={120}
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>Bayraklı</Text>
        <Navigation
          fill={'#039CCB'}
          stroke={'#039CCB'}
          width={22}
          height={22}
        />
        <Text style={styles.icon_text}>|</Text>
        <Bell fill={'#039CCB'} stroke={'#039CCB'} width={22} height={22} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',
  },
  image: {
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon_text: {
    fontSize: 30,
    fontWeight: '100',
  },
});

export {Header};
