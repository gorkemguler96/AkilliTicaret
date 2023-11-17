interface LoginResponse {
  error: any;
  data: string;
}

const useLogin = () => {
  const login = async (
    username: string,
    password: string,
  ): Promise<LoginResponse> => {
    const url = 'https://apiv5.akilliticaretim.com/api/v5/sf/auth/login';
    const headers: HeadersInit = {
      GUID: '24BE-DB0E-D75E-4060',
      'Content-Type': 'application/json',
    };
    const data = {
      username,
      password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const responseData: LoginResponse = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.error || 'Authentication failed';
        throw new Error(errorMessage);
      }

      return responseData;
    } catch ({message}) {
      console.error('Error:', message);
      throw new Error('Authentication failed');
    }
  };

  return {login};
};

export default useLogin;
