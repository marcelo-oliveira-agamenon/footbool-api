import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <div className="mt-4 px-4 flex gap-3">
      <Link to={'/home'}>Go to home</Link>

      <Link to={'/clubs'}>Go to club panel</Link>
    </div>
  );
}
