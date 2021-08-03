import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

export default function useFullView() {
  const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION: minWidth } = process.env;

  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${minWidth})`,
    })
  );
  const handleMediaQueryChange = (matches) => {
    setFullView(matches);
  };
  const isFullView = useMediaQuery(
    { query: `(min-width: ${minWidth})` },
    undefined,
    handleMediaQueryChange
  );
  return [fullView];
}
