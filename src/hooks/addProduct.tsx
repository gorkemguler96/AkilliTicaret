import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

interface ProductRequest {
  productId: number;
  amount: number;
}

interface ProductResponse {
  error: any;
  data: any;
}

const useAddProduct = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken !== null) {
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.error('Error getting authToken from AsyncStorage:', error);
      }
    };

    getAuthToken();
  }, []);

  const addProduct = async (
    productId: number,
    amount: number,
  ): Promise<ProductResponse> => {
    const url = 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart';
    const headers: HeadersInit = {
      GUID: '24BE-DB0E-D75E-4060',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const data: ProductRequest = {
      productId,
      amount,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const responseData: ProductResponse = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.error || 'Add product request failed';
        console.log('Error:', errorMessage);
      }

      return responseData;
    } catch (error: any) {
      console.error('Error:', error.message);
      throw new Error('Add product request failed');
    }
  };

  return {addProduct};
};

export default useAddProduct;
