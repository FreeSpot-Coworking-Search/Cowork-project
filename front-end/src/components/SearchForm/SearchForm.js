import { useState, useEffect } from 'react';
import './SearchForm.css';
import DoubleRangeInput from '../DoubleRangeInput/DoubleRangeInput';
import DateRange from '../DateRange/DateRange';
import StarsSelector from '../StarsSelector/StarsSelector';
import TypeSpaceSelector from '../TypeSpaceSelector/TypeSpaceSelector';
import InputNumber from '../InputNumber/InputNumber';
import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import cleanSearchObject from '../../helpers/cleanSearchObject';

export default function SearchForm({
  searchObject,
  setSearchObject,
  services,
  className,
  results,
  type,
}) {
  const [newSearchObject, setNewSearchObject] = useState(searchObject);
  const [formLimits, setFormLimits] = useState(searchFormLimits(results));

  useEffect(() => {
    setNewSearchObject(searchObject);
  }, [searchObject]);
  useEffect(() => {
    setFormLimits(searchFormLimits(results));
  }, [results, searchObject]);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSearchObject(cleanSearchObject(newSearchObject));
  };
  console.log(newSearchObject);
  return (
    <form onSubmit={onSubmitForm} className={className + ' searchForm'}>
      <fieldset className="searchFormFieldset">
        {type !== 'space' ? (
          <>
            <div className="search">
              <input
                id="texto"
                className="search-txt"
                type="text"
                placeholder="Filtra por palabras clave.."
                value={newSearchObject.texto}
                onChange={(event) =>
                  setNewSearchObject({
                    ...newSearchObject,
                    texto: event.target.value,
                  })
                }
              />
            </div>
            <label className="searchFormLabel">
              <p>Valoración minima</p>
              <StarsSelector
                setNewSearchObject={setNewSearchObject}
                newSearchObject={newSearchObject}
              />
            </label>
          </>
        ) : (
          ''
        )}
        <label className="searchFormLabel">
          <p>Aforo minimo</p>
          <InputNumber
            min={0}
            max={10}
            prop="aforo"
            setNewSearchObject={setNewSearchObject}
            newSearchObject={newSearchObject}
          />
        </label>
        <label className="searchFormLabel">
          <p>Dias de estancia</p>
          <InputNumber
            min={0}
            max={10}
            prop="dias_estancia"
            setNewSearchObject={setNewSearchObject}
            newSearchObject={newSearchObject}
          />
        </label>
        {/* <DoubleRangeInput
          min={formLimits.minPrice}
          max={formLimits.maxPrice}
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        /> */}
        <TypeSpaceSelector
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
        <label className="searchFormLabel">
          <p>Fecha de entrada</p>
          <input
            type="date"
            id="fecha_inicio"
            placeholder="Fecha de entrada"
            className="homeSearch-txt"
            value={newSearchObject.fecha_entrada}
            onChange={(event) =>
              setNewSearchObject({
                ...newSearchObject,
                fecha_entrada: event.target.value,
              })
            }
          />
        </label>
        <label className="searchFormLabel">
          <p>Fecha de salida</p>
          <input
            type="date"
            id="fecha_inicio"
            placeholder="Fecha de entrada"
            className="homeSearch-txt"
            value={newSearchObject.fecha_salida}
            onChange={(event) =>
              setNewSearchObject({
                ...newSearchObject,
                fecha_salida: event.target.value,
              })
            }
          />
        </label>
        <DateRange
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
      </fieldset>
      <button>
        <p>FILTRAR</p>
        <img src={filterIcon} alt="Icono de busqueda" />
      </button>
    </form>
  );
}

const searchFormLimits = (results) => {
  let minPrice, maxPrice;
  for (const result of results) {
    const precio = result.precio
      ? Number(result.precio)
      : Number(result.precio_minimo);
    if (!minPrice || minPrice > precio) minPrice = precio;
    if (!maxPrice || maxPrice < precio) maxPrice = precio;
  }
  return { minPrice, maxPrice };
};
