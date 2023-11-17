import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BasketResponse {
  error: any;
  data: any;
}

interface UseBasketProps {
  renderPage: number;
}

const useBasket = ({renderPage}: UseBasketProps) => {
  const [basketData, setBasketData] = useState<BasketResponse | null>(null);
  const [authToken, setAuthToken] = useState<string>('');

  const getAuthTokenAndFetchBasket = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken !== null) {
        setAuthToken(storedToken);
      }
    } catch (error) {
      console.error('Error getting authToken from AsyncStorage:', error);
    } finally {
    }
  };

  useEffect(() => {
    getAuthTokenAndFetchBasket();
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchBasketData = async () => {
        try {
          const url =
            'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart-v2';
          const headers: HeadersInit = {
            GUID: '24BE-DB0E-D75E-4060',
            Authorization: `Bearer ${authToken}`,
          };

          const response = await fetch(url, {
            method: 'GET',
            headers,
          });

          const responseData: BasketResponse = await response.json();

          if (!response.ok) {
            const errorMessage = responseData.error;
            console.log('Error:', errorMessage);
          }

          setBasketData(responseData);
        } catch (error: any) {
          console.error('Error:', error.message);
          throw new Error('Basket request failed');
        }
      };

      fetchBasketData();
    }
  }, [renderPage, authToken]);

  return {basketData};
};

export default useBasket;
