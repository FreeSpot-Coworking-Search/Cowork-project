import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

export default function useSpace(spaceId) {
  const [space, setSpace] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      getData('/api/spaces/', { id: spaceId }).then((data) => {
        setSpace(data.space);
        setLoading(false);
      });
    },
    [spaceId]
  );
  return [space, loading, setSpace];
}
