import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getData from '../helpers/getData';

import objectToQuerryParamsString from '../helpers/objectToQuerryParamsString';
import cleanSearchObject from '../helpers/cleanSearchObject';

export default function useSearchSpace(INITIAL_SEARCH_OBJECT) {
  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getData('/api/search/center', searchObject).then((data) => {
      setResults(data.results);

      history.replace(
        objectToQuerryParamsString(
          '/search/center/',
          cleanSearchObject(searchObject)
        )
      );

      setLoading(false);
    });
  }, [searchObject, history]);

  const resetSearchObject = () => {
    setSearchObject({});
  };
  return [loading, results, searchObject, setSearchObject, resetSearchObject];
}
