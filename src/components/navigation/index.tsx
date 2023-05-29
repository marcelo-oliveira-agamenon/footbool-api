import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  return (
    <div className="mt-4 px-4 ml-2 py-1 rounded-xl flex gap-4 bg-red-400 w-fit font-medium text-white">
      {location.pathname !== '/home' ? (
        <Link
          to={'/home'}
          className="hover:text-black hover:scale-90 transition-all"
        >
          Go to home
        </Link>
      ) : null}

      {location.pathname !== '/club' ? (
        <Link
          to={'/club'}
          className="hover:text-black hover:scale-90 transition-all"
        >
          Go to club panel
        </Link>
      ) : null}
    </div>
  );
}
