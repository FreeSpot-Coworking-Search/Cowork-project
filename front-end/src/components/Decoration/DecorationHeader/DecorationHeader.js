import './DecorationHeader.css';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function DecorationHeader({ className }) {
  const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
    })
  );

  // ****************
  // ** RESPONSIVE **
  // ****************

  const handleMediaQueryChange = (matches) => {
    setFullView(matches);
  };
  const isFullView = useMediaQuery(
    { query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})` },
    undefined,
    handleMediaQueryChange
  );

  return (
    <div className={className + ' decorationHeader'}>
      {fullView ? (
        <>
          <svg
            height="14vh"
            className="decorationHeaderLogo"
            viewBox="0 0 576 125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-6.10352e-05 0H575.5V37C575.5 37 575.5 37 559.75 37C544 37 544 37 544 52.5C544 68 544 55 544 77C544 99 544 104 521 104C498 104 41.4999 104 41.4999 104C8.01354 103.644 0.455229 108.872 -6.10352e-05 124.5V0Z"
              fill="rgba(var(--dark)"
            />
          </svg>
          <div className="decorationHeaderAdjustment"></div>
          <svg
            height="14vh"
            className="decorationHeaderAvatar"
            viewBox="0 0 176 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H176V37C176 37 176 65 176 80.5C176 96 176 96 161 96C146 96 70 96 55 96C40 96 40.3521 90.4463 40 80.5C39.6479 70.5537 40 52.5 40 52.5C40 52.5 40 37 27.5 37C15 37 0 37 0 37V0Z"
              fill="rgba(var(--dark)"
            />
          </svg>
        </>
      ) : (
        <div className="decorationHeaderAdjustmentSingleView"></div>
      )}
    </div>
  );
}
