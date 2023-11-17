import {useEffect, useState} from 'react';
import axios from 'axios';

interface FetchDataProps {
  id: number;
  name: string;
}

const useFetchData = (apiVersion: string, endpoint: string) => {
  const [data, setData] = useState<FetchDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://apiv5.akilliticaretim.com/api/${apiVersion}/${endpoint}`;
        const headers = {
          GUID: '24BE-DB0E-D75E-4060',
        };

        const response = await axios.get(apiUrl, {headers});
        setData(response.data.data);
        setLoading(false);
      } catch (e: Error | any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiVersion, endpoint, error]);

  return {data, loading, error};
};

export default useFetchData;
