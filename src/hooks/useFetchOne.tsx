import {useState, useEffect} from 'react';

const useFetchOne = (func: any, deps = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    await func
      .then((res: any) => {
        setError('');
        setData(res.data.data);
      })
      .catch((err: any) => {
        setData({});
        setError(err.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [...deps]);
  return {data, isLoading, error};
};

export default useFetchOne;
