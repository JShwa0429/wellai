import { CountPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<CountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
