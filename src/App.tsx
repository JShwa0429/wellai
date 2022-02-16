import { Page, SignUpPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/home" element={<SignUpPage />} />
          <Route path="/course" element={<SignUpPage />} />
          <Route path="/menu1" element={<SignUpPage />} />
          <Route path="/menu2" element={<SignUpPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
