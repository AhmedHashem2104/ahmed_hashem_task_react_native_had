import {useState, useEffect} from 'react';

const usePagination = (
  func: (page: number, ...args: any) => Promise<any>,
): {
  data: object[];
  isLoading: boolean;
  error: string;
  handleMore: () => void;
  isLoadingMore: boolean;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    await func(page)
      .then((res: any) => {
        setError('');
        setData((prev): any => [...prev, ...res.data.results]);
      })
      .catch((err: any) => {
        setData([]);
        setError(err.response.data);
      })
      .finally(() => {
        setIsLoadingMore(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleMore = () => {
    setIsLoadingMore(true);
    setPage(prev => prev + 1);
  };

  return {
    data,
    isLoading,
    error,
    handleMore,
    isLoadingMore,
  };
};

export default usePagination;
