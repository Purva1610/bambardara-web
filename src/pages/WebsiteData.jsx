
import { useMemo, useState } from "react";
import {
  Globe2,
  TrendingUp,
  Crown,
  MapPinned,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  CalendarDays,
  Users,
  Star,
  Clock3,
  ShieldCheck,
  Gift,
  BriefcaseBusiness,
  Mountain,
  ChevronDown,
  Copy,
  ExternalLink,
} from "lucide-react";

import { Card } from "../components/Ui.jsx";

/* ============================================================
   INITIAL DATA
============================================================ */

const initialInvestmentPlans = [
  {
    id: 1,
    name: "Founders Growth Plan",
    tier: "Premium",
    amount: 2500000,
    tenure: "5 Years",
    expectedReturn: "14%",
    payout: "Annual",
    minInvestment: 1000000,
    maxInvestment: 5000000,
    description:
      "Premium investment opportunity linked with long-term Bambarddara business growth.",
    benefits: [
      "Annual returns",
      "Priority project updates",
      "Investor site visits",
      "Premium investor events",
    ],
    status: "Active",
    websiteVisible: true,
    featured: true,
    createdAt: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Growth Partner Plan",
    tier: "Standard",
    amount: 1000000,
    tenure: "4 Years",
    expectedReturn: "12%",
    payout: "Annual",
    minInvestment: 500000,
    maxInvestment: 2500000,
    description:
      "Growth-focused investment plan designed for investors looking for medium-term participation.",
    benefits: [
      "Annual returns",
      "Quarterly project updates",
      "Investor meetups",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "15 Aug 2026",
  },
  {
    id: 3,
    name: "Early Supporter Plan",
    tier: "Entry",
    amount: 500000,
    tenure: "3 Years",
    expectedReturn: "10%",
    payout: "Annual",
    minInvestment: 250000,
    maxInvestment: 1000000,
    description:
      "Entry-level investment plan for individuals who want to participate in the early growth phase.",
    benefits: [
      "Annual returns",
      "Project updates",
      "Site visit access",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "18 Aug 2026",
  },
];

const initialMembershipPlans = [
  {
    id: 1,
    name: "Elite Membership",
    tier: "Elite",
    price: 150000,
    duration: "Lifetime",
    guests: "8 Guests",
    discount: "25%",
    description:
      "Premium lifetime membership with priority access and exclusive experiences.",
    benefits: [
      "25% stay discount",
      "Priority booking",
      "Complimentary experiences",
      "VIP event access",
      "Dedicated relationship manager",
    ],
    status: "Active",
    websiteVisible: true,
    featured: true,
    createdAt: "10 Aug 2026",
  },
  {
    id: 2,
    name: "Premium Membership",
    tier: "Premium",
    price: 75000,
    duration: "5 Years",
    guests: "6 Guests",
    discount: "20%",
    description:
      "Premium membership for families and frequent visitors looking for enhanced benefits.",
    benefits: [
      "20% stay discount",
      "Priority booking",
      "Member-only events",
      "Special activity pricing",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "12 Aug 2026",
  },
  {
    id: 3,
    name: "Family Membership",
    tier: "Standard",
    price: 35000,
    duration: "3 Years",
    guests: "4 Guests",
    discount: "15%",
    description:
      "Family-focused membership providing special rates across stays and experiences.",
    benefits: [
      "15% stay discount",
      "Priority weekend booking",
      "Family activity offers",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "14 Aug 2026",
  },
];

const initialTourismPackages = [
  {
    id: 1,
    name: "Weekend Agro Escape",
    category: "Weekend",
    price: 7999,
    duration: "2 Days / 1 Night",
    guests: "2 Adults",
    location: "Bambarddara",
    description:
      "A relaxing weekend experience combining farm activities, nature walks, local food and comfortable accommodation.",
    activities: [
      "Farm experience",
      "Nature walk",
      "Traditional meals",
      "Campfire",
    ],
    status: "Active",
    websiteVisible: true,
    featured: true,
    createdAt: "05 Aug 2026",
  },
  {
    id: 2,
    name: "Family Farm Experience",
    category: "Family",
    price: 12999,
    duration: "3 Days / 2 Nights",
    guests: "4 Adults",
    location: "Bambarddara",
    description:
      "A complete family getaway featuring farming, adventure, cultural activities and nature experiences.",
    activities: [
      "Farm activities",
      "Adventure zone",
      "Cultural experience",
      "Nature trail",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "08 Aug 2026",
  },
  {
    id: 3,
    name: "Adventure & Nature Retreat",
    category: "Adventure",
    price: 9999,
    duration: "2 Days / 1 Night",
    guests: "2 Adults",
    location: "Bambarddara",
    description:
      "An adventure-focused agro-tourism package designed for guests who enjoy outdoor activities and nature.",
    activities: [
      "Adventure activities",
      "Trekking",
      "Camping",
      "Nature exploration",
    ],
    status: "Active",
    websiteVisible: true,
    featured: false,
    createdAt: "10 Aug 2026",
  },
];

/* ============================================================
   FORM DEFAULTS
============================================================ */

const emptyInvestment = {
  name: "",
  tier: "Standard",
  amount: "",
  tenure: "",
  expectedReturn: "",
  payout: "Annual",
  minInvestment: "",
  maxInvestment: "",
  description: "",
  benefits: "",
  status: "Active",
  websiteVisible: true,
  featured: false,
};

const emptyMembership = {
  name: "",
  tier: "Standard",
  price: "",
  duration: "",
  guests: "",
  discount: "",
  description: "",
  benefits: "",
  status: "Active",
  websiteVisible: true,
  featured: false,
};

const emptyTourism = {
  name: "",
  category: "Weekend",
  price: "",
  duration: "",
  guests: "",
  location: "Bambarddara",
  description: "",
  activities: "",
  status: "Active",
  websiteVisible: true,
  featured: false,
};

/* ============================================================
   HELPERS
============================================================ */

const formatCurrency = (value) => {
  if (!value && value !== 0) return "₹0";

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

const parseBenefits = (value) => {
  if (Array.isArray(value)) return value;

  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <Card>
      <div className="flex items-start justify-between p-4">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#71807C]">
            {label}
          </div>

          <div className="mt-1 text-[23px] font-semibold text-[#173B2B]">
            {value}
          </div>

          {subtitle && (
            <div className="mt-1 text-[9px] text-[#71807C]">
              {subtitle}
            </div>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
          <Icon size={17} />
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold ${
        active
          ? "bg-[#EEF7F0] text-[#28613B]"
          : "bg-[#F9EEEE] text-[#B95C50]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[#3E8B55]" : "bg-[#B95C50]"
        }`}
      />
      {status}
    </span>
  );
}

function VisibilityBadge({ visible }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-medium ${
        visible
          ? "bg-[#EEF2ED] text-[#173B2B]"
          : "bg-[#F1F3F0] text-[#71807C]"
      }`}
    >
      {visible ? <Eye size={11} /> : <EyeOff size={11} />}
      {visible ? "Website" : "Hidden"}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  prefix,
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[#52605A]">
        {label}
      </label>

      <div className="relative mt-1">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#71807C]">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-[#DDE4DE] bg-white py-2.5 text-[10px] text-[#173B2B] outline-none transition focus:border-[#173B2B] ${
            prefix ? "pl-8 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[#52605A]">
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="mt-1 w-full resize-none rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] text-[#173B2B] outline-none transition focus:border-[#173B2B]"
      />
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function WebsiteData() {
  const [activeTab, setActiveTab] = useState("investments");

  const [investmentPlans, setInvestmentPlans] = useState(
    initialInvestmentPlans
  );

  const [membershipPlans, setMembershipPlans] = useState(
    initialMembershipPlans
  );

  const [tourismPackages, setTourismPackages] = useState(
    initialTourismPackages
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibilityFilter, setVisibilityFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [investmentForm, setInvestmentForm] =
    useState(emptyInvestment);

  const [membershipForm, setMembershipForm] =
    useState(emptyMembership);

  const [tourismForm, setTourismForm] =
    useState(emptyTourism);

  const [deleteItem, setDeleteItem] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");

  /* ==========================================================
     CURRENT DATA
  ========================================================== */

  const currentItems = useMemo(() => {
    if (activeTab === "investments") return investmentPlans;
    if (activeTab === "membership") return membershipPlans;
    return tourismPackages;
  }, [
    activeTab,
    investmentPlans,
    membershipPlans,
    tourismPackages,
  ]);

  const filteredItems = useMemo(() => {
    return currentItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.tier || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.category || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesVisibility =
        visibilityFilter === "All" ||
        (visibilityFilter === "Website" && item.websiteVisible) ||
        (visibilityFilter === "Hidden" && !item.websiteVisible);

      return matchesSearch && matchesStatus && matchesVisibility;
    });
  }, [
    currentItems,
    search,
    statusFilter,
    visibilityFilter,
  ]);

  /* ==========================================================
     KPI DATA
  ========================================================== */

  const totalPlans =
    investmentPlans.length +
    membershipPlans.length +
    tourismPackages.length;

  const activePlans = [
    ...investmentPlans,
    ...membershipPlans,
    ...tourismPackages,
  ].filter((item) => item.status === "Active").length;

  const websiteVisible = [
    ...investmentPlans,
    ...membershipPlans,
    ...tourismPackages,
  ].filter((item) => item.websiteVisible).length;

  const featuredItems = [
    ...investmentPlans,
    ...membershipPlans,
    ...tourismPackages,
  ].filter((item) => item.featured).length;

  /* ==========================================================
     MESSAGES
  ========================================================== */

  const showSavedMessage = (message) => {
    setSavedMessage(message);

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /* ==========================================================
     OPEN ADD MODAL
  ========================================================== */

  const openAddModal = () => {
    setEditingItem(null);

    setInvestmentForm(emptyInvestment);
    setMembershipForm(emptyMembership);
    setTourismForm(emptyTourism);

    setModalOpen(true);
  };

  /* ==========================================================
     OPEN EDIT MODAL
  ========================================================== */

  const openEditModal = (item) => {
    setEditingItem(item);

    if (activeTab === "investments") {
      setInvestmentForm({
        ...item,
        benefits: item.benefits.join("\n"),
      });
    }

    if (activeTab === "membership") {
      setMembershipForm({
        ...item,
        benefits: item.benefits.join("\n"),
      });
    }

    if (activeTab === "tourism") {
      setTourismForm({
        ...item,
        activities: item.activities.join("\n"),
      });
    }

    setModalOpen(true);
  };

  /* ==========================================================
     SAVE ITEM
  ========================================================== */

  const saveItem = () => {
    if (activeTab === "investments") {
      if (!investmentForm.name.trim()) {
        showSavedMessage("Investment plan name is required.");
        return;
      }

      const item = {
        ...investmentForm,
        id: editingItem?.id || Date.now(),
        amount: Number(investmentForm.amount) || 0,
        minInvestment:
          Number(investmentForm.minInvestment) || 0,
        maxInvestment:
          Number(investmentForm.maxInvestment) || 0,
        benefits: parseBenefits(investmentForm.benefits),
        createdAt:
          editingItem?.createdAt ||
          new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      };

      if (editingItem) {
        setInvestmentPlans((current) =>
          current.map((plan) =>
            plan.id === editingItem.id ? item : plan
          )
        );

        showSavedMessage("Investment plan updated successfully.");
      } else {
        setInvestmentPlans((current) => [item, ...current]);

        showSavedMessage("Investment plan added successfully.");
      }
    }

    if (activeTab === "membership") {
      if (!membershipForm.name.trim()) {
        showSavedMessage("Membership plan name is required.");
        return;
      }

      const item = {
        ...membershipForm,
        id: editingItem?.id || Date.now(),
        price: Number(membershipForm.price) || 0,
        benefits: parseBenefits(membershipForm.benefits),
        createdAt:
          editingItem?.createdAt ||
          new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      };

      if (editingItem) {
        setMembershipPlans((current) =>
          current.map((plan) =>
            plan.id === editingItem.id ? item : plan
          )
        );

        showSavedMessage("Membership plan updated successfully.");
      } else {
        setMembershipPlans((current) => [item, ...current]);

        showSavedMessage("Membership plan added successfully.");
      }
    }

    if (activeTab === "tourism") {
      if (!tourismForm.name.trim()) {
        showSavedMessage("Tourism package name is required.");
        return;
      }

      const item = {
        ...tourismForm,
        id: editingItem?.id || Date.now(),
        price: Number(tourismForm.price) || 0,
        activities: parseBenefits(tourismForm.activities),
        createdAt:
          editingItem?.createdAt ||
          new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      };

      if (editingItem) {
        setTourismPackages((current) =>
          current.map((plan) =>
            plan.id === editingItem.id ? item : plan
          )
        );

        showSavedMessage(
          "Agro tourism package updated successfully."
        );
      } else {
        setTourismPackages((current) => [item, ...current]);

        showSavedMessage(
          "Agro tourism package added successfully."
        );
      }
    }

    setModalOpen(false);
    setEditingItem(null);
  };

  /* ==========================================================
     DELETE
  ========================================================== */

  const confirmDelete = () => {
    if (!deleteItem) return;

    if (activeTab === "investments") {
      setInvestmentPlans((current) =>
        current.filter((item) => item.id !== deleteItem.id)
      );
    }

    if (activeTab === "membership") {
      setMembershipPlans((current) =>
        current.filter((item) => item.id !== deleteItem.id)
      );
    }

    if (activeTab === "tourism") {
      setTourismPackages((current) =>
        current.filter((item) => item.id !== deleteItem.id)
      );
    }

    showSavedMessage(`${deleteItem.name} deleted successfully.`);

    setDeleteItem(null);
  };

  /* ==========================================================
     TOGGLE STATUS
  ========================================================== */

  const toggleStatus = (item) => {
    const newStatus =
      item.status === "Active" ? "Inactive" : "Active";

    const update = (items) =>
      items.map((current) =>
        current.id === item.id
          ? { ...current, status: newStatus }
          : current
      );

    if (activeTab === "investments") {
      setInvestmentPlans(update);
    }

    if (activeTab === "membership") {
      setMembershipPlans(update);
    }

    if (activeTab === "tourism") {
      setTourismPackages(update);
    }

    showSavedMessage(
      `${item.name} is now ${newStatus.toLowerCase()}.`
    );
  };

  /* ==========================================================
     TOGGLE WEBSITE VISIBILITY
  ========================================================== */

  const toggleVisibility = (item) => {
    const update = (items) =>
      items.map((current) =>
        current.id === item.id
          ? {
              ...current,
              websiteVisible: !current.websiteVisible,
            }
          : current
      );

    if (activeTab === "investments") {
      setInvestmentPlans(update);
    }

    if (activeTab === "membership") {
      setMembershipPlans(update);
    }

    if (activeTab === "tourism") {
      setTourismPackages(update);
    }

    showSavedMessage(
      item.websiteVisible
        ? `${item.name} has been hidden from the website.`
        : `${item.name} is now visible on the website.`
    );
  };

  /* ==========================================================
     RENDER CARD
  ========================================================== */

  const renderItemCard = (item) => {
    const isInvestment = activeTab === "investments";
    const isMembership = activeTab === "membership";

    const price = isInvestment
      ? item.amount
      : item.price;

    return (
      <Card key={item.id} className="overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
                {isInvestment ? (
                  <TrendingUp size={18} />
                ) : isMembership ? (
                  <Crown size={18} />
                ) : (
                  <Mountain size={18} />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-[13px] font-semibold text-[#173B2B]">
                    {item.name}
                  </h3>

                  {item.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7DD] px-2 py-1 text-[8px] font-semibold text-[#9A7414]">
                      <Star size={9} fill="currentColor" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {(item.tier || item.category) && (
                    <span className="text-[9px] text-[#71807C]">
                      {item.tier || item.category}
                    </span>
                  )}

                  <StatusBadge status={item.status} />

                  <VisibilityBadge
                    visible={item.websiteVisible}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => toggleVisibility(item)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] transition hover:bg-[#F5F7F4]"
                title={
                  item.websiteVisible
                    ? "Hide from website"
                    : "Show on website"
                }
              >
                {item.websiteVisible ? (
                  <Eye size={13} />
                ) : (
                  <EyeOff size={13} />
                )}
              </button>

              <button
                onClick={() => openEditModal(item)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] transition hover:bg-[#F5F7F4]"
                title="Edit"
              >
                <Pencil size={13} />
              </button>

              <button
                onClick={() => setDeleteItem(item)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#F0D6D2] bg-white text-[#B95C50] transition hover:bg-[#F9EEEE]"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 min-h-[35px] text-[10px] leading-5 text-[#71807C]">
            {item.description}
          </p>

          {/* Details */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-[#F5F7F4] p-2.5">
              <div className="text-[8px] uppercase text-[#71807C]">
                {isInvestment ? "Investment" : "Price"}
              </div>

              <div className="mt-1 text-[12px] font-semibold text-[#173B2B]">
                {formatCurrency(price)}
              </div>
            </div>

            <div className="rounded-lg bg-[#F5F7F4] p-2.5">
              <div className="text-[8px] uppercase text-[#71807C]">
                {isInvestment ? "Tenure" : "Duration"}
              </div>

              <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                {isInvestment ? item.tenure : item.duration}
              </div>
            </div>

            {isInvestment ? (
              <>
                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Expected Return
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                    {item.expectedReturn}
                  </div>
                </div>

                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Payout
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                    {item.payout}
                  </div>
                </div>
              </>
            ) : isMembership ? (
              <>
                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Guests
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                    {item.guests}
                  </div>
                </div>

                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Discount
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                    {item.discount}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Guests
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-[#173B2B]">
                    {item.guests}
                  </div>
                </div>

                <div className="rounded-lg bg-[#F5F7F4] p-2.5">
                  <div className="text-[8px] uppercase text-[#71807C]">
                    Location
                  </div>

                  <div className="mt-1 truncate text-[11px] font-semibold text-[#173B2B]">
                    {item.location}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-4">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-[#71807C]">
              {isInvestment
                ? "Plan Benefits"
                : isMembership
                ? "Membership Benefits"
                : "Package Activities"}
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {(isInvestment
                ? item.benefits
                : isMembership
                ? item.benefits
                : item.activities
              )
                .slice(0, 4)
                .map((benefit, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-[#E7EBE6] bg-white px-2 py-1 text-[8px] text-[#52605A]"
                  >
                    {benefit}
                  </span>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-[#EEF1ED] pt-3">
            <div className="text-[8px] text-[#9CA99F]">
              Added {item.createdAt}
            </div>

            <button
              onClick={() => toggleStatus(item)}
              className={`text-[9px] font-semibold ${
                item.status === "Active"
                  ? "text-[#B95C50]"
                  : "text-[#28613B]"
              }`}
            >
              {item.status === "Active"
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </div>
      </Card>
    );
  };

  /* ==========================================================
     FORM MODAL
  ========================================================== */

  const renderModal = () => {
    if (!modalOpen) return null;

    const title = editingItem
      ? `Edit ${
          activeTab === "investments"
            ? "Investment Plan"
            : activeTab === "membership"
            ? "Membership Plan"
            : "Agro Tourism Package"
        }`
      : `Add ${
          activeTab === "investments"
            ? "Investment Plan"
            : activeTab === "membership"
            ? "Membership Plan"
            : "Agro Tourism Package"
        }`;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
        <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-[#E7EBE6] px-6 py-5">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#71807C]">
                WEBSITE DATA
              </div>

              <h2 className="mt-1 text-[16px] font-semibold text-[#173B2B]">
                {title}
              </h2>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F3F0] text-[#52605A]"
            >
              <X size={15} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="max-h-[calc(90vh-145px)] overflow-y-auto px-6 py-5">
            {/* INVESTMENT FORM */}
            {activeTab === "investments" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Plan Name"
                    value={investmentForm.name}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Founders Growth Plan"
                  />

                  <div>
                    <label className="block text-[10px] font-medium text-[#52605A]">
                      Plan Tier
                    </label>

                    <select
                      value={investmentForm.tier}
                      onChange={(e) =>
                        setInvestmentForm({
                          ...investmentForm,
                          tier: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>Entry</option>
                      <option>Standard</option>
                      <option>Premium</option>
                      <option>Elite</option>
                    </select>
                  </div>

                  <Field
                    label="Investment Amount"
                    type="number"
                    value={investmentForm.amount}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        amount: e.target.value,
                      })
                    }
                    prefix="₹"
                  />

                  <Field
                    label="Tenure"
                    value={investmentForm.tenure}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        tenure: e.target.value,
                      })
                    }
                    placeholder="e.g. 5 Years"
                  />

                  <Field
                    label="Expected Return"
                    value={investmentForm.expectedReturn}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        expectedReturn: e.target.value,
                      })
                    }
                    placeholder="e.g. 14%"
                  />

                  <div>
                    <label className="block text-[10px] font-medium text-[#52605A]">
                      Payout Frequency
                    </label>

                    <select
                      value={investmentForm.payout}
                      onChange={(e) =>
                        setInvestmentForm({
                          ...investmentForm,
                          payout: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Half-Yearly</option>
                      <option>Annual</option>
                      <option>At Maturity</option>
                    </select>
                  </div>

                  <Field
                    label="Minimum Investment"
                    type="number"
                    value={investmentForm.minInvestment}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        minInvestment: e.target.value,
                      })
                    }
                    prefix="₹"
                  />

                  <Field
                    label="Maximum Investment"
                    type="number"
                    value={investmentForm.maxInvestment}
                    onChange={(e) =>
                      setInvestmentForm({
                        ...investmentForm,
                        maxInvestment: e.target.value,
                      })
                    }
                    prefix="₹"
                  />
                </div>

                <TextareaField
                  label="Plan Description"
                  value={investmentForm.description}
                  onChange={(e) =>
                    setInvestmentForm({
                      ...investmentForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this investment plan..."
                />

                <TextareaField
                  label="Benefits"
                  value={investmentForm.benefits}
                  onChange={(e) =>
                    setInvestmentForm({
                      ...investmentForm,
                      benefits: e.target.value,
                    })
                  }
                  placeholder={
                    "Annual returns\nPriority project updates\nInvestor site visits"
                  }
                />
              </div>
            )}

            {/* MEMBERSHIP FORM */}
            {activeTab === "membership" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Membership Name"
                    value={membershipForm.name}
                    onChange={(e) =>
                      setMembershipForm({
                        ...membershipForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Elite Membership"
                  />

                  <div>
                    <label className="block text-[10px] font-medium text-[#52605A]">
                      Membership Tier
                    </label>

                    <select
                      value={membershipForm.tier}
                      onChange={(e) =>
                        setMembershipForm({
                          ...membershipForm,
                          tier: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>Standard</option>
                      <option>Premium</option>
                      <option>Elite</option>
                      <option>Corporate</option>
                    </select>
                  </div>

                  <Field
                    label="Membership Price"
                    type="number"
                    value={membershipForm.price}
                    onChange={(e) =>
                      setMembershipForm({
                        ...membershipForm,
                        price: e.target.value,
                      })
                    }
                    prefix="₹"
                  />

                  <Field
                    label="Validity / Duration"
                    value={membershipForm.duration}
                    onChange={(e) =>
                      setMembershipForm({
                        ...membershipForm,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g. 5 Years"
                  />

                  <Field
                    label="Guest Entitlement"
                    value={membershipForm.guests}
                    onChange={(e) =>
                      setMembershipForm({
                        ...membershipForm,
                        guests: e.target.value,
                      })
                    }
                    placeholder="e.g. 6 Guests"
                  />

                  <Field
                    label="Stay Discount"
                    value={membershipForm.discount}
                    onChange={(e) =>
                      setMembershipForm({
                        ...membershipForm,
                        discount: e.target.value,
                      })
                    }
                    placeholder="e.g. 20%"
                  />
                </div>

                <TextareaField
                  label="Membership Description"
                  value={membershipForm.description}
                  onChange={(e) =>
                    setMembershipForm({
                      ...membershipForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this membership..."
                />

                <TextareaField
                  label="Membership Benefits"
                  value={membershipForm.benefits}
                  onChange={(e) =>
                    setMembershipForm({
                      ...membershipForm,
                      benefits: e.target.value,
                    })
                  }
                  placeholder={
                    "20% stay discount\nPriority booking\nMember-only events"
                  }
                />
              </div>
            )}

            {/* TOURISM FORM */}
            {activeTab === "tourism" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Package Name"
                    value={tourismForm.name}
                    onChange={(e) =>
                      setTourismForm({
                        ...tourismForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Weekend Agro Escape"
                  />

                  <div>
                    <label className="block text-[10px] font-medium text-[#52605A]">
                      Package Category
                    </label>

                    <select
                      value={tourismForm.category}
                      onChange={(e) =>
                        setTourismForm({
                          ...tourismForm,
                          category: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>Weekend</option>
                      <option>Family</option>
                      <option>Adventure</option>
                      <option>Wellness</option>
                      <option>Corporate</option>
                      <option>School / Group</option>
                      <option>Custom</option>
                    </select>
                  </div>

                  <Field
                    label="Package Price"
                    type="number"
                    value={tourismForm.price}
                    onChange={(e) =>
                      setTourismForm({
                        ...tourismForm,
                        price: e.target.value,
                      })
                    }
                    prefix="₹"
                  />

                  <Field
                    label="Duration"
                    value={tourismForm.duration}
                    onChange={(e) =>
                      setTourismForm({
                        ...tourismForm,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g. 2 Days / 1 Night"
                  />

                  <Field
                    label="Guest Capacity"
                    value={tourismForm.guests}
                    onChange={(e) =>
                      setTourismForm({
                        ...tourismForm,
                        guests: e.target.value,
                      })
                    }
                    placeholder="e.g. 4 Adults"
                  />

                  <Field
                    label="Location"
                    value={tourismForm.location}
                    onChange={(e) =>
                      setTourismForm({
                        ...tourismForm,
                        location: e.target.value,
                      })
                    }
                  />
                </div>

                <TextareaField
                  label="Package Description"
                  value={tourismForm.description}
                  onChange={(e) =>
                    setTourismForm({
                      ...tourismForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the agro tourism package..."
                />

                <TextareaField
                  label="Activities Included"
                  value={tourismForm.activities}
                  onChange={(e) =>
                    setTourismForm({
                      ...tourismForm,
                      activities: e.target.value,
                    })
                  }
                  placeholder={
                    "Farm experience\nNature walk\nTraditional meals\nCampfire"
                  }
                />
              </div>
            )}

            {/* COMMON SETTINGS */}
            <div className="mt-6 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-4">
              <div className="mb-3 text-[9px] font-semibold uppercase tracking-wide text-[#71807C]">
                Website Settings
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      activeTab === "investments"
                        ? investmentForm.websiteVisible
                        : activeTab === "membership"
                        ? membershipForm.websiteVisible
                        : tourismForm.websiteVisible
                    }
                    onChange={(e) => {
                      const value = e.target.checked;

                      if (activeTab === "investments") {
                        setInvestmentForm({
                          ...investmentForm,
                          websiteVisible: value,
                        });
                      }

                      if (activeTab === "membership") {
                        setMembershipForm({
                          ...membershipForm,
                          websiteVisible: value,
                        });
                      }

                      if (activeTab === "tourism") {
                        setTourismForm({
                          ...tourismForm,
                          websiteVisible: value,
                        });
                      }
                    }}
                    className="h-4 w-4 accent-[#173B2B]"
                  />

                  <span className="text-[10px] font-medium text-[#173B2B]">
                    Show on website
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      activeTab === "investments"
                        ? investmentForm.featured
                        : activeTab === "membership"
                        ? membershipForm.featured
                        : tourismForm.featured
                    }
                    onChange={(e) => {
                      const value = e.target.checked;

                      if (activeTab === "investments") {
                        setInvestmentForm({
                          ...investmentForm,
                          featured: value,
                        });
                      }

                      if (activeTab === "membership") {
                        setMembershipForm({
                          ...membershipForm,
                          featured: value,
                        });
                      }

                      if (activeTab === "tourism") {
                        setTourismForm({
                          ...tourismForm,
                          featured: value,
                        });
                      }
                    }}
                    className="h-4 w-4 accent-[#173B2B]"
                  />

                  <span className="text-[10px] font-medium text-[#173B2B]">
                    Mark as featured
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-[#E7EBE6] bg-[#FAFBFA] px-6 py-4">
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-lg border border-[#DDE4DE] bg-white px-4 py-2.5 text-[10px] font-medium text-[#173B2B]"
            >
              Cancel
            </button>

            <button
              onClick={saveItem}
              className="inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              <Save size={13} />
              {editingItem ? "Update" : "Add"}{" "}
              {activeTab === "investments"
                ? "Plan"
                : activeTab === "membership"
                ? "Membership"
                : "Package"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ============================================================
     DELETE MODAL
  ============================================================ */

  const renderDeleteModal = () => {
    if (!deleteItem) return null;

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F9EEEE] text-[#B95C50]">
              <AlertCircle size={20} />
            </div>

            <h2 className="mt-4 text-[16px] font-semibold text-[#173B2B]">
              Delete this item?
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-[#71807C]">
              You are about to delete{" "}
              <strong className="text-[#173B2B]">
                {deleteItem.name}
              </strong>
              . This item will be removed from the website data list.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDeleteItem(null)}
                className="rounded-lg border border-[#DDE4DE] bg-white px-4 py-2.5 text-[10px] font-medium text-[#173B2B]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-[#B95C50] px-4 py-2.5 text-[10px] font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <div className="space-y-5">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
            <Globe2 size={18} />
          </div>

          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#71807C]">
              WEBSITE MANAGEMENT
            </div>

            <h1 className="mt-0.5 text-[26px] font-bold leading-tight text-[#173B2B]">
              Website Data
            </h1>

            <p className="mt-1 text-[11px] text-[#71807C]">
              Manage investment plans, membership plans and agro-tourism
              packages displayed on your website.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              window.open("https://bambarddara.com", "_blank");
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[#DDE4DE] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#173B2B] transition hover:bg-[#F5F7F4]"
          >
            <ExternalLink size={13} />
            View Website
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-[#173B2B] px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#244C3A]"
          >
            <Plus size={14} />
            Add{" "}
            {activeTab === "investments"
              ? "Investment Plan"
              : activeTab === "membership"
              ? "Membership Plan"
              : "Tourism Package"}
          </button>
        </div>
      </div>

      {/* ========================================================
          SUCCESS MESSAGE
      ======================================================== */}

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-[#CFE0D2] bg-[#EEF7F0] px-4 py-3 text-[10px] font-medium text-[#28613B]">
          <CheckCircle2 size={15} />
          {savedMessage}
        </div>
      )}

      {/* ========================================================
          KPI CARDS
      ======================================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BriefcaseBusiness}
          label="Total Website Items"
          value={totalPlans}
          subtitle="Across all product categories"
        />

        <StatCard
          icon={CheckCircle2}
          label="Active Items"
          value={activePlans}
          subtitle="Currently available"
        />

        <StatCard
          icon={Globe2}
          label="Website Visible"
          value={websiteVisible}
          subtitle="Published on website"
        />

        <StatCard
          icon={Star}
          label="Featured"
          value={featuredItems}
          subtitle="Highlighted items"
        />
      </div>

      {/* ========================================================
          PRODUCT TABS
      ======================================================== */}

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 border-b border-[#E7EBE6] md:grid-cols-3">
          <button
            onClick={() => {
              setActiveTab("investments");
              setSearch("");
              setStatusFilter("All");
              setVisibilityFilter("All");
            }}
            className={`relative flex items-center gap-3 px-5 py-4 text-left transition ${
              activeTab === "investments"
                ? "bg-[#F5F7F4]"
                : "bg-white hover:bg-[#FAFBFA]"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                activeTab === "investments"
                  ? "bg-[#173B2B] text-white"
                  : "bg-[#EEF2ED] text-[#173B2B]"
              }`}
            >
              <TrendingUp size={16} />
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#173B2B]">
                Investment Plans
              </div>

              <div className="mt-0.5 text-[9px] text-[#71807C]">
                {investmentPlans.length} plans
              </div>
            </div>

            {activeTab === "investments" && (
              <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#173B2B]" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("membership");
              setSearch("");
              setStatusFilter("All");
              setVisibilityFilter("All");
            }}
            className={`relative flex items-center gap-3 border-t border-[#E7EBE6] px-5 py-4 text-left transition md:border-l md:border-t-0 ${
              activeTab === "membership"
                ? "bg-[#F5F7F4]"
                : "bg-white hover:bg-[#FAFBFA]"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                activeTab === "membership"
                  ? "bg-[#173B2B] text-white"
                  : "bg-[#EEF2ED] text-[#173B2B]"
              }`}
            >
              <Crown size={16} />
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#173B2B]">
                Membership Plans
              </div>

              <div className="mt-0.5 text-[9px] text-[#71807C]">
                {membershipPlans.length} plans
              </div>
            </div>

            {activeTab === "membership" && (
              <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#173B2B]" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("tourism");
              setSearch("");
              setStatusFilter("All");
              setVisibilityFilter("All");
            }}
            className={`relative flex items-center gap-3 border-t border-[#E7EBE6] px-5 py-4 text-left transition md:border-l md:border-t-0 ${
              activeTab === "tourism"
                ? "bg-[#F5F7F4]"
                : "bg-white hover:bg-[#FAFBFA]"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                activeTab === "tourism"
                  ? "bg-[#173B2B] text-white"
                  : "bg-[#EEF2ED] text-[#173B2B]"
              }`}
            >
              <Mountain size={16} />
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#173B2B]">
                Agro Tourism Packages
              </div>

              <div className="mt-0.5 text-[9px] text-[#71807C]">
                {tourismPackages.length} packages
              </div>
            </div>

            {activeTab === "tourism" && (
              <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#173B2B]" />
            )}
          </button>
        </div>
      </Card>

      {/* ========================================================
          FILTERS
      ======================================================== */}

      <Card>
        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71807C]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${
                activeTab === "investments"
                  ? "investment plans"
                  : activeTab === "membership"
                  ? "membership plans"
                  : "tourism packages"
              }...`}
              className="w-full rounded-lg border border-[#DDE4DE] bg-white py-2.5 pl-9 pr-3 text-[10px] outline-none focus:border-[#173B2B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-[#DDE4DE] bg-white px-3 py-2">
              <Filter size={12} className="text-[#71807C]" />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[10px] text-[#173B2B] outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-[#DDE4DE] bg-white px-3 py-2">
              <Globe2 size={12} className="text-[#71807C]" />

              <select
                value={visibilityFilter}
                onChange={(e) =>
                  setVisibilityFilter(e.target.value)
                }
                className="bg-transparent text-[10px] text-[#173B2B] outline-none"
              >
                <option>All</option>
                <option>Website</option>
                <option>Hidden</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* ========================================================
          CONTENT HEADER
      ======================================================== */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-[#173B2B]">
            {activeTab === "investments"
              ? "Investment Plans"
              : activeTab === "membership"
              ? "Membership Plans"
              : "Agro Tourism Packages"}
          </h2>

          <p className="mt-1 text-[9px] text-[#71807C]">
            {filteredItems.length} item
            {filteredItems.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-3 py-2 text-[9px] font-semibold text-white"
        >
          <Plus size={12} />
          Add New
        </button>
      </div>

      {/* ========================================================
          CARDS
      ======================================================== */}

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredItems.map(renderItemCard)}
        </div>
      ) : (
        <Card>
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
              <Search size={20} />
            </div>

            <h3 className="mt-4 text-[13px] font-semibold text-[#173B2B]">
              No items found
            </h3>

            <p className="mt-1 max-w-sm text-[10px] leading-5 text-[#71807C]">
              Try changing your search or filters, or create a new item.
            </p>

            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              <Plus size={13} />
              Add New
            </button>
          </div>
        </Card>
      )}

      {/* ========================================================
          WEBSITE FLOW INFO
      ======================================================== */}

      <Card>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
              <Globe2 size={17} />
            </div>

            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#71807C]">
                WEBSITE CONTENT FLOW
              </div>

              <h3 className="mt-1 text-[13px] font-semibold text-[#173B2B]">
                CRM → Website
              </h3>

              <p className="mt-1 max-w-3xl text-[10px] leading-5 text-[#71807C]">
                Website administrators can create and maintain the commercial
                offerings displayed on the public website. Items marked
                "Website" are intended to be published, while hidden items
                remain available inside the CRM for internal management.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#173B2B]" />
                <span className="text-[10px] font-semibold text-[#173B2B]">
                  Investment
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-[#71807C]">
                Investment plans, returns, tenure, minimum investment and
                investor benefits.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-[#173B2B]" />
                <span className="text-[10px] font-semibold text-[#173B2B]">
                  Membership
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-[#71807C]">
                Membership tiers, pricing, validity, guest benefits and
                discounts.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
              <div className="flex items-center gap-2">
                <Mountain size={14} className="text-[#173B2B]" />
                <span className="text-[10px] font-semibold text-[#173B2B]">
                  Agro Tourism
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-[#71807C]">
                Tourism packages, pricing, duration, guest capacity and
                included activities.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ========================================================
          MODALS
      ======================================================== */}

      {renderModal()}
      {renderDeleteModal()}
    </div>
  );
}

