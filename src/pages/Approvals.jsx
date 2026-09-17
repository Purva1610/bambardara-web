import { useMemo, useState } from 'react'
import {
  Search,
  FileCheck2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  X,
  FileText,
  User,
  Building2,
  CalendarDays,
  IndianRupee,
  AlertCircle,
} from 'lucide-react'

const SUPPORTING_DOCUMENT_URL =
  '/documents/approvals/project-approval-record.pdf'

const initialApprovals = [
  // ================= CEO APPROVALS =================
  {
    id: 1,
    role: 'CEO',
    title: 'Luxury Villa Construction Budget',
    type: 'Budget Approval',
    department: 'Construction',
    requestedBy: 'Rajesh Sharma',
    amount: '₹1.90 Cr',
    submittedDate: '15 Sep 2026',
    requiredBy: '18 Sep 2026',
    status: 'Pending',
    reason: 'Approval required for luxury villa construction budget.',
    description:
      'Budget approval is required to proceed with the planned luxury villa construction activities.',
    documents: ['Construction Budget.pdf', 'Project Estimate.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Rajesh Sharma',
        date: '15 Sep 2026',
      },
    ],
  },
  {
    id: 2,
    role: 'CEO',
    title: 'Farm Equipment Purchase',
    type: 'Purchase Approval',
    department: 'Farm Ops',
    requestedBy: 'Amit Patil',
    amount: '₹12.50 L',
    submittedDate: '14 Sep 2026',
    requiredBy: '17 Sep 2026',
    status: 'Pending',
    reason: 'Purchase of new farm equipment.',
    description:
      'Approval is required for procurement of equipment required for farm operations.',
    documents: ['Equipment Quotation.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Amit Patil',
        date: '14 Sep 2026',
      },
    ],
  },
  {
    id: 3,
    role: 'CEO',
    title: 'Hotel Staff Recruitment',
    type: 'HR Approval',
    department: 'Hospitality',
    requestedBy: 'Priya Deshmukh',
    amount: '₹4.20 L',
    submittedDate: '13 Sep 2026',
    requiredBy: '16 Sep 2026',
    status: 'Approved',
    reason: 'Approval for additional hotel staff recruitment.',
    description:
      'Recruitment approval for increasing the hospitality team as per operational requirements.',
    documents: ['Recruitment Plan.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Priya Deshmukh',
        date: '13 Sep 2026',
      },
      {
        action: 'Approved',
        by: 'CEO',
        date: '14 Sep 2026',
      },
    ],
  },
  {
    id: 4,
    role: 'CEO',
    title: 'Marketing Campaign',
    type: 'Marketing Approval',
    department: 'Marketing',
    requestedBy: 'Sneha Kulkarni',
    amount: '₹8.00 L',
    submittedDate: '12 Sep 2026',
    requiredBy: '17 Sep 2026',
    status: 'Pending',
    reason: 'Approval required for upcoming marketing campaign.',
    description:
      'Marketing campaign budget approval for the upcoming promotional activities.',
    documents: ['Marketing Proposal.pdf', 'Campaign Plan.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Sneha Kulkarni',
        date: '12 Sep 2026',
      },
    ],
  },
  {
    id: 5,
    role: 'CEO',
    title: 'Finance Investment Proposal',
    type: 'Investment Approval',
    department: 'Finance',
    requestedBy: 'Vikram Joshi',
    amount: '₹25.00 L',
    submittedDate: '11 Sep 2026',
    requiredBy: '15 Sep 2026',
    status: 'Rejected',
    reason: 'Investment proposal requiring management decision.',
    description:
      'Investment proposal submitted for management review and approval.',
    documents: ['Investment Proposal.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Vikram Joshi',
        date: '11 Sep 2026',
      },
      {
        action: 'Rejected',
        by: 'CEO',
        date: '12 Sep 2026',
      },
    ],
  },

  // ================= MD APPROVALS =================
  {
    id: 6,
    role: 'MD',
    title: 'PO - Steel Structure',
    type: 'Purchase Order Approval',
    department: 'Procurement',
    requestedBy: 'Procurement Team',
    amount: '₹XX.XX Cr',
    submittedDate: '03 Sep 2026',
    requiredBy: '05 Sep 2026',
    status: 'Pending',
    reason: 'Purchase order approval for steel structure requirements.',
    description:
      'Approval required for the steel structure purchase order associated with project execution.',
    documents: ['Steel Structure PO.pdf', 'Vendor Quotation.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Procurement Team',
        date: '03 Sep 2026',
      },
    ],
  },
  {
    id: 7,
    role: 'MD',
    title: 'Contract - Landscaping',
    type: 'Contract Approval',
    department: 'Procurement',
    requestedBy: 'Procurement Team',
    amount: '₹8.75 Cr',
    submittedDate: '04 Sep 2026',
    requiredBy: '07 Sep 2026',
    status: 'Pending',
    reason: 'Landscaping contractor appointment.',
    description:
      'Management approval required for the landscaping contract and vendor appointment.',
    documents: ['Landscaping Contract.pdf', 'Vendor Proposal.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Procurement Team',
        date: '04 Sep 2026',
      },
    ],
  },
  {
    id: 8,
    role: 'MD',
    title: 'Budget - Interior Works',
    type: 'Budget Approval',
    department: 'Finance',
    requestedBy: 'Finance Department',
    amount: '₹14.50 Cr',
    submittedDate: '06 Sep 2026',
    requiredBy: '10 Sep 2026',
    status: 'Pending',
    reason: 'Budget approval for interior works.',
    description:
      'Approval required for the proposed interior works budget for the project.',
    documents: ['Interior Budget.pdf', 'Cost Estimate.pdf'],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Finance Department',
        date: '06 Sep 2026',
      },
    ],
  },
  {
    id: 9,
    role: 'MD',
    title: 'Project Phase Payment',
    type: 'Payment Approval',
    department: 'Finance',
    requestedBy: 'Finance Department',
    amount: '₹6.25 Cr',
    submittedDate: '08 Sep 2026',
    requiredBy: '12 Sep 2026',
    status: 'Pending',
    reason: 'Payment approval for completed project phase.',
    description:
      'Payment approval required for the completed project execution phase.',
    documents: [
      'Payment Certificate.pdf',
      'Work Completion Report.pdf',
    ],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Finance Department',
        date: '08 Sep 2026',
      },
    ],
  },
  {
    id: 10,
    role: 'MD',
    title: 'Vendor Finalization - Electrical Works',
    type: 'Vendor Approval',
    department: 'Procurement',
    requestedBy: 'Procurement Team',
    amount: '₹3.80 Cr',
    submittedDate: '09 Sep 2026',
    requiredBy: '15 Sep 2026',
    status: 'Pending',
    reason: 'Final approval required for electrical works vendor.',
    description:
      'Management approval required for finalizing the electrical works vendor.',
    documents: [
      'Vendor Comparison.pdf',
      'Electrical Proposal.pdf',
    ],
    approvalHistory: [
      {
        action: 'Submitted',
        by: 'Procurement Team',
        date: '09 Sep 2026',
      },
    ],
  },
]

