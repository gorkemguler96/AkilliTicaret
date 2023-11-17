import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useFetchData from '../../hooks/FetchData';
import {Header} from '../../components/Header';
import {useRoute} from '@react-navigation/native';
import {SubCategories} from './SubCategories';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Category = {
  categoryName: string;
  hasImage: number;
  id: number;
  imagePath: {
    id: number;
    imagePath: string;
  };
  link: string;
  order: number;
  parentId: number;
  productCount: number;
  subCategoryCount: number;
};

const CategoriesScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [id, setId] = useState<boolean | number>(false);
  const route = useRoute();
  const {item, categoriesName} = route?.params || ({} as any);
  const apiVersion = 'v5';
  const endpoint = `ad/product/categories?parentId=${id}`;
  const {data: Firsdata} = useFetchData(apiVersion, endpoint);
  let subCategoryID = categoriesData?.map(t => t.id);
  useEffect(() => {
    // @ts-ignore
    setCategoriesData(Firsdata?.categories || []);
  }, [Firsdata]);

  useEffect(() => {
    setId(item?.id);
  }, [item?.id]);

  const headerComponent = () => {
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoriesName.map((category: any) => (
            <TouchableOpacity
              onPress={() => {
                setId(category?.id);
              }}
              key={category.categoryName}>
              <Image
                style={{
                  borderWidth:
                    //@ts-ignore
                    Firsdata?.selectedCategoryId === category.id ? 2 : 0,
                  borderColor: '#FFD9C5',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                source={{
                  uri: 'https://kiralamini.com/wp-content/uploads/2023/07/72135-1-1.jpg',
                }}
                width={85}
                height={75}
              />
              <Text
                style={{
                  width: 80,
                  textAlign: 'center',
                  fontWeight:
                    //@ts-ignore
                    Firsdata?.selectedCategoryId === category.id
                      ? '800'
                      : '400',
                }}>
                {category.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          style={styles.subCategory}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {categoriesData.map((subCategory: any, index: number) => {
            return (
              <TouchableOpacity key={index}>
                <Text style={styles.subCategoryText}>
                  {subCategory.categoryName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {headerComponent()}
      <SubCategories subCategoryID={subCategoryID[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  subCategory: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subCategoryText: {
    backgroundColor: '#FE5A00',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10,
  },
});

export default CategoriesScreen;
