# Admin Backend API Documentation

## 🔐 Authentication & Authorization

**ALL admin endpoints require:**
- Valid Firebase ID token in Authorization header
- ADMIN role (set via Firebase custom claims: `{admin: true}`)

**Format:**
```
Authorization: Bearer <Firebase-ID-Token>
```

**Authorization Flow:**
1. User logs in via Firebase (frontend)
2. Firebase returns ID token with custom claims
3. Backend verifies token via Firebase Admin SDK
4. Backend extracts `admin` custom claim
5. Backend maps to ROLE_ADMIN Spring Security authority
6. Endpoints check `@PreAuthorize("hasRole('ADMIN')")`

**HTTP Status Codes:**
- `401 Unauthorized` - No token or invalid token
- `403 Forbidden` - Valid token but not ADMIN role
- `200 OK` - Success with ADMIN token

---

## 📊 Dashboard APIs

### GET /api/admin/dashboard/stats

Get aggregated dashboard statistics for admin overview.

**Authorization:** ADMIN role required

**Request:**
```http
GET /api/admin/dashboard/stats
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "totalUsers": 42,
  "totalRequests": 156,
  "newRequests": 23,
  "inProgressRequests": 15,
  "resolvedRequests": 98,
  "closedRequests": 20,
  "recentRequests": [
    {
      "id": 156,
      "userName": "John Doe",
      "email": "john@example.com",
      "concernType": "BOOKING_ENQUIRY",
      "status": "NEW",
      "createdAt": "2024-01-20 14:30:00"
    },
    {
      "id": 155,
      "userName": "Jane Smith",
      "email": "jane@example.com",
      "concernType": "FEEDBACK_OR_COMPLAINT",
      "status": "IN_PROGRESS",
      "createdAt": "2024-01-20 10:15:00"
    }
  ]
}
```

**Statistics Explanation:**
- `totalUsers`: Total registered users in the system
- `totalRequests`: Total contact/enquiry requests submitted
- `newRequests`: Requests with status NEW
- `inProgressRequests`: Requests with status IN_PROGRESS
- `resolvedRequests`: Requests with status RESOLVED
- `closedRequests`: Requests with status CLOSED
- `recentRequests`: Last 10 contact requests (most recent first)

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN

---

### GET /api/admin/me

Get current authenticated admin user profile.

**Authorization:** ADMIN role required

**Request:**
```http
GET /api/admin/me
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "id": 5,
  "firebaseUid": "firebase-uid-abc123",
  "name": "Admin User",
  "email": "admin@bambardara.com",
  "mobileNumber": "9876543210",
  "address": "Admin Office, Mumbai",
  "gender": "MALE",
  "role": "ADMIN"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN

---

## 👥 User Management APIs

### GET /api/admin/users

Get paginated list of all users with optional search.

**Authorization:** ADMIN role required

**Query Parameters:**
- `search` (optional): Search term (searches in name and email)
- `page` (optional, default: 0): Page number (0-indexed)
- `size` (optional, default: 20, max: 100): Page size
- `sort` (optional, default: "id,desc"): Sort field and direction

**Request Examples:**
```http
GET /api/admin/users
Authorization: Bearer <admin-firebase-token>

GET /api/admin/users?page=0&size=20
Authorization: Bearer <admin-firebase-token>

GET /api/admin/users?page=1&size=50&sort=email,asc
Authorization: Bearer <admin-firebase-token>

