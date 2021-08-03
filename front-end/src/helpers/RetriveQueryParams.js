import { useLocation } from 'react-router-dom';

export default function RetrieveQueryParams(params) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  let paramsObject = {};
  for (const param of params) {
    paramsObject = { ...paramsObject, [param]: query.get(param) };
  }
  return paramsObject;
}
