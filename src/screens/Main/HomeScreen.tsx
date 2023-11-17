import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import useFetchData from '../../hooks/FetchData';
import {Header} from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const images = [
    'https://cdn03.ciceksepeti.com/cicek/kcm20554864-1/L/yenidogan-bebek-ve-orme-oyuncaklar-dekoratif-yatay-kanvas-tablo-kcm20554864-1-3e005986433d4c8db1844eb6e6009aaa.jpg',
    'https://yapimarka.com/resimler/410200600580.jpg.webp',
    'https://www.gidasanayim.com/uploads/firmalogo/basdas-market-gidasanayim-86450-96933-1538407559.png',
  ];
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

  const renderCategoryItem = ({item}: {item: Category}) => {
    return (
      <View style={styles.renderCategoryContainer}>
        <TouchableOpacity onPress={() => handlePress({item})}>
          <Image
            source={{
              uri: 'https://kiralamini.com/wp-content/uploads/2023/07/72135-1-1.jpg',
            }}
            style={styles.renderCategoryImg}
          />
          <Text style={styles.renderCategoryText}>{item.categoryName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} key={'Header'} />
      <FlatList
        data={categoriesData}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ScrollView
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}>
            {images.map((imageUrl, index) => (
              <View key={index.toString()}>
                <Image source={{uri: imageUrl}} style={styles.img} />
              </View>
            ))}
          </ScrollView>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  renderCategoryContainer: {
    flex: 1,
    paddingHorizontal: '2%',
  },
  renderCategoryImg: {
    width: '100%',
    height: 100,
  },
  renderCategoryText: {
    textAlign: 'center',
  },
  img: {
    width: Dimensions.get('window').width * 0.94,
    height: 150,
    objectFit: 'cover',
  },
});

export default HomeScreen;
