import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TITLES = {
  '/': ['Overview', 'Bhandarada CEO Command Center'],
  '/investments': ['Investments', 'Funding rounds and investor register'],
  '/construction': ['Construction & Zones', 'Build progress across every activity area'],
  '/team': ['Team & Roles', 'Staff, departments and access levels'],
  '/website': ['Website & Marketing', 'Public site pages and enquiry performance'],
  '/settings': ['Settings', 'Appearance and account preferences'],
};

function metaFor(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  const base = '/' + pathname.split('/')[1];
  return TITLES[base] ?? ['Overview', ''];
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const location = useLocation();
  const [title, subtitle] = metaFor(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex flex-1 flex-col lg:pl-60">
        <Navbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet context={{ dateRange }} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
