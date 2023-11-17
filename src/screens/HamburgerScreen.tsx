import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Header} from '../components/Header';
import useFetchData from '../hooks/FetchData';
import {RightArrow} from '../components/icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Category = {
  categoryName: string;
  hasImage: number;
  id: number;
  link: string;
  order: number;
  parentId: number;
  productCount: number;
  subCategoryCount: number;
};

const HamburgerScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const apiVersion = 'v5';
  const endpoint = 'ad/product/categories';
  const {data} = useFetchData(apiVersion, endpoint);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setCategoriesData(data?.categories || []);
    }
  }, [data]);

  const handlePress = ({item}: {item: Category}) => {
    navigation.navigate('CategoriesScreen', {
      item: item,
      categoriesName: categoriesData,
    });
  };

  const renderHamburgerCategoryItem = ({item}: {item: Category}) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress({item})}
        style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.categoryName}</Text>
        <RightArrow widt={22} height={22} stroke={'#2a2a2a'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={categoriesData}
        renderItem={renderHamburgerCategoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(42,42,42,0.07)',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HamburgerScreen;
