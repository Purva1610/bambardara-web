import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Eye,
  ClipboardList,
  Clock3,
  CheckCheck,
  Ban,
} from 'lucide-react';
import KpiCard from '../components/KpiCard';
import TableSearch from '../components/TableSearch';
import Modal from '../components/Modal';
import {
  approvalSeed,
  approvalStatusStyles,
  approvalPriorityStyles,
  APPROVAL_STATUSES,
  APPROVAL_PRIORITIES,
} from '../lib/data';

const STATUS_FILTERS = ['All', ...APPROVAL_STATUSES];
const PRIORITY_FILTERS = ['All', ...APPROVAL_PRIORITIES];


/* =========================================================
   DETAILS MODAL
========================================================= */

function DetailsModal({ request, onClose, onApprove, onReject }) {
  if (!request) return null;

  const isHighPriority = request.priority === 'High';
  const isLowPriority = request.priority === 'Low';

  return (
    <Modal open={!!request} onClose={onClose} title={request.id}>
      <div className="space-y-4">

        {/* Request Title */}
        <div>
          <p className="font-serif text-lg text-text">
            {request.name}
          </p>

          <p className="mt-1 text-sm text-muted">
            {request.description}
          </p>
        </div>


        {/* =================================================
            DETAILS CARDS
        ================================================= */}

        <div className="grid grid-cols-2 gap-3 text-sm">

          {/* Type */}
          <div className="rounded-lg bg-bg p-3">
            <p className="text-xs text-muted">
              Type
            </p>

            <p className="mt-0.5 font-medium text-text">
              {request.type}
            </p>
          </div>


          {/* Requested By */}
          <div className="rounded-lg bg-bg p-3">
            <p className="text-xs text-muted">
              Requested by
            </p>

            <p className="mt-0.5 font-medium text-text">
              {request.requestedBy}
            </p>
          </div>


          {/* Date */}
          <div className="rounded-lg bg-bg p-3">
            <p className="text-xs text-muted">
              Date
            </p>

            <p className="mt-0.5 font-medium text-text">
              {request.date}
            </p>
          </div>


          {/* =================================================
              PRIORITY CARD
          ================================================= */}

          <div
            className={`rounded-lg p-3 border ${
              isHighPriority
                ? 'bg-red-50 border-red-200'
                : isLowPriority
                ? 'bg-green-50 border-green-200'
                : 'bg-bg border-transparent'
            }`}
          >
            <p className="text-xs text-muted">
              Priority
            </p>

            <span
              className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isHighPriority
                  ? 'bg-red-100 text-red-700'
                  : isLowPriority
                  ? 'bg-green-100 text-green-700'
                  : approvalPriorityStyles[request.priority]
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isHighPriority
                    ? 'bg-red-600'
                    : isLowPriority
                    ? 'bg-green-600'
                    : 'bg-current'
                }`}
              />

              {request.priority}
            </span>
          </div>

        </div>


        {/* =================================================
            REASON
        ================================================= */}

        <div
          className={`rounded-lg border p-3 ${
            isHighPriority
              ? 'border-red-100 bg-red-50/50'
              : isLowPriority
              ? 'border-green-100 bg-green-50/50'
              : 'border-line bg-bg'
          }`}
        >
          <p className="text-xs text-muted">
            Reason
          </p>

          <p className="mt-1 text-sm leading-6 text-text">
            {request.reason || request.description || 'No reason provided.'}
          </p>
        </div>


        {/* =================================================
            CURRENT STATUS
        ================================================= */}

        <div className="flex items-center justify-between rounded-lg bg-bg p-3">
          <p className="text-xs text-muted">
            Current status
          </p>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${approvalStatusStyles[request.status]}`}
          >
            {request.status}
          </span>
        </div>


        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="flex justify-end gap-2 pt-2">

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-4 py-2 text-xs font-medium text-text transition-colors hover:bg-primary/5"
          >
            Close
          </button>


          {/* Reject */}
          <button
            type="button"
            disabled={request.status !== 'Pending'}
            onClick={() => onReject(request.id)}
            className="flex items-center gap-1.5 rounded-md border border-[#B4463C]/30 px-4 py-2 text-xs font-medium text-[#B4463C] transition-colors hover:bg-[#B4463C]/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <XCircle size={14} />
            Reject
          </button>


          {/* Approve */}
          <button
            type="button"
            disabled={request.status !== 'Pending'}
            onClick={() => onApprove(request.id)}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle2 size={14} />
            Approve
          </button>

        </div>

      </div>
    </Modal>
  );
}


