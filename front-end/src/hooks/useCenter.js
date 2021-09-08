import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

//import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function useCenter(centerId) {
    const [center, setCenter] = useState({});
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        getData('/api/centers/', { id: centerId })
            .then((data) => {
                setCenter(data.center);
                setLoading(false);
            })
            .catch((error) => {
                //<Redirect to="/nomatch" />;
                history.replace('/nomatch');
            });
    }, [centerId, history]);

    return [center, loading, setCenter];
}
