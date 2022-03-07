import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PublicRoute({ element: Component }) {
  const authenticated = Cookies.get('access') || undefined;
  return authenticated ? <Navigate to="/" /> : <Component />;
}

export default PublicRoute;
