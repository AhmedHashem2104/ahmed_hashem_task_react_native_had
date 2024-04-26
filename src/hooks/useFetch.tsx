import {AxiosError, AxiosResponse} from 'axios';
import {useState, useEffect} from 'react';

function useFetch<T>(
  func: Promise<AxiosResponse<T>>,
  deps: any[] = [],
): {
  data: T | null;
  isLoading: boolean;
  error: string;
  response: AxiosResponse<T>;
} {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    await func
      .then((res: AxiosResponse<T>) => {
        setError('');
        setData(res.data);
        setResponse(res);
      })
      .catch((err: AxiosError) => {
        setData(null);
        setError(err.message || 'Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
  return {data, isLoading, error, response};
}

export default useFetch;
