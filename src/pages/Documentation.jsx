import { useMemo, useState } from 'react';
import {
  Search,
  ArrowUpRight,
  Clock3,
  BookOpen,
  Rocket,
  LayoutGrid,
  ShieldCheck,
  Layers3,
  GitBranch,
  Library,
  CircleHelp,
  Building2,
  TrendingUp,
  HardHat,
  Users,
  Globe,
  FileCheck,
  Activity,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  MapPin,
  X,
} from 'lucide-react';

/* =========================================================
   DOCUMENTATION CATEGORIES
========================================================= */

const docCategories = [
  {
    key: 'getting-started',
    label: 'Getting Started',
    description: 'First steps for new dashboard users',
    icon: Rocket,
  },
  {
    key: 'project-overview',
    label: 'Project Overview',
    description: 'How Bambardara is structured end to end',
    icon: LayoutGrid,
  },
  {
    key: 'project-status',
    label: 'Project Status',
    description: 'Current progress and project health',
    icon: Activity,
  },
  {
    key: 'user-guide',
    label: 'User Guide',
    description: 'Using each page day to day',
    icon: BookOpen,
  },
  {
    key: 'admin-guide',
    label: 'Admin Guide',
    description: 'Roles, access levels and settings',
    icon: ShieldCheck,
  },
  {
    key: 'system-features',
    label: 'System Features',
    description: 'What the dashboard can do',
    icon: Layers3,
  },
  {
    key: 'workflow-guide',
    label: 'Workflow Guide',
    description: 'Approvals and operational workflows',
    icon: GitBranch,
  },
  {
    key: 'knowledge-base',
    label: 'Knowledge Base',
    description: 'Project reference material',
    icon: Library,
  },
  {
    key: 'faqs',
    label: 'FAQs',
    description: 'Common questions, answered',
    icon: CircleHelp,
  },
];

/* =========================================================
   DOCUMENTATION ARTICLES
========================================================= */

