import { useEffect, useState, useCallback } from 'react';

type FetchOptions = {
  method: string,
  headers: {
    'Content-Type': string,
    api?: string
  },
};
const useFetch = (url: string, options: FetchOptions, { immediate = false }  = {}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (options: FetchOptions) => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const json = await response.json();
      setComments(json);
      setLoading(false);
      setError('');
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    }

  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData(options);
    }
  }, [fetchData, immediate]); // eslint-disable-line react-hooks/exhaustive-deps

  return { comments, setComments, loading, error, fetchData };
};

export default useFetch;
