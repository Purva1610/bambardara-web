/**
 * Backend API configuration and utilities
 * 
 * UPDATED: Now uses Firebase Authentication instead of custom JWT
 */

import { auth } from './lib/firebase.js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Get the current Firebase ID token
 * @returns {Promise<string|null>} Firebase ID token or null if not authenticated
 */
const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      // Get fresh token (force refresh if older than 5 minutes)
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting Firebase token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Make an authenticated API request with Firebase token
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = await getFirebaseToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Get the current authenticated user's profile from backend
 */
export const getCurrentUser = async () => {
  return apiRequest('/api/auth/me', {
    method: 'GET',
  });
};

/**
 * Get the current user's enquiries/contact requests
 */
export const getMyEnquiries = async () => {
  return apiRequest('/api/contact/my', {
    method: 'GET',
  });
};

/**
 * Submit an enquiry/contact form
 * Works for both authenticated and anonymous users
 */
export const submitEnquiry = async (enquiryData) => {
  const token = await getFirebaseToken();
  
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add token if user is authenticated (optional for this endpoint)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Transform frontend form data to match backend DTO
  const backendPayload = {
    name: enquiryData.name || '',
    email: enquiryData.email || '',
    mobileNumber: normalizePhoneNumber(enquiryData.phone),
    concernType: enquiryData.purpose, // Frontend now sends backend enum values directly
    message: buildMessage(enquiryData),
    details: extractDetails(enquiryData)
  };

  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers,
    body: JSON.stringify(backendPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Normalize phone number to match backend validation (10 digits starting with 6-9)
 */
const normalizePhoneNumber = (phone) => {
  if (!phone) return null;
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 91 (India country code), remove it
  if (digits.startsWith('91') && digits.length === 12) {
    return digits.substring(2);
  }
  
  // If exactly 10 digits, return as is
  if (digits.length === 10) {
    return digits;
  }
  
  // Otherwise return null (will fail validation if invalid)
  return null;
};

/**
 * Build a detailed message from all form fields
 */
const buildMessage = (data) => {
  let message = data.message || '';
  
  // Add purpose-specific details
  if (data.purpose === 'BOOKING' || data.purpose === 'STAY_HOSPITALITY') {
    if (data.arrival) message += `\n\nArrival: ${data.arrival}`;
    if (data.departure) message += `\nDeparture: ${data.departure}`;
    if (data.guests) message += `\nGuests: ${data.guests}`;
    if (data.roomPreference) message += `\nRoom Preference: ${data.roomPreference}`;
    if (data.specialRequests) message += `\nSpecial Requests: ${data.specialRequests}`;
  }
  
  if (data.purpose === 'ACTIVITIES_ADVENTURE') {
    if (data.activityType) message += `\n\nActivity Type: ${data.activityType}`;
    if (data.activityDate) message += `\nActivity Date: ${data.activityDate}`;
    if (data.experienceLevel) message += `\nExperience Level: ${data.experienceLevel}`;
  }
  
  if (data.purpose === 'FARM_NATURE_TRAILS') {
    if (data.trailType) message += `\n\nTrail Type: ${data.trailType}`;
    if (data.groupSize) message += `\nGroup Size: ${data.groupSize}`;
    if (data.guidePreference) message += `\nGuide Preference: ${data.guidePreference}`;
  }
  
  if (data.purpose === 'PAYMENT_REFUND') {
    if (data.bookingReference) message += `\n\nBooking Reference: ${data.bookingReference}`;
    if (data.transactionId) message += `\nTransaction ID: ${data.transactionId}`;
    if (data.issueType) message += `\nIssue Type: ${data.issueType}`;
    if (data.amount) message += `\nAmount: ${data.amount}`;
  }
  
  if (data.purpose === 'FEEDBACK_COMPLAINT') {
    if (data.stayDate) message += `\n\nStay Date: ${data.stayDate}`;
    if (data.roomVilla) message += `\nRoom/Villa: ${data.roomVilla}`;
    if (data.feedbackType) message += `\nFeedback Type: ${data.feedbackType}`;
  }
  
  if (data.purpose === 'INVESTMENT_PLANS') {
    if (data.capitalRange) message += `\n\nCapital Range: ${data.capitalRange}`;
    if (data.investmentType) message += `\nInvestment Type: ${data.investmentType}`;
    if (data.contactPreference) message += `\nContact Preference: ${data.contactPreference}`;
    if (data.timeline) message += `\nTimeline: ${data.timeline}`;
  }
  
  if (data.purpose === 'MEMBERSHIP_PLANS') {
    if (data.membershipTier) message += `\n\nMembership Tier: ${data.membershipTier}`;
    if (data.startDate) message += `\nStart Date: ${data.startDate}`;
    if (data.membersCount) message += `\nMembers Count: ${data.membersCount}`;
  }
  
  if (data.subject) message += `\n\nSubject: ${data.subject}`;
  
  // Ensure message meets minimum length requirement (10 chars)
  return message.trim() || 'No message provided.';
};

/**
 * Extract additional details as a map
 */
const extractDetails = (data) => {
  const details = {
    purpose: data.purpose
  };
  
  // Add all non-empty fields
  Object.keys(data).forEach(key => {
    if (data[key] && key !== 'name' && key !== 'email' && key !== 'phone' && key !== 'message') {
      details[key] = data[key];
    }
  });
  
  return details;
};
