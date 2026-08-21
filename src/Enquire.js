import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from './components/EstateImage';
import Reveal from './components/Reveal';

/**
 * The enquiry page is deliberately not an auth page: no password, no account,
 * no Google. It collects the details the estate needs to hold dates and
 * replies by hand. Guests who want to manage an existing booking sign in
 * instead — the two flows are linked but separate.
 */

const ESTATE_EMAIL = 'stay@bambardara.com';
const ESTATE_PHONE = '+91 12345 67890';

/* Boxed fields on sand — visually distinct from the underlined auth fields. */
const LABEL =
  'block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal';

const FIELD =
  'mt-3 w-full border border-stone bg-ivory-white px-4 py-3.5 font-body ' +
  'text-[0.9rem] font-light text-dark-charcoal placeholder:text-light-charcoal/50 ' +
  'transition-colors duration-500 focus:border-luxury-gold focus:outline-none focus:ring-0';

const PURPOSES = [
  { value: '', label: 'Select a topic' },
  { value: 'booking', label: 'Booking enquiry' },
  { value: 'stay', label: 'Stay and hospitality' },
  { value: 'activities', label: 'Activities and adventure' },
  { value: 'farm-trails', label: 'Farm and nature trails' },
  { value: 'payment', label: 'Payment or refund' },
  { value: 'feedback', label: 'Feedback or complaint' },
  { value: 'investment', label: 'Investment plans' },
  { value: 'membership', label: 'Membership plans' },
  { value: 'other', label: 'Other' },
];

const DETAILS = [
  { label: 'The Estate', lines: ['Parale Ninai, Kolhapur', 'Maharashtra 416 003, India'] },
  { label: 'Reservations', lines: [ESTATE_PHONE, 'Daily, 08:00 – 21:00 IST'] },
  { label: 'Correspondence', lines: [ESTATE_EMAIL, 'events@bambardara.com'] },
  { label: 'Arrivals', lines: ['Kolhapur airport, 38 km', 'Helipad on the north field'] },
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  purpose: '',
  arrival: '',
  departure: '',
  guests: '2',
  roomPreference: '',
  specialRequests: '',
  activityType: '',
  activityDate: '',
  experienceLevel: '',
  trailType: '',
  groupSize: '',
  guidePreference: '',
  bookingReference: '',
  transactionId: '',
  issueType: '',
  amount: '',
  stayDate: '',
  roomVilla: '',
  feedbackType: '',
  capitalRange: '',
  investmentType: '',
  contactPreference: '',
  timeline: '',
  membershipTier: '',
  startDate: '',
  membersCount: '',
  subject: '',
  message: '',
};

/* No enquiry backend is deployed yet; set this to post instead of mailing. */
const ENDPOINT = process.env.REACT_APP_ENQUIRY_ENDPOINT;

