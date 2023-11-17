import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import useFetchData from '../../hooks/FetchData';
import useAddProduct from '../../hooks/addProduct';
import FormatedMoney from '../../components/FormatedMoney';

interface SubCategoriesProps {
  subCategoryID: number;
}

interface SubCategoryItem {
  currency: string;
  discountRate: number;
  id: number;
  inCartQty: number;
  isInFavorite: number;
  kdv: number;
  key: number;
  listPrice: number;
  listPriceVat: string;
  maxSaleUnit: number;
  minSaleUnit: number;
  price: number;
  priceVat: string;
  productImages: {
    id: number;
    imagePath: string;
  }[];
  score: number;
  stock: number;
  stockCode: string;
  stockName: string;
  stockType: string;
  totalRow: number;
  unitIncrement: number;
}

const convertToSubCategoryItem = (item: any): SubCategoryItem => {
  return {
    currency: item.currency,
    discountRate: item.discountRate,
    id: item.id,
    inCartQty: item.inCartQty,
    isInFavorite: item.isInFavorite,
    kdv: item.kdv,
    key: item.key,
    listPrice: item.listPrice,
    listPriceVat: item.listPriceVat,
    maxSaleUnit: item.maxSaleUnit,
    minSaleUnit: item.minSaleUnit,
    price: item.price,
    priceVat: item.priceVat,
    productImages: item.productImages.map((image: any) => ({
      id: image.id,
      imagePath: image.imagePath,
    })),
    score: item.score,
    stock: item.stock,
    stockCode: item.stockCode,
    stockName: item.stockName,
    stockType: item.stockType,
    totalRow: item.totalRow,
    unitIncrement: item.unitIncrement,
  };
};

const SubCategories: React.FC<SubCategoriesProps> = ({subCategoryID}) => {
  const [subCategory, setSubCategory] = useState<SubCategoryItem[]>([]);
  const apiVersion = 'v5';
  const endpoint = `sf/product/category_products?Id=${subCategoryID}&PageNumber=2&PageSize=10`;
  const {data} = useFetchData(apiVersion, endpoint);
  const {addProduct} = useAddProduct();

  useEffect(() => {
    const convertedData: SubCategoryItem[] = (data || []).map(
      convertToSubCategoryItem,
    );
    setSubCategory(convertedData);
  }, [data, subCategoryID]);

  const handleAddProduct = async ({item}: {item: SubCategoryItem}) => {
    try {
      const productId = item?.id;
      const amount = 1;
      const response = await addProduct(productId, amount);
      console.log('Product added successfully:', response?.data);
      alert('Ürün sepete eklendi.');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding product:', error?.message);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  };

  const renderSubCategory = ({item}: {item: SubCategoryItem}) => {
    return (
      <TouchableOpacity
        onPress={() => handleAddProduct({item})}
        style={styles.subCategoryItem}>
        <Image
          source={{uri: item.productImages[0].imagePath}}
          width={100}
          height={150}
        />
        <FormatedMoney value={item?.price} style={styles.subCategoryText} />
        <Text style={styles.stockName}>{item.stockName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      numColumns={3}
      data={subCategory}
      renderItem={renderSubCategory}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subCategoryItem: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '33%',
  },
  subCategoryText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#FE5A00',
    fontWeight: '600',
  },
  stockName: {
    textAlign: 'center',
  },
});

export {SubCategories};
