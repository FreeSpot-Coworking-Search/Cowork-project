import { Link } from 'react-router-dom';
import cleanSearchObject from '../../helpers/cleanSearchObject';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';
import { LocationIcon, DesktopIcon } from '../../components/Icons/Icons';
import './HomeSearch.css';
import { toFormDate } from '../../helpers/dateHelper';

export default function HomeSearch({ searchObject, setSearchObject }) {
    return (
        <form className="mainSectionHomeSearchs">
            <ul className="homeSearch">
                <li>
                    <div className="homeSearchSpace">
                        <div className="homeSearchElementCenter">
                            <LocationIcon className="mainNavigationButtonIcon" />
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
                    </div>
                </li>
                <li>
                    <div className="homeSearchSpace">
                        <div className="homeSearchElementCenter">
                            <DesktopIcon className="mainNavigationButtonIcon" />
                            <div className="homeSearchElement">
                                <select
                                    id="tipo"
                                    className="homeSearch-txt"
                                    value={searchObject.tipo}
                                    onChange={(event) =>
                                        setSearchObject({
                                            ...searchObject,
                                            tipo: event.target.value,
                                        })
                                    }
                                >
                                    <option value="">Tipo de espacio</option>
                                    <option value="Mesa Flex">Mesa Flex</option>
                                    <option value="Mesa Fija">Mesa Fija</option>
                                    <option value="Despacho">Despacho</option>
                                    <option value="Sala de reuniones">
                                        Sala de reuniones
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="homeSearchSpace">
                        <div className="homeSearchElementDates">
                            <label>
                                Entrada
                                <div className="homeSearchElement">
                                    <input
                                        type="date"
                                        id="fecha_inicio"
                                        placeholder="Fecha de entrada"
                                        min={toFormDate(new Date())}
                                        className="homeSearch-txt"
                                        value={searchObject.fecha_inicio}
                                        onChange={(event) =>
                                            setSearchObject({
                                                ...searchObject,
                                                fecha_entrada: new Date(
                                                    event.target.value
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            </label>
                            <label>
                                Salida
                                <div className="homeSearchElement">
                                    <input
                                        placeholder="Type Date"
                                        type="date"
                                        id="fecha_fin"
                                        className="homeSearch-txt"
                                        min={toFormDate(new Date())}
                                        value={searchObject.fecha_fin}
                                        onChange={(event) =>
                                            setSearchObject({
                                                ...searchObject,
                                                fecha_salida: new Date(
                                                    event.target.value
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="homeSearchButton">
                        <Link
                            to={objectToQuerryParamsString(
                                '/search/center/',
                                cleanSearchObject(searchObject)
                            )}
                        >
                            Busca tu espacio!!
                        </Link>
                    </div>
                </li>
            </ul>
        </form>
    );
}
