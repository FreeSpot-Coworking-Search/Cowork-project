import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useSearchSpace(INITIAL_SEARCH_OBJECT) {
  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData('/api/search/space', searchObject).then((data) => {
      setResults(data.results);
      setLoading(false);
    });
  }, [searchObject]);

  const resetSearchObject = () => {
    setSearchObject(INITIAL_SEARCH_OBJECT);
  };
  return [loading, results, searchObject, setSearchObject, resetSearchObject];
}
