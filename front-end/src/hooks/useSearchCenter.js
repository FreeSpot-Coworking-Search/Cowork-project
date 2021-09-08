import { useEffect, useState } from 'react';
import getData from '../helpers/getData';
import { browserHistory } from 'react-router';
import objectToQuerryParamsString from '../helpers/objectToQuerryParamsString';
import cleanSearchObject from '../helpers/cleanSearchObject';

export default function useSearchSpace(INITIAL_SEARCH_OBJECT) {
  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData('/api/search/center', searchObject).then((data) => {
      setResults(data.results);
      window.history.pushState(
        '',
        'New Page Title',
        objectToQuerryParamsString(
          '/search/center/',
          cleanSearchObject(searchObject)
        )
      );
      setLoading(false);
    });
  }, [searchObject]);

  const resetSearchObject = () => {
    setSearchObject({});
  };
  return [loading, results, searchObject, setSearchObject, resetSearchObject];
}
