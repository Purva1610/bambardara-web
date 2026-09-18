import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock3,
  MapPin,
  X,
  Trash2,
  Users,
  BriefcaseBusiness,
  Bell,
  Timer,
  CheckCircle2,
} from "lucide-react";

const pad = (num) => String(num).padStart(2, "0");

const dateKey = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
};

const initialEvents = [
  {
    id: 1,
    title: "MD Leadership Meeting",
    date: "2026-09-16",
    time: "10:00",
    endTime: "11:00",
    type: "Meeting",
    location: "Executive Conference Room",
    description: "Monthly leadership and business performance review.",
  },
  {
    id: 2,
    title: "Construction Progress Review",
    date: "2026-09-18",
    time: "11:30",
    endTime: "12:30",
    type: "Project",
    location: "Construction Site",
    description:
      "Review project progress, budget utilization and timelines.",
  },
  {
    id: 3,
    title: "Finance Review",
    date: "2026-09-21",
    time: "14:00",
    endTime: "15:00",
    type: "Finance",
    location: "Finance Department",
    description:
      "Review current spending, investments and financial reports.",
  },
  {
    id: 4,
    title: "Hospitality Strategy Meeting",
    date: "2026-09-24",
    time: "15:30",
    endTime: "16:30",
    type: "Strategy",
    location: "Board Room",
    description:
      "Discuss hospitality operations and upcoming initiatives.",
  },
  {
    id: 5,
    title: "Weekly Operations Review",
    date: "2026-09-28",
    time: "10:30",
    endTime: "11:30",
    type: "Operations",
    location: "MD Office",
    description:
      "Weekly review of operational activities and pending actions.",
  },
];

const typeClass = {
  Meeting: "green",
  Project: "blue",
  Finance: "purple",
  Strategy: "orange",
  Operations: "teal",
};

const formatDisplayDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const eventStartDate = (event) =>
  new Date(`${event.date}T${event.time}:00`);

const eventEndDate = (event) =>
  new Date(`${event.date}T${event.endTime}:00`);