const statusStyles = {
  Pending: {
    background: '#fff8ed',
    color: '#d97706',
    border: '#fed7aa',
    icon: Clock3,
  },
  Approved: {
    background: '#ecfdf5',
    color: '#059669',
    border: '#a7f3d0',
    icon: CheckCircle2,
  },
  Rejected: {
    background: '#fff1f2',
    color: '#dc2626',
    border: '#fecdd3',
    icon: XCircle,
  },
}

export default function Approvals() {
  const [approvals, setApprovals] = useState(initialApprovals)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState('All Status')
  const [departmentFilter, setDepartmentFilter] =
    useState('All Departments')
  const [roleFilter, setRoleFilter] = useState('MD')
  const [selectedApproval, setSelectedApproval] =
    useState(null)
  const [confirmation, setConfirmation] = useState(null)

  const departments = useMemo(() => {
    return [
      'All Departments',
      ...new Set(
        approvals.map((item) => item.department)
      ),
    ]
  }, [approvals])

  const filteredApprovals = useMemo(() => {
    return approvals.filter((approval) => {
      const searchText = search.toLowerCase().trim()

      const matchesSearch =
        approval.title
          .toLowerCase()
          .includes(searchText) ||
        approval.department
          .toLowerCase()
          .includes(searchText) ||
        approval.requestedBy
          .toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === 'All Status' ||
        approval.status === statusFilter

      const matchesDepartment =
        departmentFilter === 'All Departments' ||
        approval.department === departmentFilter

      const matchesRole =
        roleFilter === 'All Roles' ||
        approval.role === roleFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesRole
      )
    })
  }, [
    approvals,
    search,
    statusFilter,
    departmentFilter,
    roleFilter,
  ])

  const summary = useMemo(() => {
    return {
      pending: approvals.filter(
        (item) => item.status === 'Pending'
      ).length,
      approved: approvals.filter(
        (item) => item.status === 'Approved'
      ).length,
      rejected: approvals.filter(
        (item) => item.status === 'Rejected'
      ).length,
      total: approvals.length,
    }
  }, [approvals])

  const openConfirmation = (approval, status) => {
    setConfirmation({
      approval,
      status,
    })
  }

  const confirmAction = () => {
    if (!confirmation) return

    const { approval, status } = confirmation

    setApprovals((current) =>
      current.map((item) => {
        if (item.id !== approval.id) return item

        return {
          ...item,
          status,
          approvalHistory: [
            ...item.approvalHistory,
            {
              action: status,
              by: 'Management',
              date: new Date().toLocaleDateString(
                'en-GB',
                {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }
              ),
            },
          ],
        }
      })
    )

    setSelectedApproval(null)
    setConfirmation(null)
  }

  const getStatusBadge = (status) => {
    const config =
      statusStyles[status] ||
      statusStyles.Pending

    const Icon = config.icon

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '6px 9px',
          borderRadius: '999px',
          background: config.background,
          color: config.color,
          border: `1px solid ${config.border}`,
          fontSize: '10px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        <Icon size={12} />
        {status}
      </span>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        color: '#17201d',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* ================= HEADER ================= */}
      <div
        style={{
          marginBottom: '22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '20px',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '27px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: '#173b2b',
            }}
          >
            Approvals
          </h1>

          <p
            style={{
              margin: '7px 0 0',
              fontSize: '13px',
              color: '#718078',
            }}
          >
            Review and manage organizational approval
            requests
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: '#f0f7f3',
            border: '1px solid #d9e8e0',
            color: '#527064',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          <AlertCircle size={14} />
          Actions require confirmation
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(4, minmax(0, 1fr))',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        <SummaryCard
          title="Pending Approvals"
          value={summary.pending}
          subtitle="Awaiting review"
          icon={<Clock3 size={17} />}
        />

        <SummaryCard
          title="Approved"
          value={summary.approved}
          subtitle="Completed decisions"
          icon={<CheckCircle2 size={17} />}
        />

        <SummaryCard
          title="Rejected"
          value={summary.rejected}
          subtitle="Declined requests"
          icon={<XCircle size={17} />}
        />

        <SummaryCard
          title="Total Requests"
          value={summary.total}
          subtitle="Across all roles"
          icon={<FileText size={17} />}
        />
      </div>

      {/* ================= FILTERS ================= */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e4e9e6',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '20px',
          boxShadow:
            '0 4px 18px rgba(20, 55, 43, 0.04)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(280px, 1fr) 150px 150px 175px',
            gap: '10px',
          }}
        >
          {/* SEARCH */}
          <div
            style={{
              position: 'relative',
              minWidth: 0,
            }}
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9aa9a2',
              }}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search requests, departments or people..."
              style={{
                width: '100%',
                height: '44px',
                boxSizing: 'border-box',
                padding: '0 14px 0 39px',
                border: '1px solid #dce4df',
                borderRadius: '9px',
                outline: 'none',
                color: '#24332d',
                fontSize: '12px',
                background: '#fbfcfb',
              }}
            />
          </div>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          {/* ROLE */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option>All Roles</option>
            <option>MD</option>
            <option>CEO</option>
          </select>

          {/* DEPARTMENT */}
          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            style={selectStyle}
          >
            {departments.map((department) => (
              <option key={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= APPROVAL TABLE ================= */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e3e9e5',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow:
            '0 5px 22px rgba(19, 54, 42, 0.045)',
        }}
      >
        {/* TABLE TOP */}
        <div
          style={{
            padding: '16px 10px',
            borderBottom: '1px solid #e8ecea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#173b2b',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            <FileCheck2 size={16} />
            Approval Requests
          </div>

          <span
            style={{
              color: '#84918b',
              fontSize: '11px',
            }}
          >
            {filteredApprovals.length} requests
          </span>
        </div>

        {/* ================= STABLE TABLE ================= */}
        <table
          style={{
            width: '100%',
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
          }}
        >
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '6%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '22%' }} />
          </colgroup>

          <thead>
            <tr
              style={{
                background: '#f7f9f8',
                borderBottom:
                  '1px solid #e5ebe7',
              }}
            >
              {[
                'REQUEST',
                'ROLE',
                'DEPARTMENT',
                'REQUESTED BY',
                'AMOUNT',
                'SUBMITTED',
                'REQUIRED BY',
                'STATUS',
                'ACTION',
              ].map((heading) => (
                <th
                  key={heading}
                  style={{
                    padding: '11px 8px',
                    textAlign: 'left',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.35px',
                    color: '#687870',
                    whiteSpace: 'normal',
                    lineHeight: 1.25,
                  }}
                >
                  {heading === 'STATUS' ? (
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      {heading}
                    </div>
                  ) : heading === 'ACTION' ? (
                    <div
                      style={{
                        width: '68px',
                        marginLeft: '66px',
                        textAlign: 'center',
                      }}
                    >
                      {heading}
                    </div>
                  ) : (
                    heading
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredApprovals.map((approval) => (
              <tr
                key={approval.id}
                style={{
                  borderBottom:
                    '1px solid #edf0ee',
                }}
              >
                {/* REQUEST */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#17231e',
                      lineHeight: 1.35,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {approval.title}
                  </div>

                  <div
                    style={{
                      marginTop: '3px',
                      fontSize: '9px',
                      color: '#89968f',
                      lineHeight: 1.3,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {approval.type}
                  </div>
                </td>

                {/* ROLE */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 7px',
                      borderRadius: '6px',
                      background: '#edf5f1',
                      color: '#176247',
                      fontSize: '9px',
                      fontWeight: 800,
                    }}
                  >
                    {approval.role}
                  </span>
                </td>

                {/* DEPARTMENT */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                    fontSize: '9.5px',
                    color: '#52645b',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {approval.department}
                </td>

                {/* REQUESTED BY */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '9.5px',
                      color: '#52645b',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    <User
                      size={11}
                      color="#9aa8a1"
                      style={{
                        flexShrink: 0,
                      }}
                    />
                    {approval.requestedBy}
                  </div>
                </td>

                {/* AMOUNT */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#1c3329',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {approval.amount}
                </td>

                {/* SUBMITTED */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                    fontSize: '8.5px',
                    color: '#607169',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {approval.submittedDate}
                </td>

                {/* REQUIRED BY */}
                <td
                  style={{
                    padding: '12px 8px',
                    verticalAlign: 'middle',
                    fontSize: '8.5px',
                    color: '#607169',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {approval.requiredBy}
                </td>

                {/* STATUS */}
                <td
                  style={{
                    padding: '12px 8px',
                    paddingRight: '16px',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                  }}
                >
                  {getStatusBadge(
                    approval.status
                  )}
                </td>

                {/* ACTION */}
                <td
                  style={{
                    padding: '12px 8px',
                    paddingLeft: '18px',
                    verticalAlign: 'middle',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '6px',
                      flexWrap: 'nowrap',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {/* VIEW */}
                    <button
                      onClick={() =>
                        setSelectedApproval(
                          approval
                        )
                      }
                      style={{
                        width: '50px',
                        height: '32px',
                        padding: 0,
                        boxSizing: 'border-box',
                        border:
                          '1px solid #d9e2dd',
                        borderRadius: '7px',
                        background: '#ffffff',
                        color: '#40524a',
                        fontSize: '10px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      <Eye size={12} />
                      View
                    </button>

                    {/* APPROVE */}
                    {approval.status ===
                      'Pending' && (
                      <button
                        onClick={() =>
                          openConfirmation(
                            approval,
                            'Approved'
                          )
                        }
                        style={{
                          width: '68px',
                          height: '32px',
                          padding: 0,
                          boxSizing: 'border-box',
                          border:
                            '1px solid #c7e7da',
                          borderRadius: '7px',
                          background: '#f1faf6',
                          color: '#138463',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent:
                            'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2
                          size={12}
                        />
                        Approve
                      </button>
                    )}

                    {/* REJECT */}
                    {approval.status ===
                      'Pending' && (
                      <button
                        onClick={() =>
                          openConfirmation(
                            approval,
                            'Rejected'
                          )
                        }
                        style={{
                          width: '58px',
                          height: '32px',
                          padding: 0,
                          boxSizing: 'border-box',
                          border:
                            '1px solid #f0cccc',
                          borderRadius: '7px',
                          background: '#fff6f6',
                          color: '#d44343',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent:
                            'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        <XCircle size={12} />
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* NO RESULTS */}
        {filteredApprovals.length === 0 && (
          <div
            style={{
              padding: '50px 20px',
              textAlign: 'center',
              color: '#84918b',
            }}
          >
            <FileText
              size={30}
              style={{
                marginBottom: '10px',
                opacity: 0.5,
              }}
            />

            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              No approval requests found
            </div>

            <div
              style={{
                marginTop: '4px',
                fontSize: '11px',
              }}
            >
              Try changing your search or filters.
            </div>
          </div>
        )}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {selectedApproval && (
        <div style={modalOverlay}>
          <div
            style={{
              width:
                'min(700px, calc(100vw - 40px))',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow:
                '0 25px 70px rgba(0,0,0,0.22)',
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: '20px 22px',
                borderBottom:
                  '1px solid #e7ece9',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent:
                  'space-between',
                gap: '15px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#73827a',
                    marginBottom: '5px',
                  }}
                >
                  {selectedApproval.type}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '19px',
                    color: '#173b2b',
                  }}
                >
                  {selectedApproval.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedApproval(null)
                }
                style={closeButtonStyle}
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div
              style={{
                padding: '20px 22px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(2, minmax(0, 1fr))',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <InfoBox
                  icon={<User size={15} />}
                  label="Requested By"
                  value={
                    selectedApproval.requestedBy
                  }
                />

                <InfoBox
                  icon={<Building2 size={15} />}
                  label="Department"
                  value={
                    selectedApproval.department
                  }
                />

                <InfoBox
                  icon={<IndianRupee size={15} />}
                  label="Amount"
                  value={
                    selectedApproval.amount
                  }
                />

                <InfoBox
                  icon={<CalendarDays size={15} />}
                  label="Required By"
                  value={
                    selectedApproval.requiredBy
                  }
                />
              </div>

              {/* REASON */}
              <div style={sectionStyle}>
                <div style={sectionTitle}>
                  Reason
                </div>

                <p style={sectionText}>
                  {selectedApproval.reason}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div style={sectionStyle}>
                <div style={sectionTitle}>
                  Description
                </div>

                <p style={sectionText}>
                  {selectedApproval.description}
                </p>
              </div>

              {/* ================= DOCUMENTS ================= */}
              <div style={sectionStyle}>
                <div style={sectionTitle}>
                  Supporting Documents
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                  }}
                >
                  {selectedApproval.documents.map(
                    (document) => (
                      <button
                        key={document}
                        type="button"
                        onClick={() => {
                          window.open(
                            SUPPORTING_DOCUMENT_URL,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 11px',
                          border:
                            '1px solid #e2e9e5',
                          borderRadius: '8px',
                          background: '#fafcfb',
                          fontSize: '11px',
                          color: '#42534b',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition:
                            'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            '#f0f7f3'
                          e.currentTarget.style.borderColor =
                            '#c7ded3'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            '#fafcfb'
                          e.currentTarget.style.borderColor =
                            '#e2e9e5'
                        }}
                      >
                        <FileText
                          size={14}
                          color="#6d857a"
                        />

                        <span
                          style={{ flex: 1 }}
                        >
                          {document}
                        </span>

                        <span
                          style={{
                            fontSize: '9px',
                            color: '#477566',
                            fontWeight: 600,
                          }}
                        >
                          View
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* APPROVAL HISTORY */}
              <div style={sectionStyle}>
                <div style={sectionTitle}>
                  Approval History
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {selectedApproval.approvalHistory.map(
                    (history, index) => (
                      <div
                        key={`${history.action}-${index}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:
                            'space-between',
                          padding: '9px 11px',
                          background: '#f8faf9',
                          borderRadius: '8px',
                          fontSize: '10px',
                          gap: '10px',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: '#30443a',
                          }}
                        >
                          {history.action}
                        </span>

                        <span
                          style={{
                            color: '#819088',
                          }}
                        >
                          {history.by} •{' '}
                          {history.date}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CURRENT STATUS */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  paddingTop: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#596a62',
                  }}
                >
                  Current Status
                </span>

                {getStatusBadge(
                  selectedApproval.status
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: '15px 22px',
                borderTop:
                  '1px solid #e7ece9',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              {selectedApproval.status ===
                'Pending' && (
                <>
                  <button
                    onClick={() =>
                      openConfirmation(
                        selectedApproval,
                        'Rejected'
                      )
                    }
                    style={modalRejectButton}
                  >
                    <XCircle size={14} />
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      openConfirmation(
                        selectedApproval,
                        'Approved'
                      )
                    }
                    style={modalApproveButton}
                  >
                    <CheckCircle2 size={14} />
                    Approve
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setSelectedApproval(null)
                }
                style={modalCloseButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONFIRMATION MODAL ================= */}
      {confirmation && (
        <div style={modalOverlay}>
          <div
            style={{
              width:
                'min(430px, calc(100vw - 40px))',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow:
                '0 25px 70px rgba(0,0,0,0.22)',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                background:
                  confirmation.status ===
                  'Approved'
                    ? '#ecfdf5'
                    : '#fff1f2',
                color:
                  confirmation.status ===
                  'Approved'
                    ? '#059669'
                    : '#dc2626',
              }}
            >
              {confirmation.status ===
              'Approved' ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}
            </div>

            <h3
              style={{
                margin: 0,
                color: '#173b2b',
                fontSize: '18px',
              }}
            >
              Confirm{' '}
              {confirmation.status ===
              'Approved'
                ? 'Approval'
                : 'Rejection'}
            </h3>

            <p
              style={{
                margin: '10px 0 0',
                color: '#68776f',
                fontSize: '12px',
                lineHeight: 1.6,
              }}
            >
              Are you sure you want to{' '}
              {confirmation.status ===
              'Approved'
                ? 'approve'
                : 'reject'}{' '}
              <strong
                style={{ color: '#263a31' }}
              >
                {confirmation.approval.title}
              </strong>
              ?
            </p>

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() =>
                  setConfirmation(null)
                }
                style={modalCloseButton}
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                style={
                  confirmation.status ===
                  'Approved'
                    ? modalApproveButton
                    : modalRejectButton
                }
              >
                {confirmation.status ===
                'Approved' ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}

                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e4e9e6',
        borderRadius: '14px',
        padding: '17px',
        minWidth: 0,
        boxShadow:
          '0 4px 18px rgba(20, 55, 43, 0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: '#7b8982',
            fontSize: '10px',
            fontWeight: 600,
          }}
        >
          {title}
        </span>

        <span
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            background: '#eef6f2',
            color: '#477566',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </span>
      </div>

      <div
        style={{
          marginTop: '11px',
          fontSize: '24px',
          fontWeight: 750,
          color: '#173b2b',
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: '3px',
          fontSize: '9px',
          color: '#9aa59f',
        }}
      >
        {subtitle}
      </div>
    </div>
  )
}

/* ================= INFO BOX ================= */

function InfoBox({ icon, label, value }) {
  return (
    <div
      style={{
        padding: '12px',
        background: '#f8faf9',
        border: '1px solid #e7ece9',
        borderRadius: '9px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#829089',
          fontSize: '9px',
          marginBottom: '5px',
        }}
      >
        {icon}
        {label}
      </div>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#293d34',
          overflowWrap: 'anywhere',
        }}
      >
        {value}
      </div>
    </div>
  )
}

/* ================= STYLES ================= */

const selectStyle = {
  width: '100%',
  height: '44px',
  boxSizing: 'border-box',
  padding: '0 12px',
  border: '1px solid #dce4df',
  borderRadius: '9px',
  outline: 'none',
  background: '#fbfcfb',
  color: '#4c5d55',
  fontSize: '11px',
  cursor: 'pointer',
}

const modalOverlay = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  background: 'rgba(8, 27, 20, 0.48)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
}

const closeButtonStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  border: '1px solid #e0e7e3',
  background: '#ffffff',
  color: '#64746c',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const sectionStyle = {
  marginBottom: '18px',
}

const sectionTitle = {
  marginBottom: '7px',
  fontSize: '11px',
  fontWeight: 700,
  color: '#31463c',
}

const sectionText = {
  margin: 0,
  fontSize: '11px',
  lineHeight: 1.6,
  color: '#6c7b73',
}

const modalCloseButton = {
  height: '35px',
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #dce4df',
  background: '#ffffff',
  color: '#506158',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
}

const modalApproveButton = {
  height: '35px',
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #bfe5d7',
  background: '#effaf6',
  color: '#128463',
  fontSize: '11px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
}

const modalRejectButton = {
  height: '35px',
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #f1caca',
  background: '#fff5f5',
  color: '#d33f3f',
  fontSize: '11px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
}
