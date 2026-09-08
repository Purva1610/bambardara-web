import { useMemo, useState } from "react";
import { Plus, Upload, FileText, X } from "lucide-react";
import KpiCard from "../components/KpiCard";
import TableSearch from "../components/TableSearch";
import Modal from "../components/Modal";
import { investorSeed, investmentRounds } from "../lib/data";

const STATUS_STYLES = {
  Active: "bg-secondary/10 text-secondary",
  Inactive: "bg-gray-200 text-gray-600",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-600",
  "Under docs": "bg-accent/15 text-[#8a6f3a]",
};

function AddInvestorForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    stake: "",
    status: "Active",
    idProofType: "",
    idProofNumber: "",
    document: null,
  });

  const update = (key) => (e) => {
    setForm((f) => ({
      ...f,
      [key]: e.target.value,
    }));
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm((f) => ({
        ...f,
        document: file,
      }));
    }
  };

  const removeDocument = () => {
    setForm((f) => ({
      ...f,
      document: null,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    const formattedDate = form.date
      ? new Date(form.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

    onAdd({
      name: form.name.trim(),
      amount: form.amount.trim() || "₹0",
      date: formattedDate,
      stake: form.stake.trim() || "0%",
      status: form.status,
      idProofType: form.idProofType,
      idProofNumber: form.idProofNumber,
      document: form.document,
    });

    onClose();
  };

  const inputStyle =
    "mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-text outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/10";

  return (
    <form onSubmit={submit} className="space-y-5">

      {/* Investor Name */}
      <div>
        <label className="text-xs font-semibold text-text">
          Investor Name
        </label>

        <input
          value={form.name}
          onChange={update("name")}
          required
          className={inputStyle}
          placeholder="Enter investor name"
        />
      </div>

      {/* Amount and Stake */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-text">
            Investment Amount
          </label>

          <input
            value={form.amount}
            onChange={update("amount")}
            className={inputStyle}
            placeholder="e.g. ₹50,00,000"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text">
            Stake
          </label>

          <input
            value={form.stake}
            onChange={update("stake")}
            className={inputStyle}
            placeholder="e.g. 10%"
          />
        </div>
      </div>

      {/* Date and Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-text">
            Investment Date
          </label>

          <input
            type="date"
            value={form.date}
            onChange={update("date")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text">
            Status
          </label>

          <select
            value={form.status}
            onChange={update("status")}
            className={inputStyle}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Under docs">Under Documents</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* ID Proof Section */}
      <div className="border-t border-line pt-4">
        <p className="mb-4 text-sm font-semibold text-text">
          Identity Proof
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {/* ID Proof Type */}
          <div>
            <label className="text-xs font-semibold text-text">
              ID Proof Type
            </label>

            <select
              value={form.idProofType}
              onChange={update("idProofType")}
              className={inputStyle}
            >
              <option value="">Select ID Proof</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="Passport">Passport</option>
              <option value="Driving Licence">
                Driving Licence
              </option>
              <option value="Voter ID">Voter ID</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* ID Proof Number */}
          <div>
            <label className="text-xs font-semibold text-text">
              ID Proof Number
            </label>

            <input
              value={form.idProofNumber}
              onChange={update("idProofNumber")}
              className={inputStyle}
            />
          </div>

        </div>
      </div>
      {/* Upload ID Proof */}
<div>
  <label className="text-xs font-semibold text-text">
    Upload ID Proof
  </label>

  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    className="mt-1.5 w-full cursor-pointer rounded-lg border border-line bg-bg px-3 py-2 text-sm text-text file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-primary-dark"
  />
</div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
        
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text transition hover:bg-primary/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl"
        >
          + Add Investor
        </button>

      </div>
    </form>
  );
}

export default function Investments() {
  const [investors, setInvestors] = useState(investorSeed);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return investors;

    return investors.filter(
      (inv) =>
        inv.name.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q)
    );
  }, [investors, query]);

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
          Investments
        </h1>

        <p className="mt-1 text-sm text-muted">
          Funding rounds and investor register for Bambarddara
        </p>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {investmentRounds.map((r) => (
          <KpiCard
            key={r.label}
            label={r.label}
            value={r.value}
            sub={r.sub}
            accent="var(--color-secondary)"
          />
        ))}
      </div>

      {/* Investors Table */}
      <div className="eq-card">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">

          <div>
            <p className="font-serif text-lg text-text">
              Investors
            </p>

            <p className="mt-1 text-xs text-muted">
              Manage your investor records
            </p>
          </div>

          <div className="flex items-center gap-2">

            <TableSearch
              value={query}
              onChange={setQuery}
              placeholder="Search investors..."
            />

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:text-sm"
            >
              <Plus size={16} />
              Add Investor
            </button>

          </div>
        </div>

        <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">

          <table className="w-full min-w-[600px] border-collapse text-sm">

            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Investor</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Stake</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((inv, i) => (
                <tr
                  key={`${inv.name}-${i}`}
                  className="border-t border-line transition-colors hover:bg-primary/[0.03]"
                >
                  <td className="px-4 py-4 font-medium text-text">
                    {inv.name}
                  </td>

                  <td className="px-4 py-4 font-medium text-text">
                    {inv.amount}
                  </td>

                  <td className="px-4 py-4 text-muted">
                    {inv.date}
                  </td>

                  <td className="px-4 py-4 text-muted">
                    {inv.stake}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        STATUS_STYLES[inv.status] ??
                        STATUS_STYLES.Active
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-muted"
                  >
                    No investors found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Add Investor Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Investor"
      >
        <AddInvestorForm
          onAdd={(inv) =>
            setInvestors((prev) => [inv, ...prev])
          }
          onClose={() => setModalOpen(false)}
        />
      </Modal>

    </div>
  );
}