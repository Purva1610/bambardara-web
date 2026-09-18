import { useMemo, useState } from 'react'
import {
  ShoppingCart,
  Package,
  Truck,
  AlertTriangle,
  CircleCheck,
  Clock3,
  Search,
  X,
  ArrowUpRight,
  IndianRupee,
  User,
  CalendarDays,
  Check,
  Ban,
  Boxes,
  Factory,
  ClipboardCheck
} from 'lucide-react'

import {
  Card,
  StatusBadge,
  ProgressBar
} from '../components/Ui.jsx'


/* =========================================================
   PROCUREMENT DATA
========================================================= */

const initialPurchaseOrders = [
  {
    id: 'PO-2026-001',
    item: 'Cement & Construction Materials',
    project: 'Bambardara Resort & Hotel',
    vendor: 'BuildMax Materials',
    category: 'Construction',
    amount: 18500000,
    ordered: '05 Aug 2026',
    expected: '18 Sep 2026',
    progress: 78,
    materialStatus: 'AVAILABLE',
    status: 'IN PROGRESS',
    priority: 'HIGH',
    approval: 'APPROVED',
    delayed: false
  },
  {
    id: 'PO-2026-002',
    item: 'Luxury Villa Fixtures',
    project: 'Luxury Villas',
    vendor: 'Elite Home Solutions',
    category: 'Fixtures',
    amount: 12800000,
    ordered: '10 Aug 2026',
    expected: '25 Sep 2026',
    progress: 55,
    materialStatus: 'PARTIAL',
    status: 'IN PROGRESS',
    priority: 'HIGH',
    approval: 'APPROVED',
    delayed: false
  },
  {
    id: 'PO-2026-003',
    item: 'Adventure Equipment',
    project: 'Adventure Zone',
    vendor: 'Adventure Gear India',
    category: 'Equipment',
    amount: 9200000,
    ordered: '20 Jul 2026',
    expected: '05 Sep 2026',
    progress: 32,
    materialStatus: 'DELAYED',
    status: 'DELAYED',
    priority: 'CRITICAL',
    approval: 'APPROVED',
    delayed: true
  },
  {
    id: 'PO-2026-004',
    item: 'Solar Panels & Energy Systems',
    project: 'Eco Village',
    vendor: 'Green Energy Systems',
    category: 'Energy',
    amount: 7600000,
    ordered: '15 Jul 2026',
    expected: '30 Aug 2026',
    progress: 100,
    materialStatus: 'AVAILABLE',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    approval: 'APPROVED',
    delayed: false
  },
  {
    id: 'PO-2026-005',
    item: 'Wellness Equipment',
    project: 'Wellness Center',
    vendor: 'Wellness Pro India',
    category: 'Equipment',
    amount: 6400000,
    ordered: '22 Aug 2026',
    expected: '30 Sep 2026',
    progress: 42,
    materialStatus: 'PARTIAL',
    status: 'IN PROGRESS',
    priority: 'MEDIUM',
    approval: 'APPROVED',
    delayed: false
  },
  {
    id: 'PO-2026-006',
    item: 'Landscaping Materials',
    project: 'Bambardara Resort & Hotel',
    vendor: 'NatureScape Suppliers',
    category: 'Landscaping',
    amount: 4800000,
    ordered: '28 Aug 2026',
    expected: '15 Sep 2026',
    progress: 25,
    materialStatus: 'PENDING',
    status: 'PENDING',
    priority: 'MEDIUM',
    approval: 'PENDING',
    delayed: false
  },
  {
    id: 'PO-2026-007',
    item: 'Farm Development Equipment',
    project: 'Farming',
    vendor: 'AgriTech Solutions',
    category: 'Agriculture',
    amount: 5200000,
    ordered: '02 Sep 2026',
    expected: '28 Sep 2026',
    progress: 18,
    materialStatus: 'PENDING',
    status: 'PENDING',
    priority: 'HIGH',
    approval: 'PENDING',
    delayed: false
  },
  {
    id: 'PO-2026-008',
    item: 'Electrical & Lighting Systems',
    project: 'Luxury Villas',
    vendor: 'BrightLine Electricals',
    category: 'Electrical',
    amount: 11200000,
    ordered: '01 Sep 2026',
    expected: '22 Sep 2026',
    progress: 12,
    materialStatus: 'PENDING',
    status: 'PENDING',
    priority: 'HIGH',
    approval: 'PENDING',
    delayed: false
  }
]


/* =========================================================
   VENDOR DATA
========================================================= */

const vendors = [
  {
    name: 'Green Energy Systems',
    short: 'GES',
    performance: 96,
    delivery: '7 / 7',
    status: 'EXCELLENT'
  },
  {
    name: 'BuildMax Materials',
    short: 'BMM',
    performance: 92,
    delivery: '11 / 12',
    status: 'GOOD'
  },
  {
    name: 'Elite Home Solutions',
    short: 'EHS',
    performance: 89,
    delivery: '8 / 9',
    status: 'GOOD'
  },
  {
    name: 'Wellness Pro India',
    short: 'WPI',
    performance: 84,
    delivery: '5 / 6',
    status: 'GOOD'
  },
  {
    name: 'Adventure Gear India',
    short: 'AGI',
    performance: 63,
    delivery: '5 / 8',
    status: 'POOR'
  }
]