const docArticles = [
  /* ---------------- GETTING STARTED ---------------- */

  {
    id: 1,
    category: 'getting-started',
    title: 'Welcome to the Bambardara CEO Command',
    description:
      'Introduction to the Bambardara executive dashboard and its purpose.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      The Bambardara CEO Command is the central management dashboard for monitoring
      the overall project, investments, construction, team operations, approvals,
      website activity and project documentation.

      The dashboard provides leadership with a single place to understand the
      current project position and make informed decisions.
    `,
  },

  {
    id: 2,
    category: 'getting-started',
    title: 'Dashboard Navigation',
    description:
      'Understand the main sections available in the Bambardara dashboard.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      The main navigation includes Overview, Investments, Construction & Zones,
      Team & Roles, Website & Marketing, Approvals, Documentation and Settings.

      Each section represents a different operational area of the Bambardara project.
    `,
  },

  {
    id: 3,
    category: 'getting-started',
    title: 'Setting Up Your Account and Access Level',
    description:
      'Learn how user access and dashboard permissions are managed.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      User access is based on the role assigned to the team member.
      Different roles may have different permissions for viewing, editing,
      approving and managing project information.
    `,
  },

  /* ---------------- PROJECT OVERVIEW ---------------- */

  {
    id: 4,
    category: 'project-overview',
    title: 'Bambardara Project Overview',
    description:
      'Complete overview of the Bambardara development and its major areas.',
    readTime: '5 min read',
    updated: '07 Sep 2026',
    content: `
      Bambardara is a development project being managed through the CEO Command
      dashboard.

      The project is currently in the Under Construction - Phase 1 stage.

      Major management areas include:
      • Construction and zones
      • Investment planning
      • Approvals
      • Team and responsibilities
      • Website and marketing
      • Project documentation
      • Operational workflows
    `,
  },

  {
    id: 5,
    category: 'project-overview',
    title: 'Project Vision and Objectives',
    description:
      'Understand the strategic objectives behind the Bambardara project.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      The main objective is to develop and manage the Bambardara project through
      structured planning, construction monitoring, investment tracking and
      operational coordination.

      The CEO Command is designed to provide leadership with visibility across
      all major project functions.
    `,
  },

  {
    id: 6,
    category: 'project-overview',
    title: 'Project Location and Development',
    description:
      'Reference information about the Bambardara project location and development.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      Project Location:
      Bambardara, Near Kolhapur.

      Development activities are organized into different zones and phases.
      Phase 1 is currently under construction.
    `,
  },

  {
    id: 7,
    category: 'project-overview',
    title: 'Project Timeline and Milestones',
    description:
      'Track important milestones and upcoming project activities.',
    readTime: '5 min read',
    updated: '07 Sep 2026',
    content: `
      Project milestones are used to monitor major activities from planning
      through construction and completion.

      Key milestone areas include:
      • Planning
      • Approvals
      • Site development
      • Construction
      • Infrastructure
      • Marketing
      • Operational readiness
    `,
  },

  /* ---------------- PROJECT STATUS ---------------- */

  {
    id: 8,
    category: 'project-status',
    title: 'Current Project Status',
    description:
      'Current overall status, phase, construction and operational progress.',
    readTime: '5 min read',
    updated: '07 Sep 2026',
    content: `
      OVERALL STATUS:
      Under Construction - Phase 1

      LOCATION:
      Bambardara, Near Kolhapur

      CURRENT PHASE:
      Phase 1

      CONSTRUCTION:
      In Progress

      INVESTMENT:
      Active

      APPROVALS:
      In Progress

      PROJECT HEALTH:
      Operational activities are being actively monitored through the dashboard.

      CURRENT FOCUS:
      • Phase 1 construction
      • Zone-wise progress
      • Investment monitoring
      • Pending approvals
      • Team coordination
      • Upcoming project milestones
    `,
  },

  {
    id: 9,
    category: 'project-status',
    title: 'Phase 1 Status',
    description:
      'Detailed reference for the current Phase 1 development.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Phase 1 is currently under construction.

      The current focus is on completing ongoing construction activities,
      monitoring zone-wise progress, managing approvals and tracking the
      resources required for the next stage.
    `,
  },

  {
    id: 10,
    category: 'project-status',
    title: 'Completed, Ongoing and Upcoming Work',
    description:
      'Understand how project activities are classified and monitored.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      COMPLETED:
      Activities that have successfully reached completion.

      ONGOING:
      Activities currently being executed.

      UPCOMING:
      Activities planned for the next stage.

      DELAYED / AT RISK:
      Activities that require additional attention or management intervention.
    `,
  },

  /* ---------------- USER GUIDE ---------------- */

  {
    id: 11,
    category: 'user-guide',
    title: 'Using the Overview Page',
    description:
      'Understand the key information displayed on the executive overview.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      The Overview page provides a high-level snapshot of the Bambardara project.

      Users can monitor project status, investments, construction progress,
      approvals and other important operational indicators.
    `,
  },

  {
    id: 12,
    category: 'user-guide',
    title: 'Using the Investments Page',
    description:
      'Monitor investment information, budgets and financial progress.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      The Investments page is used to monitor project investment information.

      Important areas include:
      • Total investment
      • Investment by zone
      • Budget
      • Actual spending
      • Investment status
      • Upcoming investment requirements
    `,
  },

  {
    id: 13,
    category: 'user-guide',
    title: 'Using Construction & Zones',
    description:
      'Monitor construction progress across project zones.',
    readTime: '5 min read',
    updated: '07 Sep 2026',
    content: `
      Construction & Zones provides visibility into individual project zones.

      Users can monitor:
      • Zone status
      • Construction progress
      • Ongoing work
      • Pending work
      • Contractors
      • Resources
      • Site activities
    `,
  },

  /* ---------------- ADMIN GUIDE ---------------- */

  {
    id: 14,
    category: 'admin-guide',
    title: 'Admin Roles and Permissions',
    description:
      'Understand dashboard roles, permissions and administrative access.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Administrators are responsible for maintaining project information,
      managing users and controlling access to dashboard functionality.

      Access should be provided according to the user's responsibility.
    `,
  },

  {
    id: 15,
    category: 'admin-guide',
    title: 'Managing Project Information',
    description:
      'Guidelines for maintaining accurate project data.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Project information should be updated regularly so that leadership always
      has access to current and reliable information.

      Important information includes project status, construction progress,
      investments, approvals and documentation.
    `,
  },

  /* ---------------- SYSTEM FEATURES ---------------- */

  {
    id: 16,
    category: 'system-features',
    title: 'Dashboard Features',
    description:
      'Overview of the main capabilities available in the CEO Command.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Main system features include:

      • Executive overview
      • Investment tracking
      • Construction monitoring
      • Zone management
      • Team management
      • Website and marketing monitoring
      • Approval management
      • Documentation
      • Search and filtering
      • Project status tracking
    `,
  },

  {
    id: 17,
    category: 'system-features',
    title: 'Document Management',
    description:
      'Manage project-related documents and references.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      Project documents can be associated with relevant operational areas such
      as approvals, investments, construction and project administration.

      Documents should be kept organized and updated.
    `,
  },

  /* ---------------- WORKFLOW GUIDE ---------------- */

  {
    id: 18,
    category: 'workflow-guide',
    title: 'Approval Workflow',
    description:
      'Understand how approvals move through the project workflow.',
    readTime: '5 min read',
    updated: '07 Sep 2026',
    content: `
      Approval workflow generally follows:

      1. Request submitted
      2. Documents reviewed
      3. Priority assigned
      4. Responsible person reviews
      5. Approval / rejection
      6. Status updated
      7. Supporting documents maintained

      Pending approvals should be monitored regularly.
    `,
  },

  {
    id: 19,
    category: 'workflow-guide',
    title: 'Investment Workflow',
    description:
      'Understand the process used for monitoring project investments.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Investment information is monitored against planned requirements and
      project activities.

      Leadership can use the investment information to understand current
      spending and upcoming financial requirements.
    `,
  },

  {
    id: 20,
    category: 'workflow-guide',
    title: 'Project Status Update Workflow',
    description:
      'Process for keeping project status information current.',
    readTime: '4 min read',
    updated: '07 Sep 2026',
    content: `
      Status updates should reflect the latest project situation.

      Recommended update areas:
      • Overall project status
      • Phase
      • Construction
      • Zones
      • Investments
      • Approvals
      • Upcoming milestones
      • Risks and delays
    `,
  },

  /* ---------------- KNOWLEDGE BASE ---------------- */

  {
    id: 21,
    category: 'knowledge-base',
    title: 'Project Terminology',
    description:
      'Reference for common terms used throughout the dashboard.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      PHASE:
      A major stage of project development.

      ZONE:
      A defined area within the project.

      MILESTONE:
      An important target or achievement.

      APPROVAL:
      Formal confirmation required before an activity can proceed.

      PROJECT HEALTH:
      Overall indication of project condition and progress.
    `,
  },

  {
    id: 22,
    category: 'knowledge-base',
    title: 'Important Project References',
    description:
      'Central reference for important Bambardara project information.',
    readTime: '3 min read',
    updated: '07 Sep 2026',
    content: `
      Important reference areas include:

      • Current project status
      • Phase 1
      • Construction & Zones
      • Investments
      • Approvals
      • Team & Roles
      • Website & Marketing
      • Project documentation
    `,
  },

  /* ---------------- FAQ ---------------- */

  {
    id: 23,
    category: 'faqs',
    title: 'What is the current project status?',
    description:
      'Current status and development stage of Bambardara.',
    readTime: '2 min read',
    updated: '07 Sep 2026',
    content: `
      Bambardara is currently in the Under Construction - Phase 1 stage.
      Construction and operational activities are being monitored through
      the CEO Command dashboard.
    `,
  },

  {
    id: 24,
    category: 'faqs',
    title: 'Which phase is currently active?',
    description:
      'Current development phase of the project.',
    readTime: '2 min read',
    updated: '07 Sep 2026',
    content: `
      Phase 1 is currently active and under construction.
    `,
  },

  {
    id: 25,
    category: 'faqs',
    title: 'What areas are monitored by the dashboard?',
    description:
      'Major project areas covered by the CEO Command.',
    readTime: '2 min read',
    updated: '07 Sep 2026',
    content: `
      The dashboard monitors:

      • Project overview
      • Investments
      • Construction & Zones
      • Team & Roles
      • Website & Marketing
      • Approvals
      • Documentation
    `,
  },

  {
    id: 26,
    category: 'faqs',
    title: 'How are pending approvals monitored?',
    description:
      'Understand how pending approvals are tracked.',
    readTime: '2 min read',
    updated: '07 Sep 2026',
    content: `
      Pending approvals are tracked through the Approvals section.
      Each approval can be reviewed based on its status, priority,
      reason and supporting documents.
    `,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Documentation() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categoryCounts = useMemo(() => {
    const counts = {};

    docArticles.forEach((article) => {
      counts[article.category] =
        (counts[article.category] ?? 0) + 1;
    });

    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return docArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'all' ||
        article.category === activeCategory;

      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const activeCategoryLabel =
    activeCategory === 'all'
      ? 'All Documentation'
      : docCategories.find(
          (category) => category.key === activeCategory
        )?.label;

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
          Documentation
        </h1>

        <p className="mt-1 text-sm text-muted">
          Guides, project references, status updates and FAQs for
          the Bambardara CEO Command
        </p>
      </div>

      {/* =====================================================
          PROJECT STATUS SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="eq-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Project Status</p>
              <p className="mt-1 font-medium text-text">
                Under Construction
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <Building2 size={19} />
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1 text-xs text-muted">
            <Activity size={12} />
            Phase 1
          </p>
        </div>

        <div className="eq-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Construction</p>
              <p className="mt-1 font-medium text-text">
                In Progress
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <HardHat size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Zone-wise activities are being monitored
          </p>
        </div>

        <div className="eq-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Investment</p>
              <p className="mt-1 font-medium text-text">
                Active
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <TrendingUp size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Financial activity under monitoring
          </p>
        </div>

        <div className="eq-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Approvals</p>
              <p className="mt-1 font-medium text-text">
                In Progress
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <FileCheck size={19} />
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Pending items are being tracked
          </p>
        </div>

      </div>

      {/* =====================================================
          PROJECT SNAPSHOT
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-secondary" />

              <p className="text-xs font-medium uppercase tracking-wide text-secondary">
                Project Snapshot
              </p>
            </div>

            <h2 className="mt-2 font-serif text-xl text-text">
              Bambardara Development Project
            </h2>

            <p className="mt-1 text-sm text-muted">
              Bambardara, Near Kolhapur
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
              Phase 1
            </span>

            <span className="rounded-full bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
              Under Construction
            </span>
          </div>

        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-3">

          <div>
            <p className="text-xs text-muted">Current Focus</p>
            <p className="mt-1 text-sm font-medium text-text">
              Phase 1 Development
            </p>
          </div>

          <div>
            <p className="text-xs text-muted">Project Health</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-text">
              <CheckCircle2 size={14} />
              Actively Monitored
            </p>
          </div>

          <div>
            <p className="text-xs text-muted">Last Documentation Update</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-text">
              <CalendarDays size={14} />
              07 Sep 2026
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, project status, investments, approvals..."
            className="w-full rounded-lg border border-line bg-bg py-3 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
          />
        </div>

      </div>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <div>

        <div className="mb-3 flex items-center justify-between gap-3">

          <h2 className="font-serif text-lg text-text">
            Browse by category
          </h2>

          {activeCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="text-xs font-medium text-secondary hover:underline"
            >
              Clear selection
            </button>
          )}

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {docCategories.map((category) => {

            const Icon = category.icon;
            const active =
              activeCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    active ? 'all' : category.key
                  )
                }
                className={[
                  'eq-card flex items-start gap-3 p-4 text-left transition-colors',
                  active
                    ? 'border-secondary/50 bg-secondary/[0.06]'
                    : 'hover:bg-primary/[0.03]',
                ].join(' ')}
              >

                <div
                  className={[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-md',
                    active
                      ? 'bg-secondary text-white'
                      : 'bg-primary/8 text-primary',
                  ].join(' ')}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </div>

                <div className="min-w-0">

                  <p className="font-medium text-text">
                    {category.label}
                  </p>

                  <p className="mt-0.5 text-xs text-muted">
                    {category.description}
                  </p>

                  <p className="mt-1.5 text-[0.7rem] uppercase tracking-wide text-muted">
                    {categoryCounts[category.key] ?? 0}{' '}
                    article
                    {(categoryCounts[category.key] ?? 0) === 1
                      ? ''
                      : 's'}
                  </p>

                </div>

              </button>
            );
          })}

        </div>
      </div>

      {/* =====================================================
          ARTICLES
      ===================================================== */}

      <div>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

          <h2 className="font-serif text-lg text-text">
            {activeCategoryLabel}
          </h2>

          <p className="text-xs text-muted">
            {filtered.length} article
            {filtered.length === 1 ? '' : 's'}
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((article) => {

            const category = docCategories.find(
              (cat) => cat.key === article.category
            );

            const Icon = category?.icon ?? BookOpen;

            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="eq-card flex flex-col p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-primary/[0.02]"
              >

                <div className="flex items-start justify-between gap-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="mt-1 text-muted"
                  />

                </div>

                <p className="mt-3 font-medium text-text">
                  {article.title}
                </p>

                <p className="mt-1.5 flex-1 text-xs leading-5 text-muted">
                  {article.description}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[0.7rem] text-muted">

                  <span className="rounded-full bg-secondary/10 px-2 py-1 font-medium text-secondary">
                    {category?.label ?? 'Guide'}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={11} />
                    {article.readTime}
                  </span>

                </div>

                <p className="mt-2 text-[0.7rem] text-muted">
                  Updated {article.updated}
                </p>

              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center">

              <AlertCircle
                size={24}
                className="mx-auto text-muted"
              />

              <p className="mt-3 text-sm text-muted">
                No articles match "{query}".
              </p>

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          ARTICLE DETAIL MODAL
      ===================================================== */}

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">

            {/* Modal Header */}

            <div className="flex items-start justify-between border-b border-line p-5">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  {(() => {
                    const category = docCategories.find(
                      (cat) =>
                        cat.key === selectedArticle.category
                    );

                    const Icon =
                      category?.icon ?? BookOpen;

                    return <Icon size={19} />;
                  })()}
                </div>

                <div>

                  <p className="text-xs font-medium text-secondary">
                    {
                      docCategories.find(
                        (cat) =>
                          cat.key === selectedArticle.category
                      )?.label
                    }
                  </p>

                  <h2 className="mt-1 font-serif text-xl text-text">
                    {selectedArticle.title}
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="rounded-md p-1.5 text-muted hover:bg-primary/5 hover:text-text"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Content */}

            <div className="max-h-[65vh] overflow-y-auto p-5">

              <div className="mb-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
                  {selectedArticle.readTime}
                </span>

                <span className="rounded-full bg-primary/8 px-3 py-1.5 text-xs text-primary">
                  Updated {selectedArticle.updated}
                </span>

              </div>

              <div className="whitespace-pre-line text-sm leading-7 text-muted">
                {selectedArticle.content}
              </div>

            </div>

            {/* Modal Footer */}

            <div className="flex items-center justify-between border-t border-line bg-bg px-5 py-4">

              <p className="text-xs text-muted">
                Bambardara CEO Command
              </p>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}