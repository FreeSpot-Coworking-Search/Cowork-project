import './SearchPointer.css';
import { SearchPointerIcon } from '../../components/Icons/Icons';
import { Link } from 'react-router-dom';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';
import cleanSearchObject from '../../helpers/cleanSearchObject';

export default function SearchPointer({ text, id, searchObject }) {
  return (
    <div>
      <Link
        to={objectToQuerryParamsString(
          '/search/space',
          { id_centro: id },
          cleanSearchObject(searchObject)
        )}
        className="pointerContainer"
      >
        <SearchPointerIcon className="searchPointer" />
      </Link>
    </div>
  );
}