/* =========================================================
   APPROVALS PAGE
========================================================= */

export default function Approvals() {

  const [requests, setRequests] = useState(approvalSeed);

  const [query, setQuery] = useState('');

  const [statusFilter, setStatusFilter] = useState('All');

  const [priorityFilter, setPriorityFilter] = useState('All');

  const [selected, setSelected] = useState(null);


  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {
    return {
      total: requests.length,

      pending: requests.filter(
        (r) => r.status === 'Pending'
      ).length,

      approved: requests.filter(
        (r) => r.status === 'Approved'
      ).length,

      rejected: requests.filter(
        (r) => r.status === 'Rejected'
      ).length,
    };
  }, [requests]);


  /* =======================================================
     FILTER
  ======================================================= */

  const filtered = useMemo(() => {

    const q = query.trim().toLowerCase();

    return requests.filter((r) => {

      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.requestedBy.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' ||
        r.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' ||
        r.priority === priorityFilter;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesPriority
      );
    });

  }, [
    requests,
    query,
    statusFilter,
    priorityFilter,
  ]);


  /* =======================================================
     STATUS UPDATE
  ======================================================= */

  const setStatus = (id, status) => {

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status }
          : r
      )
    );

    setSelected((prev) =>
      prev && prev.id === id
        ? { ...prev, status }
        : prev
    );
  };


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
          Approvals
        </h1>

        <p className="mt-1 text-sm text-muted">
          Review and action requests and workflows awaiting sign-off
        </p>
      </div>


      {/* ===================================================
          KPI CARDS
      =================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <KpiCard
          label="Total Requests"
          value={summary.total}
          sub="all approval types"
          accent="var(--color-primary)"
        />

        <KpiCard
          label="Pending Review"
          value={summary.pending}
          sub="awaiting a decision"
          accent="var(--color-accent)"
        />

        <KpiCard
          label="Approved"
          value={summary.approved}
          sub="cleared this month"
          accent="var(--color-secondary)"
        />

        <KpiCard
          label="Rejected"
          value={summary.rejected}
          sub="sent back for revision"
          accent="#B4463C"
        />

      </div>


      {/* ===================================================
          APPROVAL REQUESTS
      =================================================== */}

      <div className="eq-card">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">

          <p className="font-serif text-lg text-text">
            Approval Requests
          </p>

          <div className="flex flex-wrap items-center gap-2">

            <TableSearch
              value={query}
              onChange={setQuery}
              placeholder="Search requests..."
            />


            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs text-text focus:border-secondary/40 sm:text-sm"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s === 'All'
                    ? 'All statuses'
                    : s}
                </option>
              ))}
            </select>


            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs text-text focus:border-secondary/40 sm:text-sm"
            >
              {PRIORITY_FILTERS.map((p) => (
                <option key={p} value={p}>
                  {p === 'All'
                    ? 'All priorities'
                    : p}
                </option>
              ))}
            </select>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">

          <table className="w-full min-w-[880px] border-collapse text-sm">

            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">

                <th className="px-4 py-2 font-medium">
                  Request
                </th>

                <th className="px-4 py-2 font-medium">
                  Type
                </th>

                <th className="px-4 py-2 font-medium">
                  Requested by
                </th>

                <th className="px-4 py-2 font-medium">
                  Date
                </th>

                <th className="px-4 py-2 font-medium">
                  Priority
                </th>

                <th className="px-4 py-2 font-medium">
                  Status
                </th>

                <th className="px-4 py-2 font-medium text-right">
                  Actions
                </th>

              </tr>
            </thead>


            <tbody>

              {filtered.map((r) => {

                const isHighPriority =
                  r.priority === 'High';

                const isLowPriority =
                  r.priority === 'Low';

                return (
                  <tr
                    key={r.id}
                    className={`border-t border-line transition-colors ${
                      isHighPriority
                        ? 'hover:bg-red-50/60'
                        : isLowPriority
                        ? 'hover:bg-green-50/60'
                        : 'hover:bg-primary/[0.03]'
                    }`}
                  >

                    {/* Request */}
                    <td className="px-4 py-3">

                      <p className="font-medium text-text">
                        {r.name}
                      </p>

                      <p className="text-xs text-muted">
                        {r.id}
                      </p>

                    </td>


                    {/* Type */}
                    <td className="px-4 py-3 text-muted">
                      {r.type}
                    </td>


                    {/* Requested By */}
                    <td className="px-4 py-3 text-text">
                      {r.requestedBy}
                    </td>


                    {/* Date */}
                    <td className="px-4 py-3 text-muted">
                      {r.date}
                    </td>


                    {/* Priority */}
                    <td className="px-4 py-3">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          isHighPriority
                            ? 'bg-red-100 text-red-700'
                            : isLowPriority
                            ? 'bg-green-100 text-green-700'
                            : approvalPriorityStyles[r.priority]
                        }`}
                      >
                        {r.priority}
                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-4 py-3">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${approvalStatusStyles[r.status]}`}
                      >
                        {r.status}
                      </span>

                    </td>


                    {/* Actions */}
                    <td className="px-4 py-3">

                      <div className="flex items-center justify-end gap-1.5">

                        {/* View */}
                        <button
                          type="button"
                          onClick={() => setSelected(r)}
                          aria-label="View details"
                          title="View details"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-primary/5 hover:text-text"
                        >
                          <Eye size={15} />
                        </button>


                        {/* Approve */}
                        <button
                          type="button"
                          disabled={r.status !== 'Pending'}
                          onClick={() =>
                            setStatus(r.id, 'Approved')
                          }
                          aria-label="Approve"
                          title="Approve"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-secondary transition-colors hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <CheckCircle2 size={15} />
                        </button>


                        {/* Reject */}
                        <button
                          type="button"
                          disabled={r.status !== 'Pending'}
                          onClick={() =>
                            setStatus(r.id, 'Rejected')
                          }
                          aria-label="Reject"
                          title="Reject"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#B4463C] transition-colors hover:bg-[#B4463C]/10 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <XCircle size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}


              {/* Empty State */}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-muted"
                  >
                    No requests match your search or filters.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ===================================================
          APPROVAL WORKFLOW
      =================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="mb-1 flex items-center gap-2">

          <ClipboardList
            size={16}
            className="text-secondary"
          />

          <p className="font-serif text-lg text-text">
            Approval Workflow
          </p>

        </div>

        <p className="mb-4 text-xs text-muted">
          How a request moves from submission to a final decision
        </p>


        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-lg bg-bg p-3">

            <Clock3
              size={15}
              className="mb-2 text-accent"
            />

            <p className="text-sm font-medium text-text">
              1. Submitted &amp; Pending
            </p>

            <p className="mt-1 text-xs text-muted">
              A request is logged with type, priority and supporting details.
            </p>

          </div>


          <div className="rounded-lg bg-bg p-3">

            <CheckCheck
              size={15}
              className="mb-2 text-secondary"
            />

            <p className="text-sm font-medium text-text">
              2. Approved
            </p>

            <p className="mt-1 text-xs text-muted">
              Cleared to proceed — status updates immediately across the table.
            </p>

          </div>


          <div className="rounded-lg bg-bg p-3">

            <Ban
              size={15}
              className="mb-2 text-[#B4463C]"
            />

            <p className="text-sm font-medium text-text">
              3. Rejected
            </p>

            <p className="mt-1 text-xs text-muted">
              Sent back to the requester, typically for revision and resubmission.
            </p>

          </div>

        </div>

      </div>


      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      <DetailsModal
        request={selected}
        onClose={() => setSelected(null)}
        onApprove={(id) =>
          setStatus(id, 'Approved')
        }
        onReject={(id) =>
          setStatus(id, 'Rejected')
        }
      />

    </div>
  );
}