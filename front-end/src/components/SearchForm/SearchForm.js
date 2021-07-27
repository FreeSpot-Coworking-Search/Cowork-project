import { useState } from 'react';
import './SearchForm.css';
import ServicesCheck from '../ServicesCheck/ServicesCheck';

export default function SearchForm({ setObjectSearch, services, className }) {
  const [newObjectSearch, setNewObjectSearch] = useState({ texto: '' });

  const onSubmitForm = (event) => {
    event.preventDefault();
    let cleanNewObjectSearch = {};
    for (const key in newObjectSearch) {
      if (newObjectSearch[key] !== '') {
        cleanNewObjectSearch = {
          ...cleanNewObjectSearch,
          [key]: newObjectSearch[key],
        };
      }
    }

    setObjectSearch(cleanNewObjectSearch);
  };
  // console.log('newObjectSearch');
  // console.log('---------------');
  // console.log(newObjectSearch);

  return (
    <form onSubmit={onSubmitForm} className={className + ' searchForm'}>
      <fieldset className="searchFormFieldset">
        <label className="searchFormLabel" htmlFor="texto">
          Texto
        </label>
        <input
          id="texto"
          className="searchFormInput"
          type="text"
          value={newObjectSearch.texto}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
              texto: event.target.value,
            })
          }
        />
        <label className="searchFormLabel" htmlFor="tipo">
          Tipo
        </label>
        <select
          id="tipo"
          className="searchFormInput"
          type="text"
          value={newObjectSearch.tipo}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
              tipo: event.target.value,
            })
          }
        >
          <option value="*"></option>
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
          value={newObjectSearch.aforo}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          value={newObjectSearch.dias_estancia}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          type="range"
          value={newObjectSearch.precio_maximo}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          type="range"
          value={newObjectSearch.precio_minimo}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          value={newObjectSearch.fecha_entrada}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          value={newObjectSearch.fecha_salida}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
          type="range"
          min="0"
          max="5"
          value={newObjectSearch.puntuacion_minima}
          onChange={(event) =>
            setNewObjectSearch({
              ...newObjectSearch,
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
