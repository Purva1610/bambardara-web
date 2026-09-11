import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Investments from './pages/Investments';
import Construction from './pages/Construction';
import Team from './pages/Team';
import Website from './pages/Website';
import Settings from './pages/Settings';
import Approvals from './pages/Approvals';
import Documentation from './pages/Documentation';
import PageStub from './pages/PageStub';
import Login from './pages/login';
import ForgotPassword from './pages/forgotpassword';

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
        <Route element={<DashboardLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/team" element={<Team />} />
        <Route path="/website" element={<Website />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/settings" element={<Settings />} />
    </Route>

      <Route
        path="/login"
        element={(
          <Login
            onForgotPassword={() => navigate('/forgot-password')}
            onLogin={() => navigate('/')}
          />
        )}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword onBackToLogin={() => navigate('/login')} />}
      />

      <Route
        path="/forgotpassword"
        element={<ForgotPassword onBackToLogin={() => navigate('/login')} />}
      />

      <Route
        path="*"
        element={<PageStub title="Page not found" description="The page you're looking for doesn't exist. Use the sidebar to navigate back." />}
      />
    </Routes>
  );
}
