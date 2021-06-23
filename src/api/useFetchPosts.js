import { useState, useEffect, useCallback } from 'react';
import { api } from './axiosService';

const useFetchPosts = (startIndex, limit) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(
    async (startIndex, limit) => {
      setIsLoading(true);
      try {
        const res = await api({
          url: 'posts',
          method: 'GET',
        });
        const result = res.data.slice(startIndex, limit + startIndex);
        setData(result);
        setStatus(res.status);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        const {
          data: { message },
          status,
          statusText,
        } = error.response;
        setError({ message, status, statusText });
      }
    },
    [startIndex, limit]
  );
  console.log(typeof fetchData);
  useEffect(() => {
    if (!startIndex && startIndex !== 0) return;
    fetchData(startIndex, limit);
  }, [startIndex, fetchData]);
  return [data, status, isLoading, error, fetchData];
};

export default useFetchPosts;
