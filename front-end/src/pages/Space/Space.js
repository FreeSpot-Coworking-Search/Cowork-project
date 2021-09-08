import './Space.css';

import useFetch from '../../hooks/useFetch';

import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import ClientSpace from './ClientSpace';
import OwnerSpace from './OwnerSpace';

export default function Space({ className }) {
  const { spaceId } = useParams();
  const [spaceData, setSpace, loading] = useFetch('spaces', spaceId);
  const owner = spaceData.owner;

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  // *********
  // ** JSX **
  // *********

  return loading && !owner ? (
    <Spinner />
  ) : owner ? (
    <OwnerSpace
      spaceData={spaceData}
      setSpace={setSpace}
      className={className}
    />
  ) : (
    <ClientSpace
      spaceData={spaceData}
      setSpace={setSpace}
      className={className}
    />
  );
}