function composeMail(form) {
  const purpose =
    PURPOSES.find((p) => p.value === form.purpose)?.label ?? form.purpose;

  const details = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || '—'}`,
    `Enquiry: ${purpose}`,
  ];

  if (form.purpose === 'booking' || form.purpose === 'stay') {
    details.push(
      `Arrival: ${form.arrival || '—'}`,
      `Departure: ${form.departure || '—'}`,
      `Guests: ${form.guests}`,
      `Room preference: ${form.roomPreference || '—'}`,
      `Special requests: ${form.specialRequests || '—'}`
    );
  } else if (form.purpose === 'activities') {
    details.push(
      `Activity: ${form.activityType || '—'}`,
      `Preferred date: ${form.activityDate || '—'}`,
      `Experience level: ${form.experienceLevel || '—'}`,
      `Guests: ${form.guests}`
    );
  } else if (form.purpose === 'farm-trails') {
    details.push(
      `Trail or activity: ${form.trailType || '—'}`,
      `Preferred date: ${form.activityDate || '—'}`,
      `Group size: ${form.groupSize || '—'}`,
      `Guide preference: ${form.guidePreference || '—'}`
    );
  } else if (form.purpose === 'payment') {
    details.push(
      `Booking reference: ${form.bookingReference || '—'}`,
      `Transaction ID: ${form.transactionId || '—'}`,
      `Issue type: ${form.issueType || '—'}`,
      `Amount: ${form.amount || '—'}`
    );
  } else if (form.purpose === 'feedback') {
    details.push(
      `Stay date: ${form.stayDate || '—'}`,
      `Room or villa: ${form.roomVilla || '—'}`,
      `Feedback type: ${form.feedbackType || '—'}`
    );
  } else if (form.purpose === 'investment') {
    details.push(
      `Capital range: ${form.capitalRange || '—'}`,
      `Investment type: ${form.investmentType || '—'}`,
      `Contact preference: ${form.contactPreference || '—'}`,
      `Timeline: ${form.timeline || '—'}`
    );
  } else if (form.purpose === 'membership') {
    details.push(
      `Membership tier: ${form.membershipTier || '—'}`,
      `Preferred start date: ${form.startDate || '—'}`,
      `Contact preference: ${form.contactPreference || '—'}`,
      `Timeline: ${form.timeline || '—'}`
    );
  } else if (form.purpose === 'other') {
    details.push(`Subject: ${form.subject || '—'}`);
  }

  details.push('', form.message || '(no message)');

  return `mailto:${ESTATE_EMAIL}?subject=${encodeURIComponent(
    `Enquiry — ${purpose} — ${form.name}`
  )}&body=${encodeURIComponent(details.join('\n'))}`;
}

export default function Enquire() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePurposeChange = (e) => {
    const newPurpose = e.target.value;
    setForm((prev) => ({
      ...prev,
      purpose: newPurpose,
      arrival: '',
      departure: '',
      guests: '2',
      roomPreference: '',
      specialRequests: '',
      activityType: '',
      activityDate: '',
      experienceLevel: '',
      trailType: '',
      groupSize: '',
      guidePreference: '',
      bookingReference: '',
      transactionId: '',
      issueType: '',
      amount: '',
      stayDate: '',
      roomVilla: '',
      feedbackType: '',
      capitalRange: '',
      investmentType: '',
      contactPreference: '',
      timeline: '',
      membershipTier: '',
      startDate: '',
      membersCount: '',
      subject: '',
      message: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (form.purpose === 'booking' || form.purpose === 'stay') &&
      form.departure &&
      form.arrival &&
      form.departure < form.arrival
    ) {
      setError('Departure cannot fall before arrival.');
      return;
    }

    setError('');
    setStatus('sending');

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(`The estate could not be reached (${res.status}).`);
      } else {
        /* Hands the enquiry to the guest's mail client, addressed and filled. */
        window.location.href = composeMail(form);
      }
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="bg-ivory-white">
      {/* Plate — a single wide band, not the auth split-screen */}
      <section className="relative h-[58vh] min-h-[26rem] overflow-hidden">
        <EstateImage
          slug="banquet-and-conference-3"
          alt="The long table set on the estate lawn"
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
        <div className="lux-scrim absolute inset-0" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-editorial px-6 pb-16 md:px-10 md:pb-20">
            <span className="lux-label text-muted-gold">Reservations</span>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.06] text-ivory-white">
              Write to the estate
              <span className="block italic text-muted-gold">
                and we will answer by hand
              </span>
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
          {/* Enquiry form */}
          <div>
            {status === 'sent' ? (
              <Reveal>
                <div className="border border-stone bg-warm-sand px-8 py-12 md:px-12 md:py-16">
                  <span className="lux-label text-luxury-gold">Received</span>
                  <h2 className="mt-6 font-heading text-3xl font-light leading-snug text-forest-green md:text-4xl">
                    Thank you, {form.name.split(' ')[0] || 'friend'}.
                  </h2>
                  <span className="lux-rule mt-6" />
                  <p className="mt-6 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                    {ENDPOINT
                      ? 'Your enquiry is with the reservations desk. One of the family will reply within a day, usually sooner.'
                      : 'Your mail client has the enquiry, addressed and filled. Send it and one of the family will reply within a day.'}{' '}
                    For anything urgent, call{' '}
                    <a
                      href={`tel:${ESTATE_PHONE.replace(/\s/g, '')}`}
                      className="text-forest-green underline-offset-4 hover:underline"
                    >
                      {ESTATE_PHONE}
                    </a>
                    .
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link to="/" className="lux-btn-dark">
                      <span>Return to the estate</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(EMPTY);
                        setStatus('idle');
                      }}
                      className="font-body text-[0.825rem] font-light text-light-charcoal underline-offset-4 hover:underline sm:self-center"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </div>
              </Reveal>
            ) : (
              <>
                <span className="lux-label">Your enquiry</span>
                <h2 className="mt-5 font-heading text-3xl font-light leading-snug text-forest-green md:text-4xl">
                  Tell us when, and for how many
                </h2>
                <span className="lux-rule mt-6" />
                <p className="mt-6 max-w-prose font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                  Nothing is charged and no account is needed. We hold dates on
                  correspondence alone — never more than one party on exclusive
                  use at a time.
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mt-8 border-l-2 border-natural-brown bg-warm-sand px-5 py-4 font-body text-[0.825rem] font-light text-natural-brown"
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-12 space-y-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enq-name" className={LABEL}>
                        Full name
                      </label>
                      <input
                        id="enq-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update('name')}
                        required
                        className={FIELD}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="enq-email" className={LABEL}>
                        Email
                      </label>
                      <input
                        id="enq-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update('email')}
                        required
                        className={FIELD}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="enq-phone" className={LABEL}>
                        Telephone
                      </label>
                      <input
                        id="enq-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className={FIELD}
                        placeholder="+91"
                      />
                    </div>

                    <div>
                      <label htmlFor="enq-purpose" className={LABEL}>
                        Nature of visit
                      </label>
                      <select
                        id="enq-purpose"
                        value={form.purpose}
                        onChange={handlePurposeChange}
                        className={FIELD}
                      >
                        {PURPOSES.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {form.purpose && form.purpose !== 'other' && (
                    <div className="mt-8 space-y-8">
                      {(form.purpose === 'booking' || form.purpose === 'stay') && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-arrival" className={LABEL}>
                                Arrival
                              </label>
                              <input
                                id="enq-arrival"
                                type="date"
                                min={today}
                                value={form.arrival}
                                onChange={update('arrival')}
                                className={FIELD}
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-departure" className={LABEL}>
                                Departure
                              </label>
                              <input
                                id="enq-departure"
                                type="date"
                                min={form.arrival || today}
                                value={form.departure}
                                onChange={update('departure')}
                                className={FIELD}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-guests" className={LABEL}>
                                Guests
                              </label>
                              <input
                                id="enq-guests"
                                type="number"
                                min="1"
                                max="200"
                                value={form.guests}
                                onChange={update('guests')}
                                className={FIELD}
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-room-preference" className={LABEL}>
                                Room preference
                              </label>
                              <input
                                id="enq-room-preference"
                                type="text"
                                value={form.roomPreference}
                                onChange={update('roomPreference')}
                                className={FIELD}
                                placeholder="Villa, suite, or room type"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="enq-special-requests" className={LABEL}>
                              Special requests
                            </label>
                            <textarea
                              id="enq-special-requests"
                              rows={4}
                              value={form.specialRequests}
                              onChange={update('specialRequests')}
                              className={`${FIELD} resize-none`}
                              placeholder="Dietary needs, celebrations, accessibility..."
                            />
                          </div>
                        </>
                      )}

                      {form.purpose === 'activities' && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-activity-type" className={LABEL}>
                                Preferred activity
                              </label>
                              <input
                                id="enq-activity-type"
                                type="text"
                                value={form.activityType}
                                onChange={update('activityType')}
                                className={FIELD}
                                placeholder="Safari, kayaking, trekking..."
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-activity-date" className={LABEL}>
                                Preferred date
                              </label>
                              <input
                                id="enq-activity-date"
                                type="date"
                                min={today}
                                value={form.activityDate}
                                onChange={update('activityDate')}
                                className={FIELD}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-experience-level" className={LABEL}>
                                Experience level
                              </label>
                              <select
                                id="enq-experience-level"
                                value={form.experienceLevel}
                                onChange={update('experienceLevel')}
                                className={FIELD}
                              >
                                <option value="">Select level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="enq-guests" className={LABEL}>
                                Number of guests
                              </label>
                              <input
                                id="enq-guests"
                                type="number"
                                min="1"
                                max="50"
                                value={form.guests}
                                onChange={update('guests')}
                                className={FIELD}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {form.purpose === 'farm-trails' && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-trail-type" className={LABEL}>
                                Preferred trail or activity
                              </label>
                              <input
                                id="enq-trail-type"
                                type="text"
                                value={form.trailType}
                                onChange={update('trailType')}
                                className={FIELD}
                                placeholder="Waterfall trek, plantation walk..."
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-activity-date" className={LABEL}>
                                Preferred date
                              </label>
                              <input
                                id="enq-activity-date"
                                type="date"
                                min={today}
                                value={form.activityDate}
                                onChange={update('activityDate')}
                                className={FIELD}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-group-size" className={LABEL}>
                                Group size
                              </label>
                              <input
                                id="enq-group-size"
                                type="number"
                                min="1"
                                max="50"
                                value={form.groupSize}
                                onChange={update('groupSize')}
                                className={FIELD}
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-guide-preference" className={LABEL}>
                                Guide preference
                              </label>
                              <select
                                id="enq-guide-preference"
                                value={form.guidePreference}
                                onChange={update('guidePreference')}
                                className={FIELD}
                              >
                                <option value="">Select preference</option>
                                <option value="required">Guide required</option>
                                <option value="optional">Guide optional</option>
                                <option value="self">Self-guided</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {form.purpose === 'payment' && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-booking-reference" className={LABEL}>
                                Booking reference
                              </label>
                              <input
                                id="enq-booking-reference"
                                type="text"
                                value={form.bookingReference}
                                onChange={update('bookingReference')}
                                className={FIELD}
                                placeholder="e.g. BAM-12345"
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-transaction-id" className={LABEL}>
                                Transaction ID
                              </label>
                              <input
                                id="enq-transaction-id"
                                type="text"
                                value={form.transactionId}
                                onChange={update('transactionId')}
                                className={FIELD}
                                placeholder="Payment transaction ID"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-issue-type" className={LABEL}>
                                Issue type
                              </label>
                              <select
                                id="enq-issue-type"
                                value={form.issueType}
                                onChange={update('issueType')}
                                className={FIELD}
                              >
                                <option value="">Select issue</option>
                                <option value="refund">Refund request</option>
                                <option value="duplicate">Duplicate payment</option>
                                <option value="failed">Payment failed</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="enq-amount" className={LABEL}>
                                Amount (₹)
                              </label>
                              <input
                                id="enq-amount"
                                type="number"
                                value={form.amount}
                                onChange={update('amount')}
                                className={FIELD}
                                placeholder="Transaction amount"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {form.purpose === 'feedback' && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-stay-date" className={LABEL}>
                                Stay date
                              </label>
                              <input
                                id="enq-stay-date"
                                type="date"
                                value={form.stayDate}
                                onChange={update('stayDate')}
                                className={FIELD}
                              />
                            </div>
                            <div>
                              <label htmlFor="enq-room-villa" className={LABEL}>
                                Room or villa
                              </label>
                              <input
                                id="enq-room-villa"
                                type="text"
                                value={form.roomVilla}
                                onChange={update('roomVilla')}
                                className={FIELD}
                                placeholder="Accommodation name"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="enq-feedback-type" className={LABEL}>
                              Feedback type
                            </label>
                            <select
                              id="enq-feedback-type"
                              value={form.feedbackType}
                              onChange={update('feedbackType')}
                              className={FIELD}
                            >
                              <option value="">Select type</option>
                              <option value="compliment">Compliment</option>
                              <option value="suggestion">Suggestion</option>
                              <option value="complaint">Complaint</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="enq-message" className={LABEL}>
                              Your feedback
                            </label>
                            <textarea
                              id="enq-message"
                              rows={5}
                              value={form.message}
                              onChange={update('message')}
                              className={`${FIELD} resize-none`}
                              placeholder="Please share your experience..."
                            />
                          </div>
                        </>
                      )}

                      {(form.purpose === 'investment' || form.purpose === 'membership') && (
                        <>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {form.purpose === 'investment' ? (
                              <>
                                <div>
                                  <label htmlFor="enq-capital-range" className={LABEL}>
                                    Capital range
                                  </label>
                                  <select
                                    id="enq-capital-range"
                                    value={form.capitalRange}
                                    onChange={update('capitalRange')}
                                    className={FIELD}
                                  >
                                    <option value="">Select range</option>
                                    <option value="1L-5L">₹1L – ₹5L</option>
                                    <option value="5L-25L">₹5L – ₹25L</option>
                                    <option value="25L-1Cr">₹25L – ₹1Cr</option>
                                    <option value="1Cr+">₹1Cr+</option>
                                  </select>
                                </div>
                                <div>
                                  <label htmlFor="enq-investment-type" className={LABEL}>
                                    Investment type
                                  </label>
                                  <select
                                    id="enq-investment-type"
                                    value={form.investmentType}
                                    onChange={update('investmentType')}
                                    className={FIELD}
                                  >
                                    <option value="">Select type</option>
                                    <option value="equity">Equity</option>
                                    <option value="debt">Debt</option>
                                    <option value="joint">Joint venture</option>
                                  </select>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <label htmlFor="enq-membership-tier" className={LABEL}>
                                    Membership tier
                                  </label>
                                  <select
                                    id="enq-membership-tier"
                                    value={form.membershipTier}
                                    onChange={update('membershipTier')}
                                    className={FIELD}
                                  >
                                    <option value="">Select tier</option>
                                    <option value="silver">Silver Explorer</option>
                                    <option value="gold">Gold Adventure</option>
                                    <option value="platinum">Platinum Nature</option>
                                    <option value="diamond">Diamond Heritage</option>
                                    <option value="founder">Founder Club</option>
                                  </select>
                                </div>
                                <div>
                                  <label htmlFor="enq-start-date" className={LABEL}>
                                    Preferred start date
                                  </label>
                                  <input
                                    id="enq-start-date"
                                    type="date"
                                    min={today}
                                    value={form.startDate}
                                    onChange={update('startDate')}
                                    className={FIELD}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                              <label htmlFor="enq-contact-preference" className={LABEL}>
                                Contact preference
                              </label>
                              <select
                                id="enq-contact-preference"
                                value={form.contactPreference}
                                onChange={update('contactPreference')}
                                className={FIELD}
                              >
                                <option value="">Select preference</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="both">Both</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="enq-timeline" className={LABEL}>
                                Timeline
                              </label>
                              <select
                                id="enq-timeline"
                                value={form.timeline}
                                onChange={update('timeline')}
                                className={FIELD}
                              >
                                <option value="">Select timeline</option>
                                <option value="immediate">Immediate</option>
                                <option value="1-3months">1–3 months</option>
                                <option value="3-6months">3–6 months</option>
                                <option value="6months+">6+ months</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {form.purpose === 'other' && (
                        <div className="space-y-8">
                          <div>
                            <label htmlFor="enq-subject" className={LABEL}>
                              Subject
                            </label>
                            <input
                              id="enq-subject"
                              type="text"
                              value={form.subject}
                              onChange={update('subject')}
                              className={FIELD}
                              placeholder="Brief subject"
                            />
                          </div>
                          <div>
                            <label htmlFor="enq-message" className={LABEL}>
                              Tell us about your enquiry
                            </label>
                            <textarea
                              id="enq-message"
                              rows={6}
                              value={form.message}
                              onChange={update('message')}
                              className={`${FIELD} resize-none`}
                              placeholder="Please share the details of your enquiry so we can assist you better..."
                            />
                          </div>
                        </div>
                      )}

                      {form.purpose !== 'feedback' && form.purpose !== 'other' && (
                        <div>
                          <label htmlFor="enq-message" className={LABEL}>
                            {form.purpose === 'other' ? 'Message' : 'Anything we should know'}
                          </label>
                          <textarea
                            id="enq-message"
                            rows={5}
                            value={form.message}
                            onChange={update('message')}
                            className={`${FIELD} resize-none`}
                            placeholder={
                              form.purpose === 'booking'
                                ? 'Room configuration, early check-in, special occasions...'
                                : form.purpose === 'payment'
                                ? 'Additional details about the transaction...'
                                : ''
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-2 w-full border border-forest-green bg-forest-green px-8 py-4 font-body text-label uppercase text-ivory-white transition-colors duration-500 hover:bg-transparent hover:text-forest-green disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Estate details + the one place auth is mentioned */}
          <aside className="lg:pt-4">
            <div className="border-t border-stone pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <span className="lux-label text-luxury-gold">The desk</span>
              <div className="mt-10 space-y-10">
                {DETAILS.map((d) => (
                  <div key={d.label}>
                    <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                      {d.label}
                    </span>
                    <div className="mt-3 space-y-1">
                      {d.lines.map((line) => (
                        <p
                          key={line}
                          className="font-body text-[0.9rem] font-light leading-relaxed text-dark-charcoal"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 bg-warm-sand px-7 py-8">
                <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
                  Already a guest?
                </span>
                <p className="mt-4 font-body text-[0.875rem] font-light leading-[1.8] text-light-charcoal">
                  An account is only for reviewing reservations already made.
                  Enquiring needs none.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    to="/login"
                    className="font-body text-[0.825rem] text-forest-green underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="font-body text-[0.825rem] text-forest-green underline-offset-4 hover:underline"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
