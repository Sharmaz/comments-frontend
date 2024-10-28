import { useEffect, useState } from 'react';

type FetchOptions = {
  method: string,
  headers: {
    'Content-Type': string,
    api?: string
  },
};
const useFetch = (url: string, options: FetchOptions) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
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
    };

    fetchData();
  }, [url]);

  return { comments, loading, error };
};

export default useFetch;
