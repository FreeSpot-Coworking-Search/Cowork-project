import { useEffect, useState } from 'react';
import cleanSearchObject from '../helpers/cleanSearchObject';
import getData from '../helpers/getData';
import objectToQuerryParamsString from '../helpers/objectToQuerryParamsString';

export default function useSearchSpace(INITIAL_SEARCH_OBJECT) {
  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const RESET_SEARCH_OBJECT = {
    id_centro: INITIAL_SEARCH_OBJECT.id_centro,
  };

  useEffect(() => {
    setLoading(true);
    getData('/api/search/space', searchObject).then((data) => {
      setResults(data.results);
      window.history.pushState(
        '',
        'New Page Title',
        objectToQuerryParamsString(
          '/search/space/',
          cleanSearchObject(searchObject)
        )
      );
      setLoading(false);
    });
  }, [searchObject]);

  const resetSearchObject = () => {
    setSearchObject(RESET_SEARCH_OBJECT);
  };
  return [loading, results, searchObject, setSearchObject, resetSearchObject];
}
