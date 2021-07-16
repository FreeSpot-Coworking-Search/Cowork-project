import './TopNavigationButton.css';
import { Link } from 'react-router-dom';

export default function TopNavigationButton({ link }) {
  console.log(link);
  return (
    <Link className="topNavigationButton" to={link.path}>
      {link.text}
    </Link>
  );
}
