import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getData from '../helpers/getData';

export default function useFetch(endpoint, id) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(
        function () {
            setLoading(true);
            getData(`/api/${endpoint}`, { id: id })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    history.replace('/nomatch');
                });
        },
        [endpoint, id, history]
    );
    return [data, setData, loading];
}
