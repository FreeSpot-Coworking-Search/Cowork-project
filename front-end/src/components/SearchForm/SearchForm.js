import { useState, useEffect } from 'react';
import './SearchForm.css';
import DateRange from '../DateRange/DateRange';
import StarsSelector from '../StarsSelector/StarsSelector';
import TypeSpaceSelector from '../TypeSpaceSelector/TypeSpaceSelector';
import InputNumber from '../InputNumber/InputNumber';
import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import cleanSearchObject from '../../helpers/cleanSearchObject';
import { Dialog } from '@material-ui/core';

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
  const [open, setOpen] = useState(false);

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(searchObject);
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
              <p>Valoración mínima</p>
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
          <p>Aforo mínimo</p>
          <InputNumber
            min={0}
            max={10}
            prop="aforo"
            setNewSearchObject={setNewSearchObject}
            newSearchObject={newSearchObject}
          />
        </label>
        <label className="searchFormLabel">
          <p>Días de estancia</p>
          <InputNumber
            min={0}
            max={10}
            prop="dias_estancia"
            setNewSearchObject={setNewSearchObject}
            newSearchObject={newSearchObject}
          />
        </label>
        <TypeSpaceSelector
          setNewSearchObject={setNewSearchObject}
          newSearchObject={newSearchObject}
        />
        {/* <div className="search">
          <label className="searchRange">
            <p>{`${formLimits.minPrice} €`}</p>
            <input
              id="range"
              type="range"
              min={formLimits.minPrice}
              max={formLimits.maxPrice}
              value={
                newSearchObject.precio_maximo > formLimits.maxPrice
                  ? formLimits.maxPrice
                  : newSearchObject.precio_maximo
              }
              onChange={(event) =>
                setNewSearchObject({
                  ...newSearchObject,
                  precio_maximo: event.target.value,
                })
              }
            />
            <p>{`${formLimits.maxPrice} €`}</p>
          </label>
        </div> */}

        <div onClick={handleClickOpen} className="searchFormLabel">
          <div>
            <p>Fecha de entrada</p>
            <p>
              {new Date(newSearchObject.fecha_entrada).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p>Fecha de salida</p>
            <p>{new Date(newSearchObject.fecha_salida).toLocaleDateString()}</p>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DateRange
            setNewSearchObject={setNewSearchObject}
            newSearchObject={newSearchObject}
          />
        </Dialog>
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