GET /api/admin/users?search=abhay&page=0&size=20
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "content": [
    {
      "id": 1,
      "firebaseUid": "firebase-uid-user1",
      "name": "Abhay Kumar",
      "email": "abhay@example.com",
      "mobileNumber": "9876543210",
      "role": "USER",
      "gender": "MALE"
    },
    {
      "id": 2,
      "firebaseUid": null,
      "name": "John Doe",
      "email": "john@example.com",
      "mobileNumber": "9876543211",
      "role": "USER",
      "gender": "MALE"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 42,
  "totalPages": 3,
  "last": false,
  "size": 20,
  "number": 0,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "numberOfElements": 20,
  "first": true,
  "empty": false
}
```

**Field Descriptions:**
- `id`: User database ID
- `firebaseUid`: Firebase authentication UID (nullable for legacy users)
- `name`: User display name
- `email`: User email (unique)
- `mobileNumber`: User mobile number (nullable)
- `role`: User role (USER, ADMIN, MARKETING)
- `gender`: User gender (MALE, FEMALE, OTHER, null)

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `400 Bad Request`: Invalid pagination parameters

---

### GET /api/admin/users/{id}

Get detailed information about a specific user.

**Authorization:** ADMIN role required

**Path Parameters:**
- `id`: User ID

**Request:**
```http
GET /api/admin/users/5
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "id": 5,
  "firebaseUid": "firebase-uid-user5",
  "name": "Abhay Kumar",
  "email": "abhay@example.com",
  "mobileNumber": "9876543210",
  "address": "123 Main Street, Mumbai, Maharashtra",
  "gender": "MALE",
  "role": "USER"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `404 Not Found`: User with given ID does not exist

---

## 📧 Contact/Enquiry Management APIs

### GET /api/admin/contact-requests

Get list of all contact requests (simple list, no pagination).

**Authorization:** ADMIN role required

**Query Parameters:**
- `status` (optional): Filter by status (NEW, IN_PROGRESS, RESOLVED, CLOSED)

**Request Examples:**
```http
GET /api/admin/contact-requests
Authorization: Bearer <admin-firebase-token>

GET /api/admin/contact-requests?status=NEW
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
[
  {
    "id": 42,
    "userId": 10,
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "concernType": "BOOKING_ENQUIRY",
    "message": "I want to book a cottage for 5 days...",
    "status": "NEW",
    "createdAt": "2024-01-20T14:30:00"
  },
  {
    "id": 41,
    "userId": 8,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "mobile": "9876543211",
    "concernType": "FEEDBACK_OR_COMPLAINT",
    "message": "The service was excellent...",
    "status": "RESOLVED",
    "createdAt": "2024-01-19T10:15:00"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `400 Bad Request`: Invalid status value

---

### GET /api/admin/contact-requests/paginated

Get paginated list of contact requests with filtering.

**Authorization:** ADMIN role required

**Query Parameters:**
- `status` (optional): Filter by status (NEW, IN_PROGRESS, RESOLVED, CLOSED)
- `page` (optional, default: 0): Page number
- `size` (optional, default: 20, max: 100): Page size

**Request Examples:**
```http
GET /api/admin/contact-requests/paginated?page=0&size=20
Authorization: Bearer <admin-firebase-token>

GET /api/admin/contact-requests/paginated?status=NEW&page=0&size=50
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "content": [
    {
      "id": 42,
      "userId": 10,
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "name": "John Doe",
      "email": "john@example.com",
      "mobileNumber": "9876543210",
      "concernType": "BOOKING_ENQUIRY",
      "details": {
        "arrivalDate": "2024-02-01",
        "departureDate": "2024-02-06",
        "guests": 4,
        "roomPreference": "COTTAGE",
        "specialRequests": "Need vegetarian meals"
      },
      "message": "I want to book a cottage for 5 days...",
      "status": "NEW",
      "marketingEmailSent": true,
      "createdAt": "2024-01-20T14:30:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    }
  },
  "totalElements": 156,
  "totalPages": 8,
  "last": false,
  "size": 20,
  "number": 0,
  "first": true,
  "empty": false
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `400 Bad Request`: Invalid status or pagination parameters

---

### GET /api/admin/contact-requests/{id}

Get detailed information about a specific contact request.

**Authorization:** ADMIN role required

**Path Parameters:**
- `id`: Contact request ID

**Request:**
```http
GET /api/admin/contact-requests/42
Authorization: Bearer <admin-firebase-token>
```

**Response: 200 OK**
```json
{
  "id": 42,
  "userId": 10,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "concernType": "BOOKING_ENQUIRY",
  "details": {
    "arrivalDate": "2024-02-01",
    "departureDate": "2024-02-06",
    "guests": 4,
    "roomPreference": "COTTAGE",
    "specialRequests": "Need vegetarian meals"
  },
  "message": "I want to book a cottage for 5 days starting from Feb 1st...",
  "status": "NEW",
  "marketingEmailSent": true,
  "createdAt": "2024-01-20T14:30:00"
}
```

**Field Descriptions:**
- `id`: Contact request ID
- `userId`: ID of user who submitted the request
- `userName`: User's account name
- `userEmail`: User's account email
- `name`: Name provided in the contact form (may differ from account name)
- `email`: Email provided in the contact form
- `mobileNumber`: Mobile number from form (nullable)
- `concernType`: Type of enquiry (enum)
- `details`: Additional structured data (JSONB field, content varies by concern type)
- `message`: Free-text message from user
- `status`: Current status (NEW, IN_PROGRESS, RESOLVED, CLOSED)
- `marketingEmailSent`: Whether notification was sent to marketing team
- `createdAt`: Timestamp when request was created

**Concern Types:**
- `BOOKING_ENQUIRY`
- `STAY_AND_HOSPITALITY`
- `ACTIVITIES_AND_ADVENTURE`
- `EVENTS_AND_CELEBRATIONS`
- `FARM_AND_NATURE_TOURS`
- `PAYMENT_OR_REFUND`
- `FEEDBACK_OR_COMPLAINT`
- `MEMBERSHIP_PLAN`
- `INVESTMENT`
- `OTHER`

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `404 Not Found`: Contact request with given ID does not exist

---

### PATCH /api/admin/contact-requests/{id}/status

Update the status of a contact request.

**Authorization:** ADMIN role required

**Path Parameters:**
- `id`: Contact request ID

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Valid Status Values:**
- `NEW` - Newly submitted, not yet reviewed
- `IN_PROGRESS` - Currently being handled by team
- `RESOLVED` - Issue resolved, response sent
- `CLOSED` - Completed, no further action needed

**Request:**
```http
PATCH /api/admin/contact-requests/42/status
Authorization: Bearer <admin-firebase-token>
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

**Response: 200 OK**
```json
{
  "id": 42,
  "userId": 10,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "concernType": "BOOKING_ENQUIRY",
  "details": {
    "arrivalDate": "2024-02-01",
    "departureDate": "2024-02-06",
    "guests": 4,
    "roomPreference": "COTTAGE"
  },
  "message": "I want to book a cottage...",
  "status": "IN_PROGRESS",
  "marketingEmailSent": true,
  "createdAt": "2024-01-20T14:30:00"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: User is not ADMIN
- `404 Not Found`: Contact request with given ID does not exist
- `400 Bad Request`: Invalid status value or validation error

---

## 📋 Complete Endpoint Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/dashboard/stats` | Dashboard statistics | ADMIN |
| GET | `/api/admin/me` | Current admin profile | ADMIN |
| GET | `/api/admin/users` | List users (paginated) | ADMIN |
| GET | `/api/admin/users/{id}` | Get user details | ADMIN |
| GET | `/api/admin/contact-requests` | List contacts (simple) | ADMIN |
| GET | `/api/admin/contact-requests/paginated` | List contacts (paginated) | ADMIN |
| GET | `/api/admin/contact-requests/{id}` | Get contact details | ADMIN |
| PATCH | `/api/admin/contact-requests/{id}/status` | Update contact status | ADMIN |

---

## 🧪 Testing

### 1. Test Unauthenticated Access (Expected: 401)

```bash
curl -X GET http://localhost:8080/api/admin/dashboard/stats
```

**Expected Response:**
```
HTTP/1.1 401 Unauthorized
```

---

### 2. Test Normal USER Access (Expected: 403)

**Step 1: Login as normal user**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Step 2: Try to access admin endpoint**
```bash
curl -X GET http://localhost:8080/api/admin/dashboard/stats \
  -H "Authorization: Bearer <user-jwt-token>"
```

**Expected Response:**
```
HTTP/1.1 403 Forbidden
{
  "status": 403,
  "message": "Access denied: ..."
}
```

---

### 3. Test ADMIN Access (Expected: 200)

**Step 1: Login as admin**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bambardara.com",
    "password": "admin123"
  }'
```

**Step 2: Access admin endpoint**
```bash
curl -X GET http://localhost:8080/api/admin/dashboard/stats \
  -H "Authorization: Bearer <admin-jwt-token>"
```

**Expected Response:**
```
HTTP/1.1 200 OK
{
  "totalUsers": 42,
  "totalRequests": 156,
  ...
}
```

---

### 4. Test Firebase Authentication

**With Firebase ID Token:**
```bash
curl -X GET http://localhost:8080/api/admin/dashboard/stats \
  -H "Authorization: Bearer <firebase-id-token>"
```

**Admin token (custom claim: {admin: true}):** Returns 200 OK
**User token (custom claim: {admin: false}):** Returns 403 Forbidden
**Invalid/expired token:** Returns 401 Unauthorized

---

## 🔒 Security Notes

### DO NOT Trust Client-Sent Data

**NEVER trust:**
- Role sent in request body
- User ID sent in request parameters
- Email sent in headers
- Any auth info from frontend

**ALWAYS use:**
- Authenticated user from `@AuthenticationPrincipal User`
- Role from Spring Security context (extracted from verified token)
- User ID from authenticated user entity

### Firebase Custom Claims

**Setting admin role (server-side only):**
```javascript
// Firebase Admin SDK (Node.js/Cloud Functions)
const admin = require('firebase-admin');

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Admin claim set successfully');
  });
```

**Frontend CANNOT set custom claims.** Only Firebase Admin SDK (server-side) can set them.

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Set Firebase custom claims for all admin users
- [ ] Test all endpoints with Firebase tokens (not just JWT)
- [ ] Verify 401 response for unauthenticated requests
- [ ] Verify 403 response for non-admin users
- [ ] Verify 200 response for admin users
- [ ] Test pagination edge cases (page beyond limit, negative page, size > 100)
- [ ] Test search functionality with special characters
- [ ] Test status update with invalid status values
- [ ] Load test dashboard stats endpoint (may need caching)
- [ ] Set up monitoring for 403 Forbidden responses (potential security issue)
- [ ] Review logs for unauthorized access attempts
- [ ] Ensure database indexes on frequently queried fields

---

## 📞 Support

For API issues or questions, contact the backend development team.

**Backend Repository:** bamberdara-backend
**API Base URL (Production):** TBD
**API Base URL (Development):** http://localhost:8080

---

**Last Updated:** 2024-08-31
**API Version:** 1.0.0
