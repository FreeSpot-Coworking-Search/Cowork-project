import './DecorationBottom.css';
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
    <div className={className + ' decorationFooter'}>
      {fullView ? (
        <>
          {/* <svg
            height="14vh"
            className="decorationBottomLogo"
            viewBox="0 0 576 125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-6.10352e-05 0H575.5V37C575.5 37 575.5 37 559.75 37C544 37 544 37 544 52.5C544 68 544 55 544 77C544 99 544 104 521 104C498 104 41.4999 104 41.4999 104C8.01354 103.644 0.455229 108.872 -6.10352e-05 124.5V0Z"
              fill="rgba(var(--dark)"
            />
          </svg> */}
          <div className="decorationBottomAdjustment"></div>
          <svg
            height="2vh"
            className="decorationBottomAvatar"
            viewBox="0 0 103 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 31C0 31 23 31 46.5 31C70 31 74.5 31.5 80 19C85.5 6.5 103 0 103 0V54H0V31Z"
              fill="rgba(var(--dark)"
            />
          </svg>
        </>
      ) : (
        <div className="decorationBottomAdjustmentSingleView"></div>
      )}
    </div>
  );
}
