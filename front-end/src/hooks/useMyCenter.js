import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getData from '../helpers/getData';

export default function useMyCenter(adminId) {
    const [myCenter, setCenter] = useState({});
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        getData('/api/mycenter/', { id: adminId })
            .then((data) => {
                setCenter(data.centros);
                setLoading(false);
            })
            .catch((error) => {
                history.replace('/nomatch');
            });
    }, [adminId, history]);
    return [myCenter, loading];
}
