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
      <svg
        height="2vh"
        viewBox="0 0 97 54"
        xmlns="http://www.w3.org/2000/svg"
        className="decorationBottomLogo"
      >
        <path
          d="M0.5 0C0.5 0 5.03511 11.5722 10.5 17C16.0847 22.5469 20 25 28 27C36 29 96.5 31 96.5 31V54H0.5V0Z"
          fill="rgba(var(--dark))"
        />
      </svg>
      <div className="decorationBottomAdjustment"></div>
      <svg
        height="2vh"
        className="decorationBottomAvatar"
        viewBox="0 0 103 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 31C0 31 23 31 46.5 31C70 31 74.5 31.5 80 19C85.5 6.5 103 0 103 0V54H0V31Z"
          fill="rgba(var(--dark))"
        />
      </svg>
    </div>
  );
}
