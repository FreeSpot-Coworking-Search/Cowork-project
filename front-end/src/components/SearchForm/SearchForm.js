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
  }, [results]);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSearchObject(cleanSearchObject(newSearchObject));
  };

  return (
    <form onSubmit={onSubmitForm} className={className + ' searchForm'}>
      <fieldset className="searchFormFieldset">
        {type !== 'space' ? (
          <>
            <div class="search">
              <input
                id="texto"
                className="search-txt"
                type="text"
                value={newSearchObject.texto}
                onChange={(event) =>
                  setNewSearchObject({
                    ...newSearchObject,
                    texto: event.target.value,
                  })
                }
              />

              <button class="search-btn">
                <img src={filterIcon} alt="Icono de busqueda" />
              </button>
            </div>
            <StarsSelector
              setNewSearchObject={setNewSearchObject}
              newSearchObject={newSearchObject}
            />
          </>
        ) : (
          ''
        )}{' '}
        <TypeSpaceSelector
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
        <div className="inputNumbers">
          <label className="searchFormLabel">
            Aforo minimo
            <InputNumber
              min={0}
              max={10}
              prop="aforo"
              setNewSearchObject={setNewSearchObject}
              newSearchObject={newSearchObject}
            />
          </label>
          <label className="searchFormLabel">
            Dias de estancia
            <InputNumber
              min={0}
              max={10}
              prop="dias_estancia"
              setNewSearchObject={setNewSearchObject}
              newSearchObject={newSearchObject}
            />
          </label>
        </div>
        <DoubleRangeInput
          min={formLimits.minPrice}
          max={formLimits.maxPrice}
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
        <DateRange
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
      </fieldset>
      <button>Enviar</button>
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
