import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useCenter(centerId) {
  const [center, setCenter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData('/api/centers/', { id: centerId }).then((data) => {
      setCenter(data.center);
      setLoading(false);
    });
  }, [centerId]);

  return [center, loading, setCenter];
}
