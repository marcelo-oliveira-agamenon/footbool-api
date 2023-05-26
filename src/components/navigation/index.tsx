import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <div>
      <Link to={'/home'}>Go to home</Link>

      <Link to={'/clubs'}>Go to club panel</Link>
    </div>
  );
}
