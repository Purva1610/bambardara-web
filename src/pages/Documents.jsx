import { useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  FileText,
  FileCheck,
  FolderOpen,
  Receipt,
  Scale,
  ClipboardCheck,
  BookOpen,
  HelpCircle,
  Workflow,
  Settings,
  X,
  CalendarDays,
  ShieldCheck,
  LockKeyhole,
  BarChart3,
  FileArchive,
  BriefcaseBusiness,
  ChevronDown,
  UserRoundCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react'

/* =========================================================
   TEMPORARY PDF
   ---------------------------------------------------------
   Currently one PDF is available in the public folder.
   This PDF is temporarily used for all documents.
   Later, replace each fileUrl with the actual backend URL.
========================================================= */

const TEMP_PDF_URL =
  '/documents/approvals/project-approval-record.pdf'

/* =========================================================
   DOCUMENT CATEGORIES
========================================================= */

const documentCategories = [
  {
    name: 'Project Documents',
    icon: FolderOpen,
    description:
      'Project plans, drawings, project information and important project records.'
  },
  {
    name: 'Contracts',
    icon: FileCheck,
    description:
      'Contracts, agreements and important project-related terms and conditions.'
  },
  {
    name: 'Financial Documents',
    icon: Receipt,
    description:
      'Budgets, financial reports, investment information and expenditure records.'
  },
  {
    name: 'Procurement Documents',
    icon: BriefcaseBusiness,
    description:
      'Procurement activities, vendor information and purchase documentation.'
  },
  {
    name: 'Reports',
    icon: BarChart3,
    description:
      'Management, operational, project and performance reports.'
  },
  {
    name: 'Approvals',
    icon: ClipboardCheck,
    description:
      'Project approvals, decisions and authorization records.'
  },
  {
    name: 'Legal Documents',
    icon: Scale,
    description:
      'Legal, compliance and regulatory project documentation.'
  },
  {
    name: 'Management Documents',
    icon: FileArchive,
    description:
      'Management notes, reviews, decisions and strategic documentation.'
  }
]

/* =========================================================
   DOCUMENT DATA
========================================================= */

const documents = [
  {
    id: 1,
    name: 'Project Master Plan',
    category: 'Project Documents',
    description:
      'Master project plan and key project information.',
    updated: '07 Sep 2026',
    type: 'PDF',
    size: '4.8 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Project-Master-Plan.pdf'
  },
  {
    id: 2,
    name: 'Project Overview',
    category: 'Project Documents',
    description:
      'Project overview, objectives and important information.',
    updated: '06 Sep 2026',
    type: 'PDF',
    size: '2.4 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Project-Overview.pdf'
  },
  {
    id: 3,
    name: 'Project Development Agreement',
    category: 'Contracts',
    description:
      'Important project development agreement and terms.',
    updated: '05 Sep 2026',
    type: 'PDF',
    size: '3.2 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Project-Development-Agreement.pdf'
  },
  {
    id: 4,
    name: 'Annual Financial Report',
    category: 'Financial Documents',
    description:
      'Annual financial performance and expenditure report.',
    updated: '04 Sep 2026',
    type: 'PDF',
    size: '3.1 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Annual-Financial-Report.pdf'
  },
  {
    id: 5,
    name: 'Investment Overview',
    category: 'Financial Documents',
    description:
      'High-level project investment overview.',
    updated: '03 Sep 2026',
    type: 'PDF',
    size: '2.9 MB',
    access: ['CEO'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Investment-Overview.pdf'
  },
  {
    id: 6,
    name: 'Procurement Summary',
    category: 'Procurement Documents',
    description:
      'Procurement activities, vendors and purchase records.',
    updated: '05 Sep 2026',
    type: 'PDF',
    size: '1.8 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Procurement-Summary.pdf'
  },
  {
    id: 7,
    name: 'Monthly Management Report',
    category: 'Reports',
    description:
      'Monthly management and project performance report.',
    updated: '07 Sep 2026',
    type: 'PDF',
    size: '2.7 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Monthly-Management-Report.pdf'
  },
  {
    id: 8,
    name: 'Quarterly Project Report',
    category: 'Reports',
    description:
      'Quarterly project progress and performance report.',
    updated: '01 Sep 2026',
    type: 'PDF',
    size: '3.6 MB',
    access: ['CEO'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Quarterly-Project-Report.pdf'
  },
  {
    id: 9,
    name: 'Project Approval Record',
    category: 'Approvals',
    description:
      'Official project approval and authorization record.',
    updated: '07 Sep 2026',
    type: 'PDF',
    size: '1.2 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Project-Approval-Record.pdf'
  },
  {
    id: 10,
    name: 'Legal Compliance Document',
    category: 'Legal Documents',
    description:
      'Legal and compliance-related project document.',
    updated: '05 Sep 2026',
    type: 'PDF',
    size: '2.1 MB',
    access: ['CEO'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Legal-Compliance-Document.pdf'
  },
  {
    id: 11,
    name: 'Management Review Notes',
    category: 'Management Documents',
    description:
      'Management review notes and important decisions.',
    updated: '06 Sep 2026',
    type: 'PDF',
    size: '1.4 MB',
    access: ['CEO', 'MD'],
    fileUrl: TEMP_PDF_URL,
    fileName: 'Management-Review-Notes.pdf'
  }
]

/* =========================================================
   DOCUMENTATION ARTICLES
========================================================= */

const documentationArticles = [
  {
    id: 101,
    category: 'Getting Started',
    title: 'Getting Started with the Dashboard',
    description:
      'Learn the dashboard structure, navigation, search, date range and profile options available to management users.',
    readTime: '5 min read',
    updated: '12 Sep 2026',
    icon: BookOpen,
    content: `
This guide provides a complete introduction to the management dashboard.

The dashboard is organized into different management modules that can be accessed from the sidebar. Each module provides information and actions related to a specific area of project and business management.

Use the top navigation to search for information, change the reporting date range and access your profile options.

The sidebar provides access to modules such as Projects, Construction, Finance, Procurement, Sales & Marketing, Investments, Human Resources, Approvals, Reports, Documents, Risks & Issues, Communications, Calendar and Settings.

Management users should use the relevant module to review information, monitor progress and perform the actions available to their assigned role.
`
  },
  {
    id: 102,
    category: 'Project Overview',
    title: 'Project Overview Guide',
    description:
      'Understand project information, project progress, milestones, budget position and important project metrics.',
    readTime: '6 min read',
    updated: '10 Sep 2026',
    icon: FolderOpen,
    content: `
The Project Overview section provides management with a consolidated view of important project information.

Management can use this area to understand the current project position, review progress and monitor key project metrics.

Important information can include project progress, budget position, expenditure, milestones, operational updates and other management-level project information.

The purpose of this section is to provide a clear high-level view so management can quickly understand the current state of the project and identify areas that require attention.
`
  },
  {
    id: 103,
    category: 'Project Status',
    title: 'Understanding Project Status',
    description:
      'Learn how project progress, milestones, budget position and important project issues are monitored.',
    readTime: '4 min read',
    updated: '09 Sep 2026',
    icon: BarChart3,
    content: `
Project Status provides management with an understanding of the current condition and progress of important project activities.

Project progress can be reviewed through progress indicators, milestones and key performance information.

Management can also review important issues that may affect project execution. These can include delays, budget concerns, operational challenges and other areas requiring management attention.

Regularly reviewing project status helps management identify important changes and make informed decisions.
`
  },
  {
    id: 104,
    category: 'User Guide',
    title: 'Management User Guide',
    description:
      'General guide for management users covering dashboard navigation and commonly used management modules.',
    readTime: '7 min read',
    updated: '08 Sep 2026',
    icon: BookOpen,
    content: `
The Management User Guide explains the primary dashboard navigation and management workflows.

Use the sidebar to move between management modules. Each module is designed to provide information relevant to its respective business area.

Users should review the information available in each section and use the available actions according to their assigned role.

The dashboard also provides search functionality that helps users locate information across the available management sections.
`
  },
  {
    id: 105,
    category: 'Admin Guide',
    title: 'Administration Guide',
    description:
      'Reference guide covering administrative functions, access control and management dashboard settings.',
    readTime: '8 min read',
    updated: '06 Sep 2026',
    icon: Settings,
    content: `
The Administration Guide provides reference information for administrative and management functions.

Access to specific information and actions depends on the role assigned to the user.

The dashboard supports role-based access so that users can work with the information relevant to their responsibilities.

Administrative settings should be reviewed carefully because changes may affect dashboard behavior, access and management workflows.
`
  },
  {
    id: 106,
    category: 'Workflow Guide',
    title: 'Management Workflow Guide',
    description:
      'Understand workflows related to approvals, documents, project information and management actions.',
    readTime: '6 min read',
    updated: '05 Sep 2026',
    icon: Workflow,
    content: `
The Management Workflow Guide explains how information moves through important management processes.

Typical workflows can include project review, document management, procurement review, approvals, reporting and management actions.

Users should first review the available information and then use the appropriate action provided within the relevant module.

Role-based permissions determine which actions and documents are available to each user.
`
  },
  {
    id: 107,
    category: 'FAQs',
    title: 'Frequently Asked Questions',
    description:
      'Find answers to common questions about dashboard navigation, documents, permissions and management features.',
    readTime: '4 min read',
    updated: '03 Sep 2026',
    icon: HelpCircle,
    content: `
Frequently asked questions cover common dashboard activities.

How do I find a document?

Use the document search field or select a document category.

Why is a document restricted?

Some documents are available only to specific management roles.

How do I view a document?

Select the View button for an authorized document.

How do I download a document?

Select the Download button for an authorized document.

How do I read a guide?

Select Read Guide on the required documentation card to open the complete guide.
`
  }
]

/* =========================================================
   DOCUMENTATION CATEGORIES
========================================================= */

const documentationCategories = [
  'All',
  'Getting Started',
  'Project Overview',
  'Project Status',
  'User Guide',
  'Admin Guide',
  'Workflow Guide',
  'FAQs'
]

/* =========================================================
   COMPONENT
========================================================= */

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showFilter, setShowFilter] = useState(false)

  const [selectedDocument, setSelectedDocument] =
    useState(null)

  const [selectedArticle, setSelectedArticle] =
    useState(null)

  const [articleSearch, setArticleSearch] = useState('')
  const [articleCategory, setArticleCategory] =
    useState('All')

  const [currentRole, setCurrentRole] = useState('MD')
  const [showRoleMenu, setShowRoleMenu] = useState(false)

  const roles = ['CEO', 'MD']

  /* =========================================================
     ACCESS CONTROL
  ========================================================= */

  const canAccessDocument = (document) => {
    return document.access.includes(currentRole)
  }

  /* =========================================================
     FILTER DOCUMENTS
  ========================================================= */

  const filteredDocuments = documents.filter(
    (document) => {
      const query = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !query ||
        document.name.toLowerCase().includes(query) ||
        document.category.toLowerCase().includes(query) ||
        document.description.toLowerCase().includes(query)

      const matchesCategory =
        categoryFilter === 'All' ||
        document.category === categoryFilter

      return matchesSearch && matchesCategory
    }
  )

  /* =========================================================
     DOWNLOAD PDF
  ========================================================= */

  const handleDownload = async (document) => {
    if (!document) return

    if (!canAccessDocument(document)) {
      alert(
        'You do not have permission to download this document.'
      )
      return
    }

    if (!document.fileUrl) {
      alert(
        `"${document.name}" PDF file is not available.`
      )
      return
    }

    try {
      const response = await fetch(document.fileUrl, {
        method: 'GET',
        cache: 'no-cache'
      })

      if (!response.ok) {
        throw new Error(
          `PDF not found. Status: ${response.status}`
        )
      }

      const blob = await response.blob()

      if (!blob || blob.size === 0) {
        throw new Error('PDF file is empty.')
      }

      const blobUrl =
        window.URL.createObjectURL(blob)

      const link =
        window.document.createElement('a')

      link.href = blobUrl

      link.download =
        document.fileName ||
        `${document.name.replace(/\s+/g, '-')}.pdf`

      link.style.display = 'none'

      window.document.body.appendChild(link)

      link.click()

      window.document.body.removeChild(link)

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl)
      }, 1500)
    } catch (error) {
      console.error('Download error:', error)

      alert(
        `"${document.name}" PDF could not be downloaded.\n\n` +
        'Please check that the PDF exists inside the public/documents folder.'
      )
    }
  }

  /* =========================================================
     VIEW DOCUMENT
  ========================================================= */

  const handleView = (document) => {
    if (!canAccessDocument(document)) return

    setSelectedDocument(document)
  }

  /* =========================================================
     STATS
  ========================================================= */

  const totalDocuments = documents.length

  const totalReports = documents.filter(
    (item) => item.category === 'Reports'
  ).length

  const totalContracts = documents.filter(
    (item) => item.category === 'Contracts'
  ).length

  const totalApprovals = documents.filter(
    (item) => item.category === 'Approvals'
  ).length

  /* =========================================================
     FILTER DOCUMENTATION
  ========================================================= */

  const filteredArticles =
    documentationArticles.filter((article) => {
      const query =
        articleSearch.trim().toLowerCase()

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description
          .toLowerCase()
          .includes(query) ||
        article.category
          .toLowerCase()
          .includes(query)

      const matchesCategory =
        articleCategory === 'All' ||
        article.category === articleCategory

      return matchesSearch && matchesCategory
    })

  return (
    <div className="min-h-full bg-bg text-text px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

        <div>

          <div className="inline-flex items-center gap-2 mb-3">

            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">

              <Sparkles
                size={12}
                className="text-primary"
              />

            </span>

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary m-0">
              Management Resources
            </p>

          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-text">
            Documents & Documentation
          </h1>

          <p className="text-sm text-muted mt-2 leading-6 max-w-2xl">
            Access important management documents, reports,
            contracts, approvals and system documentation from one place.
          </p>

        </div>

        {/* ROLE BASED ACCESS */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowRoleMenu((value) => !value)
            }
            className="h-12 px-4 rounded-2xl border border-slate-300 bg-white text-slate-800 flex items-center gap-3 shadow-lg shadow-black/[0.08] hover:border-primary hover:shadow-primary/10 transition-all"
          >

            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">

              <UserRoundCheck
                size={16}
                className="text-primary"
              />

            </div>

            <div className="text-left">

              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold m-0">
                Role Based Access
              </p>

              <p className="text-sm font-semibold text-slate-900 m-0">
                {currentRole}
              </p>

            </div>

            <ChevronDown
              size={15}
              className={`text-slate-500 transition-transform duration-200 ${
                showRoleMenu ? 'rotate-180' : ''
              }`}
            />

          </button>

          {showRoleMenu && (

            <div className="doc-pop absolute right-0 top-14 z-[100] w-56 rounded-2xl border border-slate-300 bg-white shadow-2xl shadow-black/15 p-2 overflow-hidden">

              <p className="px-3 py-2 text-[10px] uppercase tracking-wider text-slate-500 font-semibold m-0">
                Select Role
              </p>

              {roles.map((role) => (

                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setCurrentRole(role)
                    setShowRoleMenu(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    currentRole === role
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >

                  <span>{role}</span>

                  {currentRole === role && (
                    <ShieldCheck size={15} />
                  )}

                </button>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <SummaryCard
          label="Total Documents"
          value={totalDocuments}
          text="Available management records"
          icon={FileText}
          delay={0}
        />

        <SummaryCard
          label="Reports"
          value={totalReports}
          text="Management reports"
          icon={BarChart3}
          delay={60}
        />

        <SummaryCard
          label="Contracts"
          value={totalContracts}
          text="Agreements and contracts"
          icon={FileCheck}
          delay={120}
        />

        <SummaryCard
          label="Approvals"
          value={totalApprovals}
          text="Approval records"
          icon={ClipboardCheck}
          delay={180}
        />

      </div>

      {/* =====================================================
          DOCUMENT LIBRARY
      ===================================================== */}

      <section className="mb-12">

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4 mb-5">

          <div>

            <h2 className="font-serif text-2xl font-semibold">
              Document Library
            </h2>

            <p className="text-sm text-muted mt-1">
              Browse and access important management documents.
            </p>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="relative w-full sm:w-[320px]">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-line bg-card text-sm text-text placeholder:text-muted outline-none focus:border-primary focus:shadow-md focus:shadow-primary/10 transition"
              />

            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilter((value) => !value)
              }
              className={`group h-11 px-3.5 rounded-2xl border flex items-center justify-center gap-2.5 text-sm font-semibold transition-all duration-200 ${
                showFilter
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                  : 'bg-card text-text border-line hover:border-primary hover:bg-primary/5 hover:shadow-sm'
              }`}
            >

              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition ${
                  showFilter
                    ? 'bg-white/15'
                    : 'bg-bg group-hover:bg-primary/10'
                }`}
              >

                <SlidersHorizontal
                  size={16}
                  className={`transition-transform duration-200 ${
                    showFilter ? 'rotate-90' : ''
                  } ${
                    showFilter
                      ? 'text-white'
                      : 'text-primary'
                  }`}
                />

              </span>

              <span>
                Filter
              </span>

            </button>

          </div>

        </div>

        {/* FILTER */}

        {showFilter && (

          <div className="doc-fade eq-card p-4 mb-5">

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={() =>
                  setCategoryFilter('All')
                }
                className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                  categoryFilter === 'All'
                    ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
                    : 'bg-card border-line text-muted hover:text-text hover:border-primary/40'
                }`}
              >
                All
              </button>

              {documentCategories.map(
                (category) => {

                  const Icon = category.icon

                  return (

                    <button
                      key={category.name}
                      type="button"
                      onClick={() =>
                        setCategoryFilter(category.name)
                      }
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold border flex items-center gap-2 transition ${
                        categoryFilter === category.name
                          ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
                          : 'bg-card border-line text-muted hover:text-text hover:border-primary/40'
                      }`}
                    >

                      <Icon size={14} />

                      {category.name}

                    </button>

                  )
                }
              )}

            </div>

          </div>

        )}

        {/* CATEGORY CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {documentCategories.map(
            (category, index) => {

              const Icon = category.icon

              const count = documents.filter(
                (item) =>
                  item.category === category.name
              ).length

              const isActive =
                categoryFilter === category.name

              return (

                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    setCategoryFilter(category.name)
                  }
                  style={{
                    animationDelay: `${index * 45}ms`
                  }}
                  className={`doc-fade eq-card relative overflow-hidden p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] ${
                    isActive
                      ? 'ring-2 ring-primary shadow-md shadow-primary/10'
                      : ''
                  }`}
                >

                  {isActive && (
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-primary" />
                  )}

                  <div className="flex items-start justify-between">

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">

                      <Icon
                        size={18}
                        className="text-primary"
                      />

                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        isActive
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'bg-bg border-line text-muted'
                      }`}
                    >
                      {count}
                    </span>

                  </div>

                  <h3 className="text-sm font-semibold mt-4">
                    {category.name}
                  </h3>

                  <p className="text-xs text-muted leading-5 mt-1">
                    {category.description}
                  </p>

                </button>

              )
            }
          )}

        </div>

        {/* DOCUMENT TABLE */}

        <div className="eq-card overflow-hidden">

          <div className="px-5 py-5 border-b border-line flex items-center justify-between bg-gradient-to-r from-primary/[0.04] to-transparent">

            <div>

              <h3 className="text-base font-semibold">
                Documents
              </h3>

              <p className="text-xs text-muted mt-1">
                {filteredDocuments.length} documents available
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs text-muted bg-card border border-line rounded-full px-3 py-1.5">

              <ShieldCheck
                size={15}
                className="text-primary"
              />

              Access controlled

            </div>

          </div>

          <div className="w-full overflow-hidden">

            <table className="w-full table-fixed border-collapse">

              <thead>

                <tr className="bg-bg border-b border-line">

                  <th className="w-[25%] text-left px-4 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Document
                  </th>

                  <th className="w-[16%] text-left px-4 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Description
                  </th>

                  <th className="w-[14%] text-left px-4 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Category
                  </th>

                  <th className="w-[13%] text-left px-4 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Last Updated
                  </th>

                  <th className="w-[12%] text-center px-2 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Access
                  </th>

                  <th className="w-[20%] text-center px-2 py-4 text-[10px] uppercase tracking-[0.08em] text-muted font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredDocuments.map(
                  (document, index) => {

                    const hasAccess =
                      canAccessDocument(document)

                    return (

                      <tr
                        key={document.id}
                        style={{
                          animationDelay: `${index * 35}ms`
                        }}
                        className="doc-fade border-b border-line last:border-0 odd:bg-bg/30 hover:bg-primary/[0.03] transition-colors"
                      >

                        <td className="px-4 py-5 align-middle">

                          <div className="flex items-center gap-2.5 min-w-0">

                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0">

                              <FileText
                                size={17}
                                className="text-primary"
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="text-[13px] font-semibold text-text leading-5 break-words">
                                {document.name}
                              </p>

                              <p className="text-[11px] text-muted mt-1">
                                {document.type} • {document.size}
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="px-4 py-5 align-middle">

                          <p className="text-[11px] text-muted leading-5 break-words">
                            {document.description}
                          </p>

                        </td>

                        <td className="px-4 py-5 align-middle">

                          <span className="inline-flex items-center max-w-full px-2.5 py-1.5 rounded-full bg-bg border border-line text-[10px] text-text font-medium leading-4 whitespace-normal break-words">
                            {document.category}
                          </span>

                        </td>

                        <td className="px-4 py-5 align-middle">

                          <div className="flex items-center gap-1.5 text-[11px] text-muted leading-5 whitespace-nowrap">

                            <CalendarDays
                              size={14}
                              className="shrink-0"
                            />

                            <span>
                              {document.updated}
                            </span>

                          </div>

                        </td>

                        <td className="px-2 py-5 align-middle">

                          <div className="flex justify-center items-center">

                            {hasAccess ? (

                              <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold whitespace-nowrap">

                                <ShieldCheck size={13} />

                                Authorized

                              </span>

                            ) : (

                              <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full bg-bg border border-line text-muted text-[10px] font-semibold whitespace-nowrap">

                                <LockKeyhole size={13} />

                                Restricted

                              </span>

                            )}

                          </div>

                        </td>

                        <td className="px-2 py-5 align-middle">

                          <div className="flex justify-center items-center gap-2">

                            {/* VIEW */}

                            <button
                              type="button"
                              disabled={!hasAccess}
                              onClick={() =>
                                handleView(document)
                              }
                              className={`w-[88px] h-9 rounded-full border flex items-center justify-center gap-1.5 text-[10px] font-semibold transition whitespace-nowrap ${
                                hasAccess
                                  ? 'bg-card border-line text-text hover:bg-primary hover:text-white hover:border-primary hover:shadow-sm'
                                  : 'bg-bg border-line text-muted opacity-50 cursor-not-allowed'
                              }`}
                            >

                              <Eye size={14} />

                              View

                            </button>

                            {/* DOWNLOAD */}

                            <button
                              type="button"
                              disabled={!hasAccess}
                              onClick={() =>
                                handleDownload(document)
                              }
                              className={`w-[88px] h-9 rounded-full border flex items-center justify-center gap-1.5 text-[10px] font-semibold transition whitespace-nowrap ${
                                hasAccess
                                  ? 'bg-primary text-white border-primary hover:opacity-90 shadow-sm shadow-primary/20'
                                  : 'bg-bg border-line text-muted opacity-50 cursor-not-allowed'
                              }`}
                            >

                              <Download size={14} />

                              Download

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  }
                )}

              </tbody>

            </table>

          </div>

          {filteredDocuments.length === 0 && (

            <div className="py-16 text-center">

              <Search
                size={26}
                className="mx-auto text-muted"
              />

              <h3 className="font-semibold mt-4">
                No documents found
              </h3>

              <p className="text-sm text-muted mt-1">
                Try another search or category.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          DOCUMENTATION
      ===================================================== */}

      <section>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">

          <div>

            <h2 className="font-serif text-2xl font-semibold">
              Documentation & Guides
            </h2>

            <p className="text-sm text-muted mt-1">
              Guides and reference material for using the management dashboard.
            </p>

          </div>

          <div className="relative w-full lg:w-[300px]">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              placeholder="Search documentation..."
              value={articleSearch}
              onChange={(e) =>
                setArticleSearch(e.target.value)
              }
              className="w-full h-11 pl-10 pr-4 rounded-2xl border border-line bg-card text-sm text-text placeholder:text-muted outline-none focus:border-primary focus:shadow-md focus:shadow-primary/10 transition"
            />

          </div>

        </div>

        <div className="flex flex-wrap gap-2 mb-6">

          {documentationCategories.map(
            (category) => (

              <button
                key={category}
                type="button"
                onClick={() =>
                  setArticleCategory(category)
                }
                className={`px-3.5 py-2 rounded-full border text-xs font-semibold transition ${
                  articleCategory === category
                    ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
                    : 'bg-card border-line text-muted hover:text-text hover:border-primary/40'
                }`}
              >

                {category}

              </button>

            )
          )}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredArticles.map(
            (article, index) => {

              const Icon = article.icon

              return (

                <div
                  key={article.id}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                  className="doc-fade eq-card relative overflow-hidden p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] transition-all duration-200"
                >

                  <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary/60 to-primary/10" />

                  <div className="flex items-start justify-between gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">

                      <Icon
                        size={19}
                        className="text-primary"
                      />

                    </div>

                    <span className="text-[11px] px-2.5 py-1 rounded-full border border-line text-muted bg-bg">
                      {article.category}
                    </span>

                  </div>

                  <h3 className="text-base font-semibold mt-5">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted leading-6 mt-2 min-h-[90px]">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">

                    <span className="text-xs text-muted">
                      {article.readTime}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedArticle(article)
                      }
                      className="h-9 px-4 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center gap-2 hover:opacity-90 hover:gap-3 shadow-sm shadow-primary/20 transition-all"
                    >

                      Read Guide

                      <ArrowRight size={13} />

                    </button>

                  </div>

                </div>

              )
            }
          )}

        </div>

      </section>

      {/* =====================================================
          DOCUMENT VIEW MODAL
      ===================================================== */}

      {selectedDocument && (

        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() =>
            setSelectedDocument(null)
          }
        >

          <div
            className="doc-pop w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[24px] bg-white border border-slate-200 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-primary/[0.06] to-transparent">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">

                  <FileText
                    size={20}
                    className="text-primary"
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-500 font-medium">
                    {selectedDocument.category}
                  </p>

                  <h2 className="font-serif text-xl font-semibold text-slate-900 mt-1">
                    {selectedDocument.name}
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDocument(null)
                }
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition"
              >

                <X size={17} />

              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="p-6 bg-white overflow-y-auto max-h-[65vh]">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    File Type
                  </p>

                  <p className="text-sm font-semibold mt-2 text-slate-900">
                    {selectedDocument.type}
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    File Size
                  </p>

                  <p className="text-sm font-semibold mt-2 text-slate-900">
                    {selectedDocument.size}
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Last Updated
                  </p>

                  <p className="text-sm font-semibold mt-2 text-slate-900">
                    {selectedDocument.updated}
                  </p>

                </div>

              </div>

              {/* DOCUMENT DETAILS */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-center gap-2 mb-3">

                  <FileText
                    size={17}
                    className="text-primary"
                  />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Document Details
                  </h3>

                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-4">

                  <p className="text-sm leading-6 text-slate-600">
                    {selectedDocument.description}
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-200">

                  <div className="flex items-center gap-2 text-xs text-slate-600">

                    <ShieldCheck
                      size={15}
                      className="text-primary"
                    />

                    Authorized for {currentRole}

                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">

                    <CalendarDays size={15} />

                    Updated {selectedDocument.updated}

                  </div>

                </div>

              </div>

              {/* DOCUMENT PREVIEW */}

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex items-center gap-2 mb-4">

                  <Eye
                    size={17}
                    className="text-primary"
                  />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Document Preview
                  </h3>

                </div>

                <div className="min-h-[140px] rounded-xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6">

                  <FileText
                    size={32}
                    className="text-slate-400"
                  />

                  <p className="text-sm font-semibold text-slate-800 mt-3">
                    {selectedDocument.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-2 max-w-md leading-5">

                    This document is currently connected to the available PDF file.

                    <br />

                    Use the Download button below to download it.

                  </p>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-white">

              <button
                type="button"
                onClick={() =>
                  setSelectedDocument(null)
                }
                className="h-10 px-5 rounded-full border border-slate-200 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-100 transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDownload(selectedDocument)
                }
                className="h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 shadow-sm shadow-primary/20 transition"
              >

                <Download size={16} />

                Download

              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DOCUMENTATION ARTICLE MODAL
      ===================================================== */}

      {selectedArticle && (

        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() =>
            setSelectedArticle(null)
          }
        >

          <div
            className="doc-pop w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[24px] bg-white border border-slate-200 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ARTICLE HEADER */}

            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-primary/[0.06] to-transparent">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">

                  <BookOpen
                    size={19}
                    className="text-primary"
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-500 font-medium">
                    {selectedArticle.category}
                  </p>

                  <h2 className="font-serif text-xl font-semibold text-slate-900 mt-1">
                    {selectedArticle.title}
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedArticle(null)
                }
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition"
              >

                <X size={17} />

              </button>

            </div>

            {/* ARTICLE CONTENT */}

            <div className="p-6 bg-white overflow-y-auto max-h-[65vh]">

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-5">

                <span>
                  {selectedArticle.readTime}
                </span>

                <span>•</span>

                <span>
                  Updated {selectedArticle.updated}
                </span>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 mb-5">

                <div className="rounded-xl bg-white border border-slate-200 p-4">

                  <p className="text-sm text-slate-700 leading-6">
                    {selectedArticle.description}
                  </p>

                </div>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex items-center gap-2 mb-5">

                  <BookOpen
                    size={18}
                    className="text-primary"
                  />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Guide Details
                  </h3>

                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">

                  <div className="text-sm text-slate-700 leading-8 whitespace-pre-line">
                    {selectedArticle.content}
                  </div>

                </div>

              </div>

            </div>

            {/* ARTICLE FOOTER */}

            <div className="flex justify-end px-6 py-4 border-t border-slate-200 bg-white">

              <button
                type="button"
                onClick={() =>
                  setSelectedArticle(null)
                }
                className="h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 shadow-sm shadow-primary/20 transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  text,
  icon: Icon,
  delay = 0
}) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`
      }}
      className="doc-fade eq-card relative overflow-hidden p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] transition-all duration-200"
    >

      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary/70 to-primary/10" />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-wider text-muted font-semibold">
            {label}
          </p>

          <p className="font-serif text-3xl font-semibold mt-2">
            {value}
          </p>

          <p className="text-xs text-muted mt-1">
            {text}
          </p>

        </div>

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">

          <Icon
            size={19}
            className="text-primary"
          />

        </div>

      </div>

    </div>
  )
}