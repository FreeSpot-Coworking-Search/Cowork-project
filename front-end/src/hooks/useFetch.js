import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useFetch(endpoint, id) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(
        function () {
            setLoading(true);
            getData(`/api/${endpoint}`, { id: id }).then((data) => {
                setData(data.space);
                setLoading(false);
            });
        },
        [endpoint, id]
    );
    return [data, setData, loading];
}
