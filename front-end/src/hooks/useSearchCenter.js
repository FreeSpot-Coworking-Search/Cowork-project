import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getData from '../helpers/getData';

export default function useSearchSpace(INITIAL_SEARCH_OBJECT) {
    const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        getData('/api/search/center', searchObject)
            .then((data) => {
                setResults(data.results);
                setLoading(false);
            })
            .catch((error) => {
                history.replace('/nomatch');
            });
    }, [searchObject, history]);

    const resetSearchObject = () => {
        setSearchObject(INITIAL_SEARCH_OBJECT);
    };
    return [loading, results, searchObject, setSearchObject, resetSearchObject];
}
