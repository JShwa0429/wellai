import { CountPage, AuthPage, PublicPage, TestPage } from './pages';
import { AuthRoute, PublicRoute } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
import './styles/antd.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<CountPage />} />

        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/public" element={<PublicRoute element={PublicPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
