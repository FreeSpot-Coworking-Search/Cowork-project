import { Link, Redirect, useHistory } from 'react-router-dom';
import cleanSearchObject from '../../helpers/cleanSearchObject';
import { toFormDate } from '../../helpers/dateHelper';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';
import HomeTypeSpaceSelector from '../HomeTypeSpaceSelector/HomeTypeSpaceSelector';
import './HomeSearch.css';
export default function HomeSearch({ searchObject, setSearchObject }) {
  return (
    <form className="mainSectionNavigation">
      <ul className="homeSearch">
        <li>
          <div className="homeSearchSpace">
            <div className="homeSearchElement">
              <input
                id="texto"
                className="homeSearch-txt"
                type="text"
                placeholder="¿Donde?"
                value={searchObject.texto}
                onChange={(event) =>
                  setSearchObject({
                    ...searchObject,
                    texto: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </li>
        <li>
          <div className="homeSearchSpace">
            <HomeTypeSpaceSelector
              setSearchObject={setSearchObject}
              searchObject={searchObject}
            />
          </div>
        </li>
        <li>
          <div className="homeSearchSpace">
            <div className="homeSearchElement">
              <input
                id="fecha_inicio"
                className="homeSearch-txt"
                type="date"
                value={searchObject.fecha_inicio}
                onChange={(event) =>
                  setSearchObject({
                    ...searchObject,
                    fecha_entrada: new Date(event.target.value),
                  })
                }
              />
            </div>
            <div className="homeSearchElement">
              <input
                id="fecha_fin"
                className="homeSearch-txt"
                type="date"
                value={searchObject.fecha_fin}
                onChange={(event) =>
                  setSearchObject({
                    ...searchObject,
                    fecha_salida: new Date(event.target.value),
                  })
                }
              />
            </div>
          </div>
        </li>
      </ul>
      <Link
        to={objectToQuerryParamsString(
          '/search/center/',
          cleanSearchObject(searchObject)
        )}
      >
        hola bego
      </Link>
    </form>
  );
}
