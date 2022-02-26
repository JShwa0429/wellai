import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PublicRoute({ element: Component }) {
  const authenticated = Cookies.get('accessToken') || undefined;
  return authenticated ? <Navigate to="/private" /> : <Component />;
}

export default PublicRoute;