function Calendar() {
  const todayKey = getTodayKey();

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: todayKey,
    time: "10:00",
    endTime: "11:00",
    type: "Meeting",
    location: "",
    description: "",
  });

  /* ===============================
     REAL TIME CLOCK
  =============================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ===============================
     BROWSER NOTIFICATION
  =============================== */

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    events.forEach((event) => {
      const start = eventStartDate(event);

      const difference = Math.abs(currentTime.getTime() - start.getTime());

      if (
        difference < 1000 &&
        Notification.permission === "granted"
      ) {
        new Notification(`Event Started: ${event.title}`, {
          body: `${formatTime(event.time)} • ${event.location}`,
          icon: "/favicon.ico",
        });
      }
    });
  }, [currentTime, events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  /* ===============================
     CALENDAR DAYS
  =============================== */

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const previousMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = previousMonthDays - i;

      days.push({
        day,
        currentMonth: false,
        date: dateKey(
          month === 0 ? year - 1 : year,
          month === 0 ? 11 : month - 1,
          day
        ),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        currentMonth: true,
        date: dateKey(year, month, day),
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay,
        currentMonth: false,
        date: dateKey(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1,
          nextDay
        ),
      });

      nextDay++;
    }

    return days;
  }, [year, month]);

  /* ===============================
     EVENT HELPERS
  =============================== */

  const getEventsForDate = (date) =>
    events.filter((event) => event.date === date);

  const selectedDateEvents = getEventsForDate(selectedDate);

  const upcomingEvents = [...events]
    .filter((event) => eventStartDate(event) >= currentTime)
    .sort((a, b) => eventStartDate(a) - eventStartDate(b))
    .slice(0, 6);

  const todayEvents = events.filter(
    (event) => event.date === todayKey
  );

  /* ===============================
     COUNTDOWN
  =============================== */

  const getCountdown = (event) => {
    const start = eventStartDate(event);
    const end = eventEndDate(event);

    const diff = start.getTime() - currentTime.getTime();

    if (currentTime >= start && currentTime <= end) {
      const remaining = end.getTime() - currentTime.getTime();

      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor(
        (remaining % 3600000) / 60000
      );
      const seconds = Math.floor(
        (remaining % 60000) / 1000
      );

      return {
        status: "live",
        text: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
      };
    }

    if (diff <= 0) {
      return {
        status: "past",
        text: "Completed",
      };
    }

    const days = Math.floor(diff / 86400000);

    const hours = Math.floor(
      (diff % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (diff % 3600000) / 60000
    );

    const seconds = Math.floor(
      (diff % 60000) / 1000
    );

    if (days > 0) {
      return {
        status: "upcoming",
        text: `${days}d ${hours}h ${minutes}m`,
      };
    }

    return {
      status: "upcoming",
      text: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    };
  };

  /* ===============================
     NAVIGATION
  =============================== */

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(now.getFullYear(), now.getMonth(), 1)
    );

    setSelectedDate(todayKey);
  };

  /* ===============================
     ADD EVENT
  =============================== */

  const openAddEvent = (date = selectedDate) => {
    setNewEvent({
      title: "",
      date,
      time: "10:00",
      endTime: "11:00",
      type: "Meeting",
      location: "",
      description: "",
    });

    setShowAddModal(true);
  };

  const createEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title.trim()) {
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      title: newEvent.title.trim(),
      location:
        newEvent.location.trim() || "Not specified",
      description:
        newEvent.description.trim() ||
        "No additional details provided.",
    };

    setEvents((prev) => [...prev, event]);
    setSelectedDate(newEvent.date);
    setShowAddModal(false);
  };

  /* ===============================
     DELETE EVENT
  =============================== */

  const deleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );

    setSelectedEvent(null);
  };

  return (
    <div className="md-calendar-page">

      {/* ================= HEADER ================= */}

      <div className="calendar-header">
        <div>
          <div className="breadcrumb">
            MD Dashboard / Calendar
          </div>

          <h1>Calendar</h1>

          <p>
            Manage meetings, projects, strategic activities
            and important business events.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => openAddEvent()}
        >
          <Plus size={17} />
          Add Event
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Total Events</span>
            <strong>{events.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Upcoming</span>
            <strong>{upcomingEvents.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Meetings</span>
            <strong>
              {
                events.filter(
                  (event) => event.type === "Meeting"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Project Events</span>
            <strong>
              {
                events.filter(
                  (event) => event.type === "Project"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* ================= LIVE TODAY ================= */}

      {todayEvents.length > 0 && (
        <div className="live-panel">

          <div className="live-heading">
            <div className="live-dot" />

            <div>
              <strong>Today's Schedule</strong>
              <span>
                Live event monitoring & countdown
              </span>
            </div>
          </div>

          <div className="today-events">

            {todayEvents.map((event) => {
              const countdown = getCountdown(event);

              return (
                <div
                  className={`today-event ${
                    countdown.status === "live"
                      ? "event-live"
                      : ""
                  }`}
                  key={event.id}
                >

                  <div>
                    <strong>{event.title}</strong>

                    <span>
                      {formatTime(event.time)} –{" "}
                      {formatTime(event.endTime)}
                    </span>
                  </div>

                  <div
                    className={`countdown ${
                      countdown.status
                    }`}
                  >
                    {countdown.status === "live" ? (
                      <>
                        <Timer size={14} />
                        LIVE {countdown.text}
                      </>
                    ) : (
                      <>
                        <Clock3 size={14} />
                        {countdown.text}
                      </>
                    )}
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* ================= MAIN ================= */}

      <div className="calendar-layout">

        {/* CALENDAR */}

        <div className="calendar-card">

          <div className="calendar-toolbar">

            <div className="month-controls">

              <button
                onClick={previousMonth}
                className="icon-button"
              >
                <ChevronLeft size={18} />
              </button>

              <h2>{monthName}</h2>

              <button
                onClick={nextMonth}
                className="icon-button"
              >
                <ChevronRight size={18} />
              </button>

            </div>

            <button
              className="today-button"
              onClick={goToday}
            >
              Today
            </button>

          </div>

          <div className="weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="calendar-grid">

            {calendarDays.map((day) => {

              const dayEvents = getEventsForDate(day.date);

              return (
                <div
                  key={day.date}
                  className={`calendar-day
                    ${!day.currentMonth ? "other" : ""}
                    ${
                      selectedDate === day.date
                        ? "selected"
                        : ""
                    }
                    ${
                      todayKey === day.date
                        ? "today"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setSelectedDate(day.date)
                  }
                  onDoubleClick={() =>
                    openAddEvent(day.date)
                  }
                >

                  <div className="day-number">
                    {day.day}
                  </div>

                  <div className="day-events">

                    {dayEvents
                      .slice(0, 3)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`calendar-event ${
                            typeClass[event.type] ||
                            "green"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                          }}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}

                    {dayEvents.length > 3 && (
                      <small>
                        +{dayEvents.length - 3} more
                      </small>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="side-panel">

          <div className="side-card">

            <div className="side-title">
              <h3>Selected Day</h3>

              {selectedDate === todayKey && (
                <span className="today-label">
                  TODAY
                </span>
              )}
            </div>

            <div className="selected-date">
              {formatDisplayDate(selectedDate)}
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="empty">
                No events scheduled.
              </div>
            ) : (
              selectedDateEvents.map((event) => (
                <div
                  className="side-event"
                  key={event.id}
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                >

                  <div className="event-dot" />

                  <div>
                    <strong>{event.title}</strong>

                    <span>
                      <Clock3 size={11} />
                      {formatTime(event.time)}
                    </span>
                  </div>

                </div>
              ))
            )}

            <button
              className="schedule-button"
              onClick={() =>
                openAddEvent(selectedDate)
              }
            >
              <Plus size={15} />
              Schedule Event
            </button>

          </div>

          <div className="side-card upcoming-card">

            <div className="side-title">
              <h3>Upcoming Events</h3>

              <span>{upcomingEvents.length}</span>
            </div>

            {upcomingEvents.map((event) => {

              const eventDate = new Date(
                `${event.date}T00:00:00`
              );

              return (
                <div
                  className="upcoming-event"
                  key={event.id}
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                >

                  <div className="date-box">
                    <strong>
                      {eventDate.getDate()}
                    </strong>

                    <span>
                      {eventDate.toLocaleDateString(
                        "en-IN",
                        { month: "short" }
                      )}
                    </span>
                  </div>

                  <div>
                    <strong>{event.title}</strong>

                    <span>
                      {formatTime(event.time)} •{" "}
                      {event.type}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </div>

      {/* ================= ADD EVENT MODAL ================= */}

      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddModal(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <h2>Create Event</h2>
                <p>Add a new MD Dashboard event.</p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={createEvent}>

              <label>
                Event Title

                <input
                  required
                  value={newEvent.title}
                  placeholder="Enter event title"
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      title: e.target.value,
                    })
                  }
                />
              </label>

              <div className="form-row">

                <label>
                  Date

                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Type

                  <select
                    value={newEvent.type}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        type: e.target.value,
                      })
                    }
                  >
                    <option>Meeting</option>
                    <option>Project</option>
                    <option>Finance</option>
                    <option>Strategy</option>
                    <option>Operations</option>
                  </select>
                </label>

              </div>

              <div className="form-row">

                <label>
                  Start Time

                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        time: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  End Time

                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        endTime: e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <label>
                Location

                <input
                  value={newEvent.location}
                  placeholder="Meeting location"
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      location: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Description

                <textarea
                  value={newEvent.description}
                  placeholder="Add event details..."
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  <CheckCircle2 size={15} />
                  Create Event
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= EVENT DETAILS ================= */}

      {selectedEvent && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >

          <div
            className="modal detail-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Event Details</h2>
                <p>{selectedEvent.type}</p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedEvent(null)
                }
              >
                <X size={17} />
              </button>

            </div>

            <div className="detail-icon">
              <CalendarDays size={22} />
            </div>

            <h2 className="detail-title">
              {selectedEvent.title}
            </h2>

            <div className="detail-row">
              <CalendarDays size={16} />
              {formatDisplayDate(selectedEvent.date)}
            </div>

            <div className="detail-row">
              <Clock3 size={16} />
              {formatTime(selectedEvent.time)} -{" "}
              {formatTime(selectedEvent.endTime)}
            </div>

            <div className="detail-row">
              <MapPin size={16} />
              {selectedEvent.location}
            </div>

            <div className="description-box">
              {selectedEvent.description}
            </div>

            <div className="detail-countdown">

              <Bell size={15} />

              <div>
                <span>Event Status</span>

                <strong>
                  {getCountdown(selectedEvent).text}
                </strong>
              </div>

            </div>

            <button
              className="delete-button"
              onClick={() =>
                deleteEvent(selectedEvent.id)
              }
            >
              <Trash2 size={15} />
              Delete Event
            </button>

          </div>
        </div>
      )}

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .md-calendar-page {
          width: 100%;
          min-height: calc(100vh - 120px);
          color: #18231c;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 22px;
        }

        .breadcrumb {
          color: #89938d;
          font-size: 12px;
          margin-bottom: 7px;
        }

        .calendar-header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .calendar-header p {
          margin: 8px 0 0;
          color: #7d8781;
          font-size: 13px;
        }

        .primary-button,
        .schedule-button,
        .save-button {
          border: none;
          background: #18251d;
          color: white;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .primary-button {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 42px;
          padding: 0 17px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 650;
        }

        .primary-button:hover,
        .schedule-button:hover,
        .save-button:hover {
          background: #304238;
          transform: translateY(-1px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 18px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 13px;
          min-height: 88px;
          padding: 16px;
          border: 1px solid #e2e8e4;
          border-radius: 13px;
          background: white;
          box-shadow: 0 2px 8px rgba(20, 35, 27, .03);
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 10px;
          background: #edf5ef;
          color: #39734d;
        }

        .stat-card span {
          display: block;
          margin-bottom: 5px;
          color: #8b948e;
          font-size: 10px;
        }

        .stat-card strong {
          font-size: 20px;
        }

        .live-panel {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
          padding: 15px 18px;
          border: 1px solid #dce8df;
          border-radius: 13px;
          background: #f5faf6;
        }

        .live-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 180px;
        }

        .live-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #42a866;
          box-shadow: 0 0 0 5px rgba(66,168,102,.12);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%,100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: .5;
            transform: scale(.8);
          }
        }

        .live-heading strong {
          display: block;
          font-size: 12px;
        }

        .live-heading span {
          display: block;
          margin-top: 3px;
          color: #849089;
          font-size: 9px;
        }

        .today-events {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 9px;
        }

        .today-event {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 11px;
          border: 1px solid #e1e9e3;
          border-radius: 9px;
          background: white;
        }

        .today-event strong {
          display: block;
          margin-bottom: 3px;
          font-size: 10px;
        }

        .today-event span {
          color: #89928d;
          font-size: 9px;
        }

        .event-live {
          border-color: #8bc79c;
          box-shadow: 0 0 0 2px rgba(65,160,92,.08);
        }

        .countdown {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 8px;
          border-radius: 6px;
          background: #f2f5f3;
          color: #68746d;
          font-size: 9px;
          font-weight: 700;
          white-space: nowrap;
        }

        .countdown.live {
          background: #e6f6eb;
          color: #2d864a;
        }

        .countdown.past {
          color: #9aa19d;
        }

        .calendar-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 18px;
          align-items: start;
        }

        .calendar-card,
        .side-card {
          border: 1px solid #e2e8e4;
          border-radius: 14px;
          background: white;
          box-shadow: 0 2px 8px rgba(20,35,27,.03);
        }

        .calendar-card {
          overflow: hidden;
        }

        .calendar-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid #edf0ee;
        }

        .month-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .month-controls h2 {
          min-width: 180px;
          margin: 0;
          text-align: center;
          font-size: 18px;
        }

        .icon-button,
        .today-button {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          border: 1px solid #dfe5e1;
          border-radius: 8px;
          background: white;
          color: #5d6962;
          cursor: pointer;
        }

        .icon-button {
          width: 34px;
        }

        .today-button {
          padding: 0 12px;
          font-size: 11px;
          font-weight: 650;
        }

        .weekdays,
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .weekdays {
          border-bottom: 1px solid #edf0ee;
          background: #fafbfa;
        }

        .weekdays div {
          padding: 11px 5px;
          color: #89928d;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .calendar-day {
          min-height: 108px;
          padding: 8px;
          border-right: 1px solid #edf0ee;
          border-bottom: 1px solid #edf0ee;
          cursor: pointer;
          transition: .15s ease;
        }

        .calendar-day:nth-child(7n) {
          border-right: none;
        }

        .calendar-day:hover {
          background: #f8faf9;
        }

        .calendar-day.other {
          background: #fbfcfb;
        }

        .calendar-day.other .day-number {
          color: #c0c7c3;
        }

        .calendar-day.selected {
          background: #f1f8f3;
        }

        .day-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 27px;
          height: 27px;
          margin-bottom: 5px;
          border-radius: 50%;
          color: #5d6862;
          font-size: 11px;
          font-weight: 650;
        }

        .calendar-day.today .day-number {
          background: #1c2a21;
          color: white;
        }

        .day-events {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .calendar-event {
          overflow: hidden;
          padding: 5px 6px;
          border-radius: 5px;
          font-size: 9px;
          font-weight: 650;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .calendar-event.green {
          background: #e9f5ec;
          color: #317049;
        }

        .calendar-event.blue {
          background: #eaf2f9;
          color: #416d91;
        }

        .calendar-event.purple {
          background: #f1ecf8;
          color: #755b98;
        }

        .calendar-event.orange {
          background: #fff2e2;
          color: #9b6b30;
        }

        .calendar-event.teal {
          background: #e8f5f4;
          color: #377a75;
        }

        .day-events small {
          color: #8c9590;
          font-size: 9px;
        }

        .side-panel {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .side-card {
          padding: 18px;
        }

        .side-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .side-title h3 {
          margin: 0;
          font-size: 14px;
        }

        .side-title > span {
          color: #929b96;
          font-size: 10px;
        }

        .today-label {
          color: #36804e !important;
          font-weight: 700;
        }

        .selected-date {
          margin-bottom: 10px;
          padding: 11px;
          border-radius: 9px;
          background: #f4f8f5;
          color: #4b584f;
          font-size: 11px;
          font-weight: 650;
        }

        .empty {
          padding: 20px 5px;
          color: #929a95;
          text-align: center;
          font-size: 10px;
        }

        .side-event {
          display: flex;
          gap: 9px;
          padding: 11px 0;
          border-bottom: 1px solid #edf0ee;
          cursor: pointer;
        }

        .event-dot {
          width: 7px;
          height: 7px;
          min-width: 7px;
          margin-top: 4px;
          border-radius: 50%;
          background: #4d9865;
        }

        .side-event strong {
          display: block;
          margin-bottom: 4px;
          color: #354139;
          font-size: 10px;
        }

        .side-event span {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #909994;
          font-size: 9px;
        }

        .schedule-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          height: 38px;
          margin-top: 14px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 650;
        }

        .upcoming-card {
          max-height: 420px;
          overflow-y: auto;
        }

        .upcoming-event {
          display: flex;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #edf0ee;
          cursor: pointer;
        }

        .upcoming-event:last-child {
          border-bottom: none;
        }

        .date-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 8px;
          background: #f1f6f2;
        }

        .date-box strong {
          font-size: 13px;
        }

        .date-box span {
          color: #89928d;
          font-size: 8px;
          text-transform: uppercase;
        }

        .upcoming-event > div:last-child {
          min-width: 0;
        }

        .upcoming-event > div:last-child strong {
          display: block;
          overflow: hidden;
          margin-bottom: 4px;
          color: #354139;
          font-size: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .upcoming-event > div:last-child span {
          color: #919a95;
          font-size: 9px;
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(12,20,16,.48);
          backdrop-filter: blur(4px);
        }

        .modal {
          width: min(500px,100%);
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          border-radius: 16px;
          background: white;
          box-shadow: 0 25px 70px rgba(0,0,0,.22);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .modal-header p {
          margin: 5px 0 0;
          color: #89928d;
          font-size: 10px;
        }

        .close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f3f5f4;
          color: #69736e;
          cursor: pointer;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #4d5952;
          font-size: 10px;
          font-weight: 650;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #dce2de;
          border-radius: 8px;
          outline: none;
          background: white;
          color: #253129;
          font-family: inherit;
          font-size: 12px;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #60796a;
          box-shadow: 0 0 0 3px rgba(96,121,106,.1);
        }

        textarea {
          min-height: 80px;
          resize: vertical;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 5px;
        }

        .cancel-button,
        .save-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 39px;
          padding: 0 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 650;
        }

        .cancel-button {
          border: 1px solid #dce2de;
          background: white;
          color: #59645e;
        }

        .detail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          margin-bottom: 14px;
          border-radius: 12px;
          background: #edf5ef;
          color: #33734c;
        }

        .detail-title {
          margin: 0 0 16px;
          font-size: 19px;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 11px 0;
          border-bottom: 1px solid #edf0ee;
          color: #59645e;
          font-size: 11px;
        }

        .detail-row svg {
          min-width: 16px;
          color: #678071;
        }

        .description-box {
          margin-top: 14px;
          padding: 12px;
          border-radius: 9px;
          background: #f6f8f7;
          color: #69746d;
          font-size: 10px;
          line-height: 1.6;
        }

        .detail-countdown {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          padding: 12px;
          border-radius: 9px;
          background: #f1f7f3;
          color: #36734b;
        }

        .detail-countdown span,
        .detail-countdown strong {
          display: block;
        }

        .detail-countdown span {
          margin-bottom: 3px;
          color: #7c8981;
          font-size: 9px;
        }

        .detail-countdown strong {
          font-size: 12px;
        }

        .delete-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          height: 40px;
          margin-top: 15px;
          border: 1px solid #efcccc;
          border-radius: 8px;
          background: #fff7f7;
          color: #b14e4e;
          cursor: pointer;
          font-size: 10px;
          font-weight: 650;
        }

        @media (max-width: 1200px) {
          .calendar-layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .live-panel {
            flex-direction: column;
          }

          .today-events {
            justify-content: flex-start;
          }

          .calendar-day {
            min-height: 90px;
          }
        }

        @media (max-width: 650px) {
          .calendar-header {
            align-items: stretch;
            flex-direction: column;
          }

          .primary-button {
            justify-content: center;
            width: 100%;
          }

          .side-panel {
            display: block;
          }

          .upcoming-card {
            margin-top: 18px;
          }

          .calendar-toolbar {
            flex-wrap: wrap;
          }

          .month-controls {
            width: 100%;
          }

          .month-controls h2 {
            flex: 1;
            min-width: 0;
          }

          .calendar-card {
            overflow-x: auto;
          }

          .weekdays,
          .calendar-grid {
            min-width: 620px;
          }

          .calendar-day {
            min-height: 88px;
          }

          .today-event {
            width: 100%;
            justify-content: space-between;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            gap: 8px;
          }

          .stat-card {
            min-height: 75px;
            padding: 10px;
          }

          .stat-icon {
            width: 34px;
            min-width: 34px;
            height: 34px;
          }

          .stat-card strong {
            font-size: 16px;
          }

          .calendar-header h1 {
            font-size: 25px;
          }
        }

      `}</style>
    </div>
  );
}

export default Calendar;