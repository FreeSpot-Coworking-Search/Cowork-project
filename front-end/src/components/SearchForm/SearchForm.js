import { useState, useEffect } from 'react';
import './SearchForm.css';
import ServicesCheck from '../ServicesCheck/ServicesCheck';

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

  console.log(results);
  console.log(searchFormLimits(results));

  useEffect(() => {
    setNewSearchObject(searchObject);
  }, [searchObject]);
  useEffect(() => {
    setFormLimits(searchFormLimits(results));
  }, [results]);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSearchObject(newSearchObject);
  };

  return (
    <form onSubmit={onSubmitForm} className={className + ' searchForm'}>
      <fieldset className="searchFormFieldset">
        {type !== 'space' ? (
          <>
            <label className="searchFormLabel" htmlFor="texto">
              Texto
            </label>
            <input
              id="texto"
              className="searchFormInput"
              type="text"
              value={newSearchObject.texto}
              onChange={(event) =>
                setNewSearchObject({
                  ...newSearchObject,
                  texto: event.target.value,
                })
              }
            />
          </>
        ) : (
          ''
        )}
        <label className="searchFormLabel" htmlFor="tipo">
          Tipo
        </label>
        <select
          id="tipo"
          className="searchFormInput"
          type="text"
          value={newSearchObject.tipo}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              tipo: event.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="Mesa Flex">Mesa Flex</option>
          <option value="Mesa Fija">Mesa Fija</option>
          <option value="Despacho">Despacho</option>
          <option value="Sala de reuniones">Sala de reuniones</option>
        </select>
        <label className="searchFormLabel" htmlFor="aforo">
          Aforo minimo
        </label>
        <input
          id="aforo"
          className="searchFormInput"
          type="number"
          value={newSearchObject.aforo}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              aforo: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="dias_estancia">
          Dias de estancia
        </label>
        <input
          id="dias_estancia"
          className="searchFormInput"
          type="number"
          value={newSearchObject.dias_estancia}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              dias_estancia: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="precio_maximo">
          Precio maximo
        </label>
        <input
          id="precio_maximo"
          className="searchFormInput"
          type="number"
          value={newSearchObject.precio_maximo}
          min={newSearchObject.precio_minimo}
          max={formLimits.maxPrice}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              precio_maximo: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="precio_minimo">
          Precio minimo
        </label>
        <input
          id="precio_minimo"
          className="searchFormInput"
          type="number"
          value={newSearchObject.precio_minimo}
          min={formLimits.minPrice}
          max={newSearchObject.precio_maximo}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              precio_minimo: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="fecha_entrada">
          Fecha de entrada
        </label>
        <input
          id="fecha_entrada"
          className="searchFormInput"
          type="date"
          value={newSearchObject.fecha_entrada}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              fecha_entrada: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="fecha_salida">
          Fecha de salida
        </label>
        <input
          id="fecha_salida"
          className="searchFormInput"
          type="date"
          value={newSearchObject.fecha_salida}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              fecha_salida: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="puntuacion_minima">
          Puntuacion minima
        </label>
        <input
          id="puntuacion_minima"
          className="searchFormInput"
          type="number"
          min="0"
          max="5"
          value={newSearchObject.puntuacion_minima}
          onChange={(event) =>
            setNewSearchObject({
              ...newSearchObject,
              puntuacion_minima: event.target.value,
            })
          }
        />
        <br></br>
        <input type="submit" />
      </fieldset>
      <ServicesCheck services={services} />
    </form>
  );
}

const searchFormLimits = (results) => {
  let minPrice, maxPrice;
  for (const result of results) {
    if (!minPrice || minPrice > result.precio_minimo)
      minPrice = result.precio_minimo;
    if (!maxPrice || minPrice > result.precio_maximo)
      maxPrice = result.precio_maximo;
  }
  return { minPrice, maxPrice };
};
