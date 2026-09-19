
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Building2,
  Globe2,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  FileText,
  Landmark,
  UserRound,
  Camera,
  Save,
  CheckCircle2,
  Linkedin,
  Instagram,
  Facebook,
  Edit3,
} from "lucide-react";

import { Card } from "../components/Ui.jsx";

const initialCompany = {
  companyName: "Bambarddara",
  legalName: "Bambarddara Agro Tourism Private Limited",
  tagline: "Where Nature Meets Experience",
  description:
    "Bambarddara is an integrated agro-tourism and hospitality destination focused on creating memorable experiences through nature, adventure, farming, culture and wellness.",
  industry: "Agro Tourism & Hospitality",
  companySize: "51–200 Employees",
  foundedYear: "2024",
  website: "[https://bambarddara.com](https://bambarddara.com)",
  email: "info@bambarddara.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 98765 12345",
  address: "Bambarddara Agro Tourism, Maval, Maharashtra, India",
  city: "Maval",
  state: "Maharashtra",
  country: "India",
  pincode: "410405",
  cin: "U55101MH2024PTC123456",
  gstin: "27AAAAA0000A1Z5",
  pan: "AAAAA0000A",
  financialYear: "April – March",
  mdName: "Shubhankar Paygude",
  mdEmail: "md@bambarddara.com",
  mdPhone: "+91 98765 43210",
  linkedin:
    "[https://linkedin.com/company/bambarddara](https://linkedin.com/company/bambarddara)",
  instagram:
    "[https://instagram.com/bambarddara](https://instagram.com/bambarddara)",
  facebook:
    "[https://facebook.com/bambarddara](https://facebook.com/bambarddara)",
};

const EMPTY_LOGO = null;

function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  icon: Icon,
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[#52605A]">
        {label}
      </label>

      <div className="relative mt-1">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71807C]"
          />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-[#DDE4DE] bg-white py-2.5 text-[10px] text-[#173B2B] outline-none transition focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B]/10 ${
            Icon ? "pl-9 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
}) {
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
        className="mt-1 w-full resize-none rounded-lg border border-[#DDE4DE] bg-white px-3 py-2.5 text-[10px] text-[#173B2B] outline-none transition focus:border-[#173B2B] focus:ring-1 focus:ring-[#173B2B]/10"
      />
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  label,
  title,
  description,
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
        <Icon size={17} />
      </div>

      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#71807C]">
          {label}
        </div>

        <h2 className="mt-0.5 text-[14px] font-semibold text-[#173B2B]">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-[10px] text-[#71807C]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-[#173B2B]" />

        <span className="text-[9px] font-medium uppercase tracking-wide text-[#71807C]">
          {label}
        </span>
      </div>

      <div className="mt-2 break-words text-[11px] font-semibold text-[#173B2B]">
        {value || "Not provided"}
      </div>
    </div>
  );
}

