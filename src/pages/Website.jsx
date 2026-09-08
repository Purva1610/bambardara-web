import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { AreaChart,Area,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';

import KpiCard from '../components/KpiCard';
import SectionHeading from '../components/SectionHeading';
import TableSearch from '../components/TableSearch';
import { sitePages,websiteKpis,websiteTrafficData,recentEnquiries,enquiryFunnel,websiteStatusData,enquiryBySource } from '../lib/data';

const STATUS_STYLES = {
  Live: 'bg-green-100 text-green-700',
  Draft: 'bg-muted/15 text-muted',
};

const ENQUIRY_STATUS_STYLES = {
  New: 'bg-blue-500/10 text-blue-600',
  Contacted: 'bg-amber-500/10 text-amber-600',
  Qualified: 'bg-purple-500/10 text-purple-600',
  Converted: 'bg-secondary/10 text-secondary',
  Lost: 'bg-red-500/10 text-red-600',
};

const WEBSITE_STATUS_STYLES = {
  Live: 'bg-green-100 text-secondary',
  Draft: 'bg-amber-500/10 text-amber-600',
  Offline: 'bg-red-500/10 text-red-600',
};



export default function Website() {
  const [query, setQuery] = useState('');
  const [trafficMetric, setTrafficMetric] = useState('visitors');
  const [selectedFunnelStage, setSelectedFunnelStage] = useState(null);
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState('All');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('All');

  const filteredEnquiries = useMemo(() => {
  return recentEnquiries.filter((enquiry) => {
    const typeMatch =
      enquiryTypeFilter === 'All' ||
      enquiry.type === enquiryTypeFilter;

    const statusMatch =
      enquiryStatusFilter === 'All' ||
      enquiry.status === enquiryStatusFilter;

    return typeMatch && statusMatch;
  });
}, [enquiryTypeFilter, enquiryStatusFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sitePages;
    return sitePages.filter((p) => p.page.toLowerCase().includes(q) || p.status.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Website &amp; Marketing</h1>
        <p className="mt-1 text-sm text-muted">Public site pages and enquiry performance</p>
      </div>

    {/* KPIs */}
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {websiteKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} accent="var(--color-secondary)" />
        ))}
      </div>
      <div className="eq-card overflow-hidden">

  {/* Header */}
  <div className="border-b border-line p-4">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-serif text-lg text-text">
          Website Status
        </h2>

        <p className="mt-1 text-xs text-muted">
          Current publishing status of all website pages
        </p>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-2">
        {['Live', 'Draft', 'Offline'].map((status) => {
          const count = websiteStatusData.filter(
            (page) => page.status === status
          ).length;

          return (
            <div
              key={status}
              className={`rounded-lg px-3 py-2 text-xs font-medium ${
                WEBSITE_STATUS_STYLES[status]
              }`}
            >
              <span className="mr-1.5">●</span>
              {status} {count}
            </div>
          );
        })}
      </div>
    </div>
  </div>

  {/* Website Pages */}
  <div className="scroll-thin overflow-x-auto">
    <table className="w-full min-w-[600px] border-collapse text-sm">

      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-muted">
          <th className="px-4 py-3 font-medium">
            Page
          </th>

          <th className="px-4 py-3 font-medium">
            Status
          </th>

          <th className="px-4 py-3 font-medium">
            Last Updated
          </th>
        </tr>
      </thead>

      <tbody>
        {websiteStatusData.map((page) => (
          <tr
            key={page.page}
            className="border-t border-line transition-colors hover:bg-primary/[0.03]"
          >
            <td className="px-4 py-3 font-medium text-text">
              {page.page}
            </td>

            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  WEBSITE_STATUS_STYLES[page.status]
                }`}
              >
                <span className="mr-1">●</span>
                {page.status}
              </span>
            </td>

            <td className="px-4 py-3 text-muted">
              {page.updated}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

      {/* Charts */}

<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
  
  {/* Website Traffic */} 
  <div className="eq-card p-4">
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-serif text-lg text-text">
          Website Traffic — Last 30 Days
        </h2>
        <p className="mt-1 text-xs text-muted">
          Website performance and conversion activity
        </p>
      </div>

      <div className="flex rounded-lg bg-muted/10 p-1">
        <button
          onClick={() => setTrafficMetric('visitors')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            trafficMetric === 'visitors'
              ? 'bg-secondary text-white'
              : 'text-muted hover:text-text'
          }`}
        >
          Visitors
        </button>

        <button
          onClick={() => setTrafficMetric('enquiries')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            trafficMetric === 'enquiries'
              ? 'bg-secondary text-white'
              : 'text-muted hover:text-text'
          }`}
        >
          Enquiries
        </button>

        <button
          onClick={() => setTrafficMetric('registrations')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            trafficMetric === 'registrations'
              ? 'bg-secondary text-white'
              : 'text-muted hover:text-text'
          }`}
        >
          Pre-registrations
        </button>
      </div>
    </div>

    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={websiteTrafficData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="trafficGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#0B5D3A"
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor="#0B5D3A"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-line)"
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 11 }}
            stroke="var(--color-muted)"
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            stroke="var(--color-muted)"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid var(--color-line)',
              backgroundColor: 'white',
            }}
            labelFormatter={(value) => `Day ${value}`}
          />

          <Area
            type="monotone"
            dataKey={trafficMetric}
            stroke="#0B5D3A"
            strokeWidth={2.5}
            fill="url(#trafficGradient)"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>


  {/* Enquiries by Source */}
  <div className="eq-card p-4">
    <div className="mb-4">
      <h2 className="font-serif text-lg text-text">
        Enquiries by Source
      </h2>
      <p className="mt-1 text-xs text-muted">
        Where website enquiries are coming from
      </p>
    </div>

    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={enquiryBySource}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-line)"
          />

          <XAxis
            dataKey="source"
            tick={{ fontSize: 10 }}
            stroke="var(--color-muted)"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={55}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            stroke="var(--color-muted)"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{ fill: 'rgba(11, 93, 58, 0.05)' }}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid var(--color-line)',
              backgroundColor: 'white',
            }}
          />

          <Bar
            dataKey="enquiries"
            fill="#0B5D3A"
            radius={[5, 5, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>
<div className="eq-card p-4">
  <div className="mb-5">
    <h2 className="font-serif text-lg text-text">
      Enquiry Funnel
    </h2>

    <p className="mt-1 text-xs text-muted">
      Traffic → Interest → Leads → Site Visits → Confirmed
    </p>
  </div>

  <div className="flex flex-col items-center gap-2 md:flex-row md:items-stretch md:justify-between md:gap-0">
    {enquiryFunnel.map((stage, index) => (
      <div
        key={stage.id}
        className="flex w-full items-center md:w-auto"
      >
        <button
          onClick={() =>
            setSelectedFunnelStage(
              selectedFunnelStage === stage.id ? null : stage.id
            )
          }
          className={`group w-full rounded-xl border px-5 py-4 text-center transition-all md:min-w-[150px] ${
            selectedFunnelStage === stage.id
              ? 'border-secondary bg-secondary/[0.08] shadow-sm'
              : 'border-line bg-white hover:border-secondary/40 hover:bg-secondary/[0.03]'
          }`}
        >
          <p className="text-xs font-medium text-muted">
            {stage.label}
          </p>

          <p
            className={`mt-1 text-2xl font-semibold ${
              selectedFunnelStage === stage.id
                ? 'text-secondary'
                : 'text-text'
            }`}
          >
            {stage.value}
          </p>

          {index > 0 && (
            <p className="mt-1 text-[10px] text-muted">
              {Math.round(
                (Number(stage.value.replace(',', '')) /
                  Number(
                    enquiryFunnel[index - 1].value.replace(',', '')
                  )) *
                  100
              )}
              % conversion
            </p>
          )}
        </button>

        {index < enquiryFunnel.length - 1 && (
          <div className="hidden px-2 text-xl text-muted md:block">
            →
          </div>
        )}

        {index < enquiryFunnel.length - 1 && (
          <div className="py-1 text-xl text-muted md:hidden">
            ↓
          </div>
        )}
      </div>
    ))}
  </div>

  {selectedFunnelStage && (
    <div className="mt-4 rounded-lg bg-secondary/[0.05] px-4 py-3 text-sm text-text">
      <span className="font-medium">
        {enquiryFunnel.find(
          (stage) => stage.id === selectedFunnelStage
        )?.label}
      </span>

      <span className="ml-2 text-muted">
        selected
      </span>
    </div>
  )}
</div>
      
        {/* <SectionHeading action={<TableSearch value={query} onChange={setQuery} placeholder="Search pages..." />}>
        Public Site Pages
      </SectionHeading>

      <div className="eq-card">
        <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-medium">Page</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Enquiries / leads</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.page} className="border-t border-line transition-colors hover:bg-primary/[0.03]">
                  <td className="flex items-center gap-2 px-4 py-3 font-medium text-text">
                    <MapPin size={13} className="text-muted" /> {p.page}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text">{p.leads}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-muted">
                    No pages match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}

     <div className="eq-card overflow-hidden">

  {/* Header */}
  <div className="border-b border-line p-4">
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

      <div>
        <h2 className="font-serif text-lg text-text">
          Recent Enquiries
        </h2>

        <p className="mt-1 text-xs text-muted">
          Latest website enquiries and lead activity
        </p>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted/10 p-1">
        {['All', 'Stay', 'Investment', 'Experience', 'Contact'].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setEnquiryTypeFilter(filter)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                enquiryTypeFilter === filter
                  ? 'bg-secondary text-white'
                  : 'text-muted hover:text-text'
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

    </div>

    {/* Status Filters */}
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium text-muted">
        Status:
      </span>

      {[
        'All',
        'New',
        'Contacted',
        'Qualified',
        'Converted',
        'Lost',
      ].map((status) => (
        <button
          key={status}
          onClick={() => setEnquiryStatusFilter(status)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            enquiryStatusFilter === status
              ? 'border-secondary bg-secondary text-white'
              : 'border-line text-muted hover:border-secondary/40 hover:text-text'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>

  {/* Enquiries Table */}
  <div className="scroll-thin overflow-x-auto">
    <table className="w-full min-w-[650px] border-collapse text-sm">

      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-muted">
          <th className="px-4 py-3 font-medium">
            Name
          </th>

          <th className="px-4 py-3 font-medium">
            Enquiry
          </th>

          <th className="px-4 py-3 font-medium">
            Date
          </th>

          <th className="px-4 py-3 font-medium">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredEnquiries.map((enquiry) => (
          <tr
            key={enquiry.id}
            className="border-t border-line transition-colors hover:bg-primary/[0.03]"
          >

            <td className="px-4 py-3">
              <p className="font-medium text-text">
                {enquiry.name}
              </p>
            </td>

            <td className="px-4 py-3">
              <p className="font-medium text-text">
                {enquiry.interest}
              </p>

              <p className="mt-0.5 text-xs text-muted">
                {enquiry.type}
              </p>
            </td>

            <td className="px-4 py-3 text-sm text-muted">
              {enquiry.date}
            </td>

            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  ENQUIRY_STATUS_STYLES[enquiry.status]
                }`}
              >
                {enquiry.status}
              </span>
            </td>

          </tr>
        ))}

        {filteredEnquiries.length === 0 && (
          <tr>
            <td
              colSpan={4}
              className="px-4 py-8 text-center text-sm text-muted"
            >
              No enquiries match the selected filters.
            </td>
          </tr>
        )}
      </tbody>

    </table>
  </div>

</div>
    </div>
  );
}
