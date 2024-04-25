import useSWR from 'swr';
import prisma from '@/utils/connect';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const useCustomFetch = (query: string) => {
  const { data, error } = useSWR(query, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCustomFetch;
