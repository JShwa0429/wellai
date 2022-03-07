import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AuthRoute({ element: Component }) {
  const authenticated = Cookies.get('access') || undefined;
  return authenticated ? <Component /> : <Navigate to="/" />;
}

export default AuthRoute;
