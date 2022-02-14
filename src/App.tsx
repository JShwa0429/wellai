import { CountPage, AuthPage } from './pages';
import { AuthRoute, PublicRoute } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<CountPage />} />

        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/pulbic" element={<AuthRoute element={CountPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
