import { useState } from "react";
import { useEffect } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch." });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);
  return { fetchedData, isFetching, error, setFetchedData };
}
