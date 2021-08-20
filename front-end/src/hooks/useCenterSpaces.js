import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useCenterSpaces(centerId) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData('/api/search/space', { id_centro: centerId }).then((data) => {
      setResults(data.results);
      setLoading(false);
    });
  }, [centerId]);

  return [loading, results];
}
