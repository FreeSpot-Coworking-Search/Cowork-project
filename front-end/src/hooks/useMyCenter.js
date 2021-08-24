import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useMyCenter(adminId) {
  const [myCenter, setCenter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData('/api/mycenter/', { id: adminId }).then((data) => {
      setCenter(data.centros);
      setLoading(false);
    });
  }, [adminId]);
  return [myCenter, loading];
}
