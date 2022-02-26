import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AuthRoute({ element: Component }) {
  const authenticated = Cookies.get('accessToken') || undefined;
  return authenticated ? <Component /> : <Navigate to="/public" />;
}

export default AuthRoute;
