import './LocationPointer.css';
import { SearchPointerIcon } from '../Icons/Icons';

export default function LocationPointer({ text, id, searchObject }) {
  return (
    <div className="pointerContainer">
      <SearchPointerIcon className="locationPointer" />
    </div>
  );
}
