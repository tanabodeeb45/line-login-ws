import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LineLoginButton from './LineLoginButton';
import LineCallbackPage from './LineCallbackPage';

function App() {
  const token = localStorage.getItem('accessToken');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LineLoginButton />} />
        <Route path="/line-callback" element={<LineCallbackPage />} />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
