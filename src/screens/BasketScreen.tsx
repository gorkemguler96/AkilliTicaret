import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../components/Header';
import {ArrowDown, Delete, MinusCircle, PlusCircle} from '../components/icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useBasket from '../hooks/useBasket';
import useAddProduct from '../hooks/addProduct';
import FormatedMoney from '../components/FormatedMoney';

interface Total {
  basketBagPrice: number;
  basketBagQuantity: number;
  cargoPrice: number;
  couponDiscountAmount: number;
  generalTotalPrice: number;
  totalPrice: number;
}

const initialTotal: Total = {
  basketBagPrice: 0,
  basketBagQuantity: 0,
  cargoPrice: 0,
  couponDiscountAmount: 0,
  generalTotalPrice: 0,
  totalPrice: 0,
};

interface dataItem {
  cartID: number;
  categoryName: string;
  currency: string;
  discountRate: number;
  id: number;
  kdv: number;
  listingPrice: number;
  maxSaleUnit: number;
  merchantPrice1: number;
  merchantPrice2: number;
  merchantPrice3: number;
  merchantPrice4: number;
  merchantPrice5: number;
  minSaleUnit: number;
  productImage: string;
  purchasePrice: number;
  qty: number;
  salePrice: number;
  saleUnit: string;
  stock: number;
  stockCode: string;
  stockName: string;
  stockReduced: number;
  totalPrice: number;
  unitIncrement: number;
  weight: number;
}

const BasketScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}) => {
  const [data, setData] = useState<dataItem[]>([]);
  const [total, setTotal] = useState<Total>(initialTotal);
  const [renderPage, setRenderPage] = useState<number>(0);
  const {basketData} = useBasket({renderPage});
  const {addProduct} = useAddProduct();
  let navigateTo = route?.params?.renderPage;

  const handleAddProduct = async ({
    item,
    quantity,
  }: {
    item: dataItem;
    quantity: number;
  }) => {
    if (item.qty === 1 && quantity === -1) return;
    try {
      const productId = item?.id;
      const amount = quantity;
      const response = await addProduct(productId, amount);
      console.log('Product added successfully:', response.data);
      alert('Ürün sepete eklendi.');
      setRenderPage(renderPage + 1);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding product:', error.message);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    setRenderPage(navigateTo);
    setData(basketData?.data?.detail || []);
    setTotal(basketData?.data?.basket || []);
  }, [basketData, renderPage, navigateTo]);

  const renderBasketItem = ({item}: {item: any}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.productImage}} width={100} height={100} />
        <View style={styles.centerContainer}>
          <Text style={styles.itemName}>{item?.stockName}</Text>
          <View style={styles.rowContent}>
            <TouchableOpacity
              onPress={() => handleAddProduct({item, quantity: -1})}>
              <MinusCircle width={28} height={28} stroke={'#FE5B00'} />
            </TouchableOpacity>
            <Text style={styles.itemText}>{item?.qty}</Text>
            <TouchableOpacity
              onPress={() => handleAddProduct({item, quantity: 1})}>
              <PlusCircle width={28} height={28} stroke={'#FE5B00'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.deleteContainer}>
          <Delete width={35} height={35} stroke={'#8c8c8c'} />
          <FormatedMoney value={item?.salePrice} style={styles.itemPrice} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header navigation={navigation} />
      <Text style={styles.headerText}>Sepetim</Text>
      <FlatList
        data={data}
        renderItem={renderBasketItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatlistContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.couponContainer}>
        <Text style={styles.couponText}>İndirim Kuponu Gir Yada Seç</Text>
        <ArrowDown width={22} height={22} stroke={'rgba(42,42,42,0.63)'} />
      </View>
      <View style={styles.freeDeliveryContainer}>
        <Text style={styles.freeDeliveryText}>
          Ücretsiz teslimat için 57,50 tl değerinde alışveriş yapmalısınız.
        </Text>
      </View>
      <Text style={styles.mandatoryPrice}>
        Devam etmek için sepetinize 7,25 tl değerinde ürün eklemelisiniz.
      </Text>
      <View>
        <FormatedMoney value={total?.totalPrice} style={styles.totalText} />
        <Text style={styles.deliveryFee}>Teslimat Ücreti: 2,50 tl</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sepeti Onayla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    height: '40%',
  },
  headerText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(42,42,42,0.07)',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  centerContainer: {
    width: '50%',
  },
  rowContent: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
  },
  itemName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    width: '80%',
  },
  itemPrice: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#FE5B00',
  },
  deleteContainer: {
    alignItems: 'center',
  },
  couponContainer: {
    backgroundColor: '#E6E6E6',
    width: '60%',
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(42,42,42,0.07)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  freeDeliveryText: {
    color: 'rgba(140,140,140,0.78)',
  },
  couponText: {
    color: '#8c8c8c',
    fontSize: 16,
  },
  freeDeliveryContainer: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  mandatoryPrice: {
    color: 'red',
    textAlign: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '600',
    marginTop: 10,
  },
  totalText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#FE5B00',
  },
  deliveryFee: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(140,140,140,0.78)',
  },
  button: {
    backgroundColor: '#FE5B00',
    width: '60%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BasketScreen;
