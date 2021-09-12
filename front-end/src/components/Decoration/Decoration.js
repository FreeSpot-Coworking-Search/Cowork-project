import './Decoration.css';
import DecorationHeader from './DecorationHeader/DecorationHeader';
import DecorationBottom from './DecorationBottom/DecorationBottom';
import useFullView from '../../hooks/useFullView';
export default function Decoration() {
  const [fullView] = useFullView();
  return (
    <div className="decoration">
      <DecorationHeader className="decorationTop" />
      <div className="decorationLeft" />
      {fullView ? <DecorationBottom className="decorationBottom" /> : ''}
    </div>
  );
}
