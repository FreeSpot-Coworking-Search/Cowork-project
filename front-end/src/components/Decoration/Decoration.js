import './Decoration.css';
import DecorationHeader from './DecorationHeader/DecorationHeader';
import DecorationBottom from './DecorationBottom/DecorationBottom';
export default function Decoration() {
  return (
    <div className="decoration">
      <DecorationHeader className="decorationTop" />
      <div className="decorationLeft" />
      <DecorationBottom className="decorationBottom" />
    </div>
  );
}