/* =========================================================
   HELPERS
========================================================= */

const formatMoney = value => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`
  }

  return `₹${value.toLocaleString('en-IN')}`
}


const getStatusTone = status => {
  if (
    status === 'COMPLETED' ||
    status === 'APPROVED' ||
    status === 'AVAILABLE' ||
    status === 'GOOD' ||
    status === 'EXCELLENT'
  ) {
    return 'good'
  }

  if (
    status === 'IN PROGRESS' ||
    status === 'PENDING' ||
    status === 'PARTIAL'
  ) {
    return 'warn'
  }

  return 'critical'
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Procurement() {

  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedPO, setSelectedPO] = useState(null)


  /* =======================================================
     FILTERED ORDERS
  ======================================================= */

  const filteredOrders = useMemo(() => {

    let result = [...purchaseOrders]

    if (filter !== 'ALL') {
      result = result.filter(order => order.status === filter)
    }

    if (search.trim()) {
      const query = search.toLowerCase()

      result = result.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.item.toLowerCase().includes(query) ||
        order.project.toLowerCase().includes(query) ||
        order.vendor.toLowerCase().includes(query)
      )
    }

    return result

  }, [purchaseOrders, filter, search])


  /* =======================================================
     CALCULATIONS
  ======================================================= */

  const totalOrders = purchaseOrders.length

  const completedOrders =
    purchaseOrders.filter(order => order.status === 'COMPLETED').length

  const inProgressOrders =
    purchaseOrders.filter(order => order.status === 'IN PROGRESS').length

  const pendingOrders =
    purchaseOrders.filter(order => order.status === 'PENDING').length

  const delayedOrders =
    purchaseOrders.filter(order => order.status === 'DELAYED').length

  const pendingApprovals =
    purchaseOrders.filter(order => order.approval === 'PENDING').length

  const totalProcurementValue =
    purchaseOrders.reduce((sum, order) => sum + order.amount, 0)

  const averageProgress = Math.round(
    purchaseOrders.reduce((sum, order) => sum + order.progress, 0) /
    purchaseOrders.length
  )

  const highValueOrders = purchaseOrders
    .filter(order => order.amount >= 10000000)
    .sort((a, b) => b.amount - a.amount)

  const materialAvailable =
    purchaseOrders.filter(
      order => order.materialStatus === 'AVAILABLE'
    ).length

  const materialPartial =
    purchaseOrders.filter(
      order => order.materialStatus === 'PARTIAL'
    ).length

  const materialPending =
    purchaseOrders.filter(
      order => order.materialStatus === 'PENDING'
    ).length

  const materialDelayed =
    purchaseOrders.filter(
      order => order.materialStatus === 'DELAYED'
    ).length

  const rankedVendors =
    [...vendors].sort((a, b) => b.performance - a.performance)


  /* =======================================================
     APPROVAL ACTIONS
  ======================================================= */

  const handleApprove = id => {

    setPurchaseOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, approval: 'APPROVED' }
          : order
      )
    )

    setSelectedPO(prev =>
      prev && prev.id === id
        ? { ...prev, approval: 'APPROVED' }
        : prev
    )
  }


  const handleReject = id => {

    setPurchaseOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, approval: 'REJECTED' }
          : order
      )
    )

    setSelectedPO(prev =>
      prev && prev.id === id
        ? { ...prev, approval: 'REJECTED' }
        : prev
    )
  }


  return (

    <section className="pb-8">

      {/* =================================================
          ANIMATIONS + FONTS
      ================================================= */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .proc-serif {
          font-family: 'Fraunces', serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .proc-fade {
          animation: fadeUp 0.45s ease-out both;
        }

        .proc-scale {
          animation: scaleIn 0.55s ease-out both;
        }

        .proc-slide {
          animation: slideIn 0.45s ease-out both;
        }

        .proc-modal {
          animation: modalIn 0.25s ease-out both;
        }
      `}</style>


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">

        <div>

          <div className="flex items-center gap-2.5 mb-2">

            <div
              className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #1F4A3A, #173B2B)'
              }}
            >
              <ShoppingCart size={17} />
            </div>

            <span
              className="text-[10px] font-semibold"
              style={{ color: '#B48718' }}
            >
              MD Executive Monitoring
            </span>

          </div>

          <h1 className="proc-serif text-[26px] leading-tight m-0">
            Procurement Command Center
          </h1>

          <p className="text-[12px] text-muted mt-1.5 mb-0 max-w-lg">
            Monitor procurement execution, material availability, vendors and high-value purchasing decisions.
          </p>

        </div>


        <div className="flex items-center gap-2">

          <div className="relative">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search procurement..."
              className="w-[210px] pl-9 pr-3 py-2.5 rounded-full bg-white border border-[#DDE4DE] text-[11px] outline-none focus:border-[#173B2B]"
            />

          </div>


          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-white border border-[#DDE4DE] rounded-full px-4 py-2.5 text-[11px] outline-none"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="DELAYED">Delayed</option>
            <option value="COMPLETED">Completed</option>
          </select>

        </div>

      </div>


      {/* =================================================
          EXECUTIVE SNAPSHOT
      ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 mb-6">

        <div
          className="proc-scale rounded-[22px] p-6 text-white relative overflow-hidden flex items-center gap-5"
          style={{
            background:
              'linear-gradient(135deg, #1F4A3A 0%, #12352A 100%)'
          }}
        >

          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -left-8 -bottom-10 w-28 h-28 rounded-full bg-white/5" />

          <RadialGauge value={averageProgress} />

          <div className="relative z-10">

            <p className="text-[9px] uppercase tracking-[0.14em] text-white/60 m-0">
              Procurement Health
            </p>

            <p className="proc-serif text-[13px] text-white/80 mt-2 mb-0 max-w-[160px]">
              Overall execution across {totalOrders} active purchase orders.
            </p>

          </div>

        </div>


        <SnapshotCard
          label="Procurement Value"
          value={formatMoney(totalProcurementValue)}
          text={`${totalOrders} purchase orders`}
          icon={<IndianRupee size={18} />}
        />


        <SnapshotCard
          label="Pending Procurement"
          value={pendingOrders}
          text="Orders awaiting execution"
          icon={<Clock3 size={18} />}
          warning
        />


        <SnapshotCard
          label="MD Approvals"
          value={pendingApprovals}
          text="Items requiring review"
          icon={<ClipboardCheck size={18} />}
          warning
        />

      </div>


      {/* =================================================
          PROCUREMENT PIPELINE
      ================================================= */}

      <Card className="mb-6">

        <div className="flex items-start justify-between mb-8">

          <div>

            <h3 className="text-[14px] font-semibold m-0">
              Procurement Pipeline
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Purchase order movement from procurement request to completion
            </p>

          </div>

          <Boxes size={18} className="text-[#173B2B]" />

        </div>


        <PipelineTimeline
          steps={[
            {
              label: 'Pending',
              value: pendingOrders,
              text: 'Awaiting procurement',
              tone: 'muted'
            },
            {
              label: 'In Progress',
              value: inProgressOrders,
              text: 'Orders being processed',
              tone: 'gold'
            },
            {
              label: 'Delayed',
              value: delayedOrders,
              text: 'Needs intervention',
              tone: 'rust'
            },
            {
              label: 'Completed',
              value: completedOrders,
              text: 'Successfully delivered',
              tone: 'forest'
            }
          ]}
        />

      </Card>


      {/* =================================================
          MATERIAL + VENDOR SECTION
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-5 mb-6">


        {/* =================================================
            MATERIAL AVAILABILITY
            NEW DONUT GRAPH
        ================================================= */}

        <Card>

          <div className="flex items-start justify-between mb-6">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Material Availability
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Current supply position
              </p>

            </div>

            <Package size={18} className="text-[#173B2B]" />

          </div>


          <MaterialDonutChart
            available={materialAvailable}
            partial={materialPartial}
            pending={materialPending}
            delayed={materialDelayed}
          />


          <div className="space-y-3 mt-6 pt-5 border-t border-[#EEF1ED]">

            {purchaseOrders
              .filter(order => order.materialStatus !== 'AVAILABLE')
              .slice(0, 4)
              .map((order, index) => (

                <div
                  key={order.id}
                  className="proc-slide flex items-center justify-between gap-3 py-2.5 border-b border-[#EEF1ED] last:border-0"
                  style={{
                    animationDelay: `${index * 70}ms`
                  }}
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-8 h-8 rounded-lg bg-[#F5F7F4] flex items-center justify-center shrink-0">

                      <Package
                        size={14}
                        className="text-[#173B2B]"
                      />

                    </div>


                    <div className="min-w-0">

                      <p className="text-[10px] font-semibold truncate m-0">
                        {order.item}
                      </p>

                      <p className="text-[9px] text-muted truncate mt-1 m-0">
                        {order.project}
                      </p>

                    </div>

                  </div>


                  <StatusBadge
                    tone={getStatusTone(order.materialStatus)}
                  >
                    {order.materialStatus}
                  </StatusBadge>

                </div>

              ))}

          </div>

        </Card>


        {/* =================================================
            VENDOR PERFORMANCE
            NEW HORIZONTAL BAR GRAPH
        ================================================= */}

        <Card>

          <div className="flex items-start justify-between mb-6">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Vendor Performance
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Supplier reliability and delivery performance
              </p>

            </div>

            <Factory size={18} className="text-[#173B2B]" />

          </div>


          <VendorPerformanceChart vendors={rankedVendors} />

        </Card>

      </div>


      {/* =================================================
          HIGH VALUE PROCUREMENT
      ================================================= */}

      <div className="mb-6">

        <div className="flex items-end justify-between mb-4">

          <div>

            <h3 className="text-[15px] font-semibold m-0">
              High-Value Procurement
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Major purchasing commitments requiring executive visibility
            </p>

          </div>

          <span className="text-[10px] text-muted">
            {highValueOrders.length} major items
          </span>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {highValueOrders.slice(0, 3).map((order, index) => {

            const ribbon =
              order.priority === 'CRITICAL'
                ? '#B95C50'
                : order.priority === 'HIGH'
                ? '#D6A92F'
                : '#173B2B'

            return (

              <div
                key={order.id}
                className="proc-fade bg-white border border-[#E7EBE6] rounded-2xl overflow-hidden hover:shadow-md transition"
                style={{
                  animationDelay: `${index * 90}ms`
                }}
              >

                <div
                  className="h-[5px]"
                  style={{ background: ribbon }}
                />

                <div className="p-5">

                  <div className="flex items-start justify-between">

                    <div className="w-10 h-10 rounded-xl bg-[#EEF2ED] flex items-center justify-center">

                      <IndianRupee
                        size={17}
                        className="text-[#173B2B]"
                      />

                    </div>


                    <span
                      className={`text-[8px] font-semibold px-2 py-1 rounded-full ${
                        order.priority === 'CRITICAL'
                          ? 'bg-[#F9EEEE] text-[#B95C50]'
                          : order.priority === 'HIGH'
                          ? 'bg-[#F8F5ED] text-[#B48718]'
                          : 'bg-[#EEF2ED] text-[#173B2B]'
                      }`}
                    >
                      {order.priority}
                    </span>

                  </div>


                  <p className="text-[10px] text-muted uppercase tracking-wide mt-4 mb-1">
                    {order.id}
                  </p>

                  <h4 className="text-[13px] font-semibold m-0 leading-snug">
                    {order.item}
                  </h4>

                  <p className="text-[10px] text-muted mt-1.5 mb-0">
                    {order.project}
                  </p>


                  <div className="flex items-end justify-between mt-5">

                    <div>

                      <p className="text-[9px] text-muted m-0">
                        Procurement Value
                      </p>

                      <p className="proc-serif text-[20px] mt-1 mb-0 text-[#173B2B]">
                        {formatMoney(order.amount)}
                      </p>

                    </div>


                    <button
                      onClick={() => setSelectedPO(order)}
                      className="w-8 h-8 rounded-full bg-[#F1F3F0] flex items-center justify-center hover:bg-[#E7EBE6] transition"
                    >
                      <ArrowUpRight size={14} />
                    </button>

                  </div>

                </div>

              </div>

            )

          })}

        </div>

      </div>


      {/* =================================================
          DELAYED MATERIALS
      ================================================= */}

      {delayedOrders > 0 && (

        <div className="mb-6">

          <div
            className="rounded-2xl border border-[#EED4D1] p-5"
            style={{
              background:
                'linear-gradient(135deg, #FBF2F0, #F9EEEE)'
            }}
          >

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-xl bg-[#F2D8D5] text-[#B95C50] flex items-center justify-center shrink-0">

                <AlertTriangle size={18} />

              </div>


              <div className="flex-1">

                <div className="flex items-center justify-between gap-3">

                  <div>

                    <h3 className="text-[13px] font-semibold m-0 text-[#5F302B]">
                      Delayed Materials
                    </h3>

                    <p className="text-[10px] text-[#7D5550] mt-1 m-0">
                      Procurement delays requiring management attention
                    </p>

                  </div>

                  <span className="proc-serif text-[24px] text-[#B95C50]">
                    {delayedOrders}
                  </span>

                </div>


                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">

                  {purchaseOrders
                    .filter(order => order.delayed)
                    .map(order => (

                      <div
                        key={order.id}
                        className="bg-white/80 border border-[#EED4D1] rounded-xl p-3.5"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-[11px] font-semibold m-0">
                              {order.item}
                            </p>

                            <p className="text-[9px] text-muted mt-1 m-0">
                              {order.project}
                            </p>

                          </div>

                          <span className="text-[10px] font-semibold text-[#B95C50]">
                            {order.progress}%
                          </span>

                        </div>


                        <div className="flex items-center justify-between mt-3">

                          <span className="text-[9px] text-muted">
                            Expected {order.expected}
                          </span>

                          <button
                            onClick={() => setSelectedPO(order)}
                            className="text-[9px] font-semibold text-[#B95C50] flex items-center gap-1"
                          >
                            Review
                            <ArrowUpRight size={11} />
                          </button>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          MD APPROVAL QUEUE
      ================================================= */}

      <Card className="mb-6">

        <div className="flex items-start justify-between mb-5">

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-[14px] font-semibold m-0">
                MD Approval Queue
              </h3>

              {pendingApprovals > 0 && (

                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#173B2B] text-white text-[9px] flex items-center justify-center">
                  {pendingApprovals}
                </span>

              )}

            </div>

            <p className="text-[11px] text-muted mt-1 m-0">
              Important procurement decisions awaiting authorization
            </p>

          </div>

          <ClipboardCheck size={18} className="text-[#173B2B]" />

        </div>


        <div className="space-y-2">

          {purchaseOrders
            .filter(order => order.approval === 'PENDING')
            .map((order, index) => (

              <div
                key={order.id}
                className="proc-fade border border-[#E7EBE6] rounded-2xl px-4 py-3.5 hover:border-[#D6DFD8] transition"
                style={{
                  animationDelay: `${index * 70}ms`
                }}
              >

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                  <div className="flex items-center gap-3 flex-1 min-w-0">

                    <div className="w-9 h-9 rounded-lg bg-[#F8F5ED] flex items-center justify-center shrink-0">

                      <ClipboardCheck
                        size={15}
                        className="text-[#B48718]"
                      />

                    </div>


                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <p className="text-[10px] text-muted m-0">
                          {order.id}
                        </p>

                        <span className="text-[#DDE4DE]">
                          •
                        </span>

                        <span className="text-[9px] text-[#B48718] font-semibold">
                          {order.priority}
                        </span>

                      </div>

                      <p className="text-[11px] font-semibold mt-1 m-0 truncate">
                        {order.item}
                      </p>

                      <p className="text-[9px] text-muted mt-1 m-0 truncate">
                        {order.project} • {order.vendor}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-5">

                    <div className="text-right">

                      <p className="text-[8px] uppercase text-muted m-0">
                        Value
                      </p>

                      <p className="text-[11px] font-semibold text-[#173B2B] mt-1 m-0">
                        {formatMoney(order.amount)}
                      </p>

                    </div>


                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => handleApprove(order.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#173B2B] text-white text-[9px] font-medium hover:opacity-90 transition"
                      >
                        <Check size={12} />
                        Approve
                      </button>


                      <button
                        onClick={() => handleReject(order.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F9EEEE] text-[#B95C50] border border-[#EED4D1] text-[9px] font-medium hover:opacity-90 transition"
                      >
                        <Ban size={12} />
                        Reject
                      </button>


                      <button
                        onClick={() => setSelectedPO(order)}
                        className="w-8 h-8 rounded-full bg-[#F1F3F0] flex items-center justify-center hover:bg-[#E7EBE6] transition"
                      >
                        <ArrowUpRight size={13} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}


          {pendingApprovals === 0 && (

            <div className="py-8 text-center">

              <CircleCheck
                size={26}
                className="mx-auto text-[#173B2B]"
              />

              <p className="text-[12px] font-semibold mt-3 mb-0">
                Approval queue is clear
              </p>

              <p className="text-[10px] text-muted mt-1">
                No procurement items currently require MD approval.
              </p>

            </div>

          )}

        </div>

      </Card>


      {/* =================================================
          PURCHASE ORDER REGISTER
      ================================================= */}

      <div className="flex items-end justify-between mb-4">

        <div>

          <h3 className="text-[15px] font-semibold m-0">
            Purchase Order Register
          </h3>

          <p className="text-[11px] text-muted mt-1 m-0">
            Complete procurement record for executive monitoring
          </p>

        </div>

        <span className="text-[10px] text-muted">
          {filteredOrders.length} records
        </span>

      </div>


      <Card className="overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>

              <tr className="border-b border-[#E7EBE6]">

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  PO / Material
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Project
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Vendor
                </th>

                <th className="text-right text-[9px] uppercase text-muted font-medium py-3">
                  Value
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Progress
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Material
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Status
                </th>

                <th className="text-right text-[9px] uppercase text-muted font-medium py-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredOrders.map((order, index) => (

                <tr
                  key={order.id}
                  className="proc-fade border-b border-[#EEF1ED] last:border-0 hover:bg-[#FAFBF8] transition-colors"
                  style={{
                    animationDelay: `${index * 45}ms`
                  }}
                >

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center shrink-0">

                        <ShoppingCart
                          size={13}
                          className="text-[#173B2B]"
                        />

                      </div>


                      <div className="min-w-0">

                        <p className="text-[10px] font-semibold m-0">
                          {order.id}
                        </p>

                        <p className="text-[9px] text-muted mt-1 truncate max-w-[220px] m-0">
                          {order.item}
                        </p>

                      </div>

                    </div>

                  </td>


                  <td className="py-4">

                    <span className="text-[10px]">
                      {order.project}
                    </span>

                  </td>


                  <td className="py-4">

                    <div className="flex items-center gap-1.5">

                      <User
                        size={11}
                        className="text-muted"
                      />

                      <span className="text-[10px]">
                        {order.vendor}
                      </span>

                    </div>

                  </td>


                  <td className="py-4 text-right">

                    <span className="text-[10px] font-semibold text-[#173B2B]">
                      {formatMoney(order.amount)}
                    </span>

                  </td>


                  <td className="py-4">

                    <div className="w-24">

                      <div className="flex items-center justify-between mb-1">

                        <span className="text-[8px] text-muted">
                          Progress
                        </span>

                        <span className="text-[8px] font-semibold">
                          {order.progress}%
                        </span>

                      </div>

                      <ProgressBar value={order.progress} />

                    </div>

                  </td>


                  <td className="py-4">

                    <StatusBadge
                      tone={getStatusTone(order.materialStatus)}
                    >
                      {order.materialStatus}
                    </StatusBadge>

                  </td>


                  <td className="py-4">

                    <StatusBadge
                      tone={getStatusTone(order.status)}
                    >
                      {order.status}
                    </StatusBadge>

                  </td>


                  <td className="py-4 text-right">

                    <button
                      onClick={() => setSelectedPO(order)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#173B2B] text-white text-[9px] hover:opacity-90 transition"
                    >
                      View
                      <ArrowUpRight size={10} />
                    </button>

                  </td>

                </tr>

              ))}


              {filteredOrders.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="py-10 text-center"
                  >

                    <Search
                      size={24}
                      className="mx-auto text-muted"
                    />

                    <p className="text-[12px] font-semibold mt-3 mb-0">
                      No procurement records found
                    </p>

                    <p className="text-[10px] text-muted mt-1">
                      Try another search or filter.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </Card>


      {/* =================================================
          DETAIL MODAL
      ================================================= */}

      {selectedPO && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

          <div className="proc-modal bg-white rounded-[24px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

            <div className="px-6 py-5 border-b border-[#E7EBE6]">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4">

                  <div
                    className="w-11 h-11 rounded-2xl text-white flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, #1F4A3A, #173B2B)'
                    }}
                  >
                    <ShoppingCart size={18} />
                  </div>


                  <div>

                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted m-0">
                      Purchase Order
                    </p>

                    <h2 className="proc-serif text-[21px] mt-1 mb-1">
                      {selectedPO.id}
                    </h2>

                    <p className="text-[11px] text-muted m-0">
                      {selectedPO.item}
                    </p>

                  </div>

                </div>


                <button
                  onClick={() => setSelectedPO(null)}
                  className="w-8 h-8 rounded-full bg-[#F1F3F0] hover:bg-[#E7EBE6] flex items-center justify-center"
                >
                  <X size={16} />
                </button>

              </div>

            </div>


            <div className="p-6">

              <div className="flex flex-wrap gap-2 mb-5">

                <StatusBadge tone={getStatusTone(selectedPO.status)}>
                  {selectedPO.status}
                </StatusBadge>

                <StatusBadge tone={getStatusTone(selectedPO.materialStatus)}>
                  {selectedPO.materialStatus}
                </StatusBadge>

                <StatusBadge tone={getStatusTone(selectedPO.approval)}>
                  {selectedPO.approval}
                </StatusBadge>

              </div>


              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <ModalInfo
                  label="Value"
                  value={formatMoney(selectedPO.amount)}
                />

                <ModalInfo
                  label="Progress"
                  value={`${selectedPO.progress}%`}
                />

                <ModalInfo
                  label="Priority"
                  value={selectedPO.priority}
                />

                <ModalInfo
                  label="Project"
                  value={selectedPO.project}
                />

              </div>


              <div className="mt-6 border border-[#E7EBE6] rounded-2xl p-5">

                <div className="flex items-center justify-between mb-3">

                  <div>

                    <h3 className="text-[13px] font-semibold m-0">
                      Procurement Progress
                    </h3>

                    <p className="text-[10px] text-muted mt-1 m-0">
                      Current purchase order execution
                    </p>

                  </div>

                  <span className="proc-serif text-[20px] text-[#173B2B]">
                    {selectedPO.progress}%
                  </span>

                </div>

                <ProgressBar value={selectedPO.progress} />

              </div>


              <div className="mt-6">

                <h3 className="text-[13px] font-semibold m-0">
                  Procurement Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">

                  <DetailItem
                    icon={<Package size={14} />}
                    label="Material"
                    value={selectedPO.item}
                  />

                  <DetailItem
                    icon={<Truck size={14} />}
                    label="Vendor"
                    value={selectedPO.vendor}
                  />

                  <DetailItem
                    icon={<CalendarDays size={14} />}
                    label="Order Date"
                    value={selectedPO.ordered}
                  />

                  <DetailItem
                    icon={<CalendarDays size={14} />}
                    label="Expected Delivery"
                    value={selectedPO.expected}
                  />

                  <DetailItem
                    icon={<IndianRupee size={14} />}
                    label="Procurement Value"
                    value={formatMoney(selectedPO.amount)}
                  />

                  <DetailItem
                    icon={<User size={14} />}
                    label="Project"
                    value={selectedPO.project}
                  />

                </div>

              </div>


              {selectedPO.approval === 'PENDING' && (

                <div className="mt-6 rounded-2xl border border-[#EADDB8] bg-[#F8F5ED] p-5">

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#EFE4BE] text-[#B48718] flex items-center justify-center shrink-0">

                      <ClipboardCheck size={16} />

                    </div>


                    <div className="flex-1">

                      <h3 className="text-[12px] font-semibold m-0">
                        MD Approval Required
                      </h3>

                      <p className="text-[10px] text-muted mt-1 mb-0">
                        This procurement item is awaiting executive authorization.
                      </p>


                      <div className="flex gap-2 mt-4">

                        <button
                          onClick={() =>
                            handleApprove(selectedPO.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#173B2B] text-white text-[10px] font-medium"
                        >
                          <Check size={13} />
                          Approve
                        </button>


                        <button
                          onClick={() =>
                            handleReject(selectedPO.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#B95C50] border border-[#EED4D1] text-[10px] font-medium"
                        >
                          <Ban size={13} />
                          Reject
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )}


              {selectedPO.approval === 'APPROVED' && (

                <div className="mt-6 rounded-2xl border border-[#DDE4DE] bg-[#EEF2ED] p-4 flex items-center gap-3">

                  <CircleCheck
                    size={17}
                    className="text-[#173B2B]"
                  />

                  <div>

                    <p className="text-[11px] font-semibold m-0">
                      Procurement Approved
                    </p>

                    <p className="text-[9px] text-muted mt-1 m-0">
                      This procurement item has been approved for execution.
                    </p>

                  </div>

                </div>

              )}


              {selectedPO.approval === 'REJECTED' && (

                <div className="mt-6 rounded-2xl border border-[#EED4D1] bg-[#F9EEEE] p-4 flex items-center gap-3">

                  <Ban
                    size={17}
                    className="text-[#B95C50]"
                  />

                  <div>

                    <p className="text-[11px] font-semibold m-0">
                      Procurement Rejected
                    </p>

                    <p className="text-[9px] text-muted mt-1 m-0">
                      This procurement item has been rejected by MD.
                    </p>

                  </div>

                </div>

              )}


              <div className="mt-6 pt-4 border-t border-[#E7EBE6] flex items-center justify-between">

                <p className="text-[9px] text-muted m-0">
                  MD monitoring view • Procurement decisions are handled at executive level.
                </p>

                <button
                  onClick={() => setSelectedPO(null)}
                  className="px-4 py-2 rounded-full bg-[#173B2B] text-white text-[10px] font-medium"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}


/* =========================================================
   RADIAL GAUGE
========================================================= */

function RadialGauge({
  value,
  size = 90,
  stroke = 8
}) {

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (

    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size
      }}
    >

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#fff"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 1s ease'
          }}
        />

      </svg>


      <div className="absolute inset-0 flex items-center justify-center">

        <span className="proc-serif text-[26px] text-white leading-none">
          {value}%
        </span>

      </div>

    </div>

  )
}


/* =========================================================
   NEW MATERIAL DONUT CHART
========================================================= */

function MaterialDonutChart({
  available,
  partial,
  pending,
  delayed
}) {

  const total =
    available +
    partial +
    pending +
    delayed

  const safeTotal = total || 1

  const segments = [
    {
      label: 'Available',
      value: available,
      color: '#173B2B'
    },
    {
      label: 'Partial',
      value: partial,
      color: '#D6A92F'
    },
    {
      label: 'Pending',
      value: pending,
      color: '#9CA99F'
    },
    {
      label: 'Delayed',
      value: delayed,
      color: '#B95C50'
    }
  ]


  const radius = 48
  const circumference = 2 * Math.PI * radius

  let accumulated = 0


  return (

    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-6">

      {/* DONUT */}

      <div className="relative w-[150px] h-[150px] mx-auto">

        <svg
          width="150"
          height="150"
          viewBox="0 0 120 120"
          className="-rotate-90"
        >

          {/* background ring */}

          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#EEF1ED"
            strokeWidth="13"
          />


          {segments.map(segment => {

            const percentage =
              segment.value / safeTotal

            const dash =
              percentage * circumference

            const gap = 2

            const dashArray = `${Math.max(
              dash - gap,
              0
            )} ${circumference - Math.max(
              dash - gap,
              0
            )}`

            const dashOffset =
              -accumulated * circumference

            accumulated += percentage

            return (

              <circle
                key={segment.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="13"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{
                  transition:
                    'stroke-dasharray 0.7s ease, stroke-dashoffset 0.7s ease'
                }}
              />

            )
          })}

        </svg>


        {/* center */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span className="proc-serif text-[27px] text-[#173B2B] leading-none">
            {total}
          </span>

          <span className="text-[8px] uppercase tracking-wide text-muted mt-1">
            Orders
          </span>

        </div>

      </div>


      {/* LEGEND */}

      <div className="space-y-3">

        {segments.map(segment => {

          const percentage = Math.round(
            (segment.value / safeTotal) * 100
          )

          return (

            <div
              key={segment.label}
              className="flex items-center justify-between gap-3"
            >

              <div className="flex items-center gap-2.5">

                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    background: segment.color
                  }}
                />

                <span className="text-[10px] text-[#4B554F]">
                  {segment.label}
                </span>

              </div>


              <div className="flex items-center gap-2">

                <span className="text-[11px] font-semibold">
                  {segment.value}
                </span>

                <span className="text-[8px] text-muted w-[28px] text-right">
                  {percentage}%
                </span>

              </div>

            </div>

          )
        })}

      </div>

    </div>

  )
}


/* =========================================================
   VENDOR PERFORMANCE BAR CHART
========================================================= */

function VendorPerformanceChart({
  vendors
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[8px] uppercase tracking-[0.12em] text-muted">
          Performance Score
        </span>

        <span className="text-[8px] text-muted">
          0 — 100%
        </span>
      </div>

      <div className="h-[260px] flex items-end gap-3 sm:gap-5 px-1">
        {vendors.map((vendor, index) => {
          const height = `${vendor.performance}%`

          const barBackground =
            vendor.performance >= 90
              ? 'linear-gradient(180deg, #2D6752, #173B2B)'
              : vendor.performance >= 75
              ? 'linear-gradient(180deg, #D6A92F, #B48718)'
              : 'linear-gradient(180deg, #D48478, #B95C50)'

          return (
            <div
              key={vendor.name}
              className="proc-fade flex-1 h-full flex flex-col justify-end min-w-0"
              style={{
                animationDelay: `${index * 80}ms`
              }}
            >
              <div className="text-center mb-2">
                <span className="proc-serif text-[18px] text-[#173B2B]">
                  {vendor.performance}
                </span>
                <span className="text-[8px] text-muted ml-0.5">
                  %
                </span>
              </div>

              <div className="relative h-[190px] flex items-end">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <span className="border-t border-dashed border-[#E7EBE6]" />
                  <span className="border-t border-dashed border-[#E7EBE6]" />
                  <span className="border-t border-dashed border-[#E7EBE6]" />
                  <span className="border-t border-dashed border-[#E7EBE6]" />
                  <span className="border-t border-[#DDE4DE]" />
                </div>

                <div
                  className="relative z-10 w-full max-w-[54px] mx-auto rounded-t-xl transition-all duration-1000 ease-out shadow-sm"
                  style={{
                    height,
                    background: barBackground
                  }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80" />
                </div>
              </div>

              <div className="text-center mt-3">
                <div className="w-8 h-8 mx-auto rounded-xl bg-[#EEF2ED] text-[#173B2B] flex items-center justify-center text-[8px] font-bold">
                  {vendor.short}
                </div>

                <p className="text-[9px] font-semibold mt-2 mb-0 truncate">
                  {vendor.name}
                </p>

                <p className="text-[8px] text-muted mt-1 mb-0">
                  {vendor.delivery}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-5 gap-3 mt-4 pt-3 border-t border-[#EEF1ED]">
        {vendors.map(vendor => (
          <div
            key={`${vendor.name}-status`}
            className="flex items-center justify-center gap-1.5"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                vendor.status === 'EXCELLENT'
                  ? 'bg-[#173B2B]'
                  : vendor.status === 'GOOD'
                  ? 'bg-[#D6A92F]'
                  : 'bg-[#B95C50]'
              }`}
            />

            <span className="text-[7px] text-muted truncate">
              {vendor.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


/* =========================================================
   PIPELINE TIMELINE
========================================================= */

function PipelineTimeline({
  steps
}) {

  const toneMap = {

    muted: {
      ring: '#DDE4DE',
      text: '#173B2B',
      fill: '#fff'
    },

    gold: {
      ring: '#D6A92F',
      text: '#B48718',
      fill: '#fff'
    },

    rust: {
      ring: '#B95C50',
      text: '#B95C50',
      fill: '#fff'
    },

    forest: {
      ring: '#173B2B',
      text: '#fff',
      fill: '#173B2B'
    }

  }


  return (

    <div className="relative pt-1">

      <div className="absolute left-[12%] right-[12%] top-[28px] h-[2px] bg-[#E7EBE6] hidden md:block" />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">

        {steps.map((step, i) => {

          const t = toneMap[step.tone]

          return (

            <div
              key={i}
              className="flex flex-col items-center text-center"
            >

              <div
                className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-[18px] font-semibold border-2 relative z-10"
                style={{
                  borderColor: t.ring,
                  background: t.fill,
                  color: t.text
                }}
              >
                {step.value}
              </div>

              <p className="text-[11px] font-semibold mt-3 mb-0">
                {step.label}
              </p>

              <p className="text-[9px] text-muted mt-1 mb-0 max-w-[120px]">
                {step.text}
              </p>

            </div>

          )

        })}

      </div>

    </div>

  )
}


/* =========================================================
   SNAPSHOT CARD
========================================================= */

function SnapshotCard({
  label,
  value,
  text,
  icon,
  warning
}) {

  return (

    <div className="proc-fade bg-white border border-[#E7EBE6] rounded-[22px] p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[9px] uppercase tracking-wide text-muted m-0">
            {label}
          </p>

          <p className="proc-serif text-[26px] mt-2 mb-0">
            {value}
          </p>

        </div>


        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            warning
              ? 'bg-[#F8F5ED] text-[#B48718]'
              : 'bg-[#EEF2ED] text-[#173B2B]'
          }`}
        >
          {icon}
        </div>

      </div>


      <p className="text-[9px] text-muted mt-2 m-0">
        {text}
      </p>

    </div>

  )
}


/* =========================================================
   MODAL INFO
========================================================= */

function ModalInfo({
  label,
  value
}) {

  return (

    <div className="rounded-2xl border border-[#E7EBE6] bg-[#FAFBF8] p-4">

      <p className="text-[9px] uppercase tracking-wide text-muted m-0">
        {label}
      </p>

      <p className="text-[14px] font-semibold mt-2 mb-0">
        {value}
      </p>

    </div>

  )
}


/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon,
  label,
  value
}) {

  return (

    <div className="rounded-2xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">

      <div className="flex items-center gap-2 text-[#173B2B]">

        {icon}

        <p className="text-[9px] uppercase tracking-wide text-muted m-0">
          {label}
        </p>

      </div>

      <p className="text-[11px] font-semibold mt-2 mb-0">
        {value}
      </p>

    </div>

  )
}