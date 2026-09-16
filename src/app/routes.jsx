import { Routes, Route } from 'react-router-dom';

import LandingLayout from '../features/landing/components/LandingLayout';
import Home from '../features/landing/pages/Home';
import Stays from '../features/landing/pages/Stays';
import Spa from '../features/landing/pages/Spa';
import Adventures from '../features/landing/pages/Adventures';
import RoomTypePage from '../features/landing/pages/RoomTypePage';
import RoomDetail from '../features/landing/pages/RoomDetail';
import Enquire from '../features/landing/pages/Enquire';
import Investment from '../features/landing/pages/Investment';
import Membership from '../features/landing/pages/Membership';
import NotFound from '../features/landing/pages/NotFound';

import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import AuthCallback from '../features/auth/pages/AuthCallback';

import DashboardLayout from '../features/ceo/layouts/DashboardLayout';
import Overview from '../features/ceo/pages/Overview';
import Investments from '../features/ceo/pages/Investments';
import Construction from '../features/ceo/pages/Construction';
import TeamAndRole from '../features/ceo/pages/TeamAndRole';
import Website from '../features/ceo/pages/Website';
import Approvals from '../features/ceo/pages/Approvals';
import Documentation from '../features/ceo/pages/Documentation';
import SettingsPage from '../features/ceo/pages/SettingsPage';

import SuperAdminLayout from '../features/super-admin/layouts/SuperAdminLayout';
import SuperAdminOverview from '../features/super-admin/pages/Overview';
import SuperAdminUsers from '../features/super-admin/pages/Users';
import SuperAdminRoles from '../features/super-admin/pages/Roles';
import SuperAdminRoleEditor from '../features/super-admin/pages/RoleEditor';
import SuperAdminModules from '../features/super-admin/pages/Modules';
import SuperAdminAuditLogs from '../features/super-admin/pages/AuditLogs';

import RequireAccess from '../shared/components/RequireAccess';
import PageStub from '../shared/components/PageStub';
import DashboardRedirect from './pages/DashboardRedirect';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<DashboardRedirect />} />

      <Route path="/ceo" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="investments" element={<Investments />} />
        <Route path="construction" element={<Construction />} />
        <Route path="team" element={<TeamAndRole />} />
        <Route path="website" element={<Website />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="*"
          element={<PageStub title="Page not found" description="The page you're looking for doesn't exist. Use the sidebar to navigate back." />}
        />
      </Route>

      <Route
        path="/super-admin"
        element={
          <RequireAccess role="SUPER_ADMIN">
            <SuperAdminLayout />
          </RequireAccess>
        }
      >
        <Route index element={<SuperAdminOverview />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="roles" element={<SuperAdminRoles />} />
        <Route path="roles/:roleId" element={<SuperAdminRoleEditor />} />
        <Route path="modules" element={<SuperAdminModules />} />
        <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
        <Route
          path="*"
          element={<PageStub title="Page not found" description="The page you're looking for doesn't exist. Use the sidebar to navigate back." />}
        />
      </Route>

      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/experiences" element={<Adventures />} />
        <Route path="/stays/:type" element={<RoomTypePage />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/enquire" element={<Enquire />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