export default function CompanyProfile() {
  const [company, setCompany] = useState(initialCompany);
  const [logo, setLogo] = useState(EMPTY_LOGO);
  const [savedMessage, setSavedMessage] = useState("");

  const fileInputRef = useRef(null);
  const saveMessageTimerRef = useRef(null);

  /*
   * -------------------------------------------------------------
   * Reusable change handler
   * -------------------------------------------------------------
   */
  const handleChange = useCallback((field, value) => {
    setCompany((current) => ({
      ...current,
      [field]: value,
    }));
  }, []);

  /*
   * -------------------------------------------------------------
   * Logo picker
   * -------------------------------------------------------------
   */
  const openLogoPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleLogoChange = useCallback((event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setLogo((previousLogo) => {
      if (previousLogo) {
        URL.revokeObjectURL(previousLogo);
      }

      return imageUrl;
    });
  }, []);

  /*
   * -------------------------------------------------------------
   * Save company profile
   * -------------------------------------------------------------
   */
  const handleSave = useCallback(() => {
    // Replace this with your API/database update later.
    console.log("Company profile saved:", company);

    setSavedMessage("Company profile saved successfully.");

    if (saveMessageTimerRef.current) {
      clearTimeout(saveMessageTimerRef.current);
    }

    saveMessageTimerRef.current = setTimeout(() => {
      setSavedMessage("");
      saveMessageTimerRef.current = null;
    }, 3000);
  }, [company]);

  /*
   * -------------------------------------------------------------
   * Cleanup timers and temporary logo URL
   * -------------------------------------------------------------
   */
  useEffect(() => {
    return () => {
      if (saveMessageTimerRef.current) {
        clearTimeout(saveMessageTimerRef.current);
      }

      if (logo) {
        URL.revokeObjectURL(logo);
      }
    };
  }, [logo]);

  /*
   * -------------------------------------------------------------
   * Field configurations
   * -------------------------------------------------------------
   */

  const businessFields = [
    {
      label: "Industry",
      field: "industry",
    },
    {
      label: "Company Size",
      field: "companySize",
      icon: Users,
    },
    {
      label: "Founded Year",
      field: "foundedYear",
      icon: CalendarDays,
    },
    {
      label: "Website",
      field: "website",
      icon: Globe2,
    },
  ];

  const contactFields = [
    {
      label: "Official Email",
      field: "email",
      type: "email",
      icon: Mail,
    },
    {
      label: "Primary Phone",
      field: "phone",
      icon: Phone,
    },
    {
      label: "Alternate Phone",
      field: "alternatePhone",
      icon: Phone,
    },
  ];

  const addressFields = [
    {
      label: "City",
      field: "city",
    },
    {
      label: "State",
      field: "state",
    },
    {
      label: "Country",
      field: "country",
    },
    {
      label: "PIN Code",
      field: "pincode",
    },
  ];

  const registrationFields = [
    {
      label: "CIN",
      field: "cin",
    },
    {
      label: "GSTIN",
      field: "gstin",
    },
    {
      label: "PAN",
      field: "pan",
    },
    {
      label: "Financial Year",
      field: "financialYear",
    },
  ];

  const managementFields = [
    {
      label: "Name",
      field: "mdName",
      icon: UserRound,
    },
    {
      label: "Email",
      field: "mdEmail",
      type: "email",
      icon: Mail,
    },
    {
      label: "Phone",
      field: "mdPhone",
      icon: Phone,
    },
  ];

  const socialFields = [
    {
      label: "LinkedIn",
      field: "linkedin",
      icon: Linkedin,
    },
    {
      label: "Instagram",
      field: "instagram",
      icon: Instagram,
    },
    {
      label: "Facebook",
      field: "facebook",
      icon: Facebook,
    },
    {
      label: "Company Website",
      field: "website",
      icon: Globe2,
    },
  ];

  const renderInputField = (fieldConfig) => {
    const {
      label,
      field,
      type = "text",
      icon,
    } = fieldConfig;

    return (
      <InputField
        key={field}
        label={label}
        type={type}
        value={company[field]}
        onChange={(event) =>
          handleChange(field, event.target.value)
        }
        icon={icon}
      />
    );
  };

  return (
    <div className="space-y-5">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
            <Building2 size={18} />
          </div>

          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#71807C]">
              COMPANY MANAGEMENT
            </div>

            <h1 className="mt-0.5 text-[26px] font-bold leading-tight text-[#173B2B]">
              Company Profile
            </h1>

            <p className="mt-1 text-[11px] text-[#71807C]">
              Manage your company identity, business information and
              contact details.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173B2B] px-4 py-2.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#244C3A]"
        >
          <Save size={14} />
          Save Changes
        </button>
      </div>

      {/* =========================================================
          SUCCESS MESSAGE
      ========================================================= */}

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-[#CFE0D2] bg-[#EEF7F0] px-4 py-3 text-[10px] font-medium text-[#28613B]">
          <CheckCircle2 size={15} />
          {savedMessage}
        </div>
      )}

      {/* =========================================================
          COMPANY PROFILE SUMMARY
      ========================================================= */}

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[auto_1fr]">
          {/* Logo */}

          <div className="flex flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-[#DDE4DE] bg-[#EEF2ED]">
              {logo ? (
                <img
                  src={logo}
                  alt="Company logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2
                  size={42}
                  className="text-[#173B2B]"
                />
              )}

              <button
                onClick={openLogoPicker}
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#173B2B] text-white shadow-md transition hover:bg-[#244C3A]"
                title="Change company logo"
              >
                <Camera size={14} />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />

            <button
              onClick={openLogoPicker}
              className="mt-2 text-[9px] font-semibold text-[#173B2B] hover:underline"
            >
              Change Logo
            </button>

            <span className="mt-1 text-center text-[9px] text-[#71807C]">
              PNG, JPG up to 2MB
            </span>
          </div>

          {/* Company Summary */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Company Display Name"
              value={company.companyName}
              onChange={(event) =>
                handleChange(
                  "companyName",
                  event.target.value
                )
              }
              icon={Building2}
            />

            <InputField
              label="Legal Company Name"
              value={company.legalName}
              onChange={(event) =>
                handleChange(
                  "legalName",
                  event.target.value
                )
              }
              icon={Landmark}
            />

            <div className="md:col-span-2">
              <InputField
                label="Tagline"
                value={company.tagline}
                onChange={(event) =>
                  handleChange(
                    "tagline",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="md:col-span-2">
              <TextareaField
                label="Company Description"
                value={company.description}
                onChange={(event) =>
                  handleChange(
                    "description",
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      </Card>

      {/* =========================================================
          BUSINESS INFORMATION
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={BriefcaseBusiness}
            label="BUSINESS"
            title="Business Information"
            description="Basic information about the company and its operations."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {businessFields.map(renderInputField)}
          </div>
        </div>
      </Card>

      {/* =========================================================
          CONTACT INFORMATION
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={Phone}
            label="CONTACT"
            title="Contact Information"
            description="Primary company contact and registered office information."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contactFields.map(renderInputField)}

            <div className="md:col-span-2 lg:col-span-3">
              <InputField
                label="Address"
                value={company.address}
                onChange={(event) =>
                  handleChange(
                    "address",
                    event.target.value
                  )
                }
                icon={MapPin}
              />
            </div>

            {addressFields.map(renderInputField)}
          </div>
        </div>
      </Card>

      {/* =========================================================
          REGISTRATION & TAX
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={FileText}
            label="COMPLIANCE"
            title="Registration & Tax Details"
            description="Legal and financial registration information."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {registrationFields.map(renderInputField)}
          </div>
        </div>
      </Card>

      {/* =========================================================
          MANAGEMENT / LEADERSHIP
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={UserRound}
            label="LEADERSHIP"
            title="Managing Director"
            description="Primary leadership contact associated with the company."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {managementFields.map(renderInputField)}
          </div>
        </div>
      </Card>

      {/* =========================================================
          SOCIAL MEDIA
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={Globe2}
            label="ONLINE PRESENCE"
            title="Social & Online Links"
            description="Manage the company's public-facing social profiles."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {socialFields.map(renderInputField)}
          </div>
        </div>
      </Card>

      {/* =========================================================
          COMPANY SNAPSHOT
      ========================================================= */}

      <Card>
        <div className="p-5">
          <SectionTitle
            icon={Building2}
            label="PROFILE SUMMARY"
            title="Company Snapshot"
            description="Quick reference information displayed across the dashboard."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              icon={Building2}
              label="Company"
              value={company.companyName}
            />

            <InfoItem
              icon={BriefcaseBusiness}
              label="Industry"
              value={company.industry}
            />

            <InfoItem
              icon={Users}
              label="Company Size"
              value={company.companySize}
            />

            <InfoItem
              icon={CalendarDays}
              label="Founded"
              value={company.foundedYear}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================
          BOTTOM SAVE BAR
      ========================================================= */}

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7EBE6] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
            <Edit3 size={14} />
          </div>

          <div>
            <div className="text-[10px] font-semibold text-[#173B2B]">
              Company Profile
            </div>

            <div className="text-[9px] text-[#71807C]">
              Changes will be reflected across the dashboard.
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173B2B] px-5 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#244C3A]"
        >
          <Save size={14} />
          Save Company Profile
        </button>
      </div>
    </div>
  );
}

