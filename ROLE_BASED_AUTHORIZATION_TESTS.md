# Role-Based Authorization Testing Guide

## 🎯 Implementation Summary

### Changes Made:

1. **SecurityConfig.java**
   - ✅ Added `@EnableMethodSecurity` annotation
   - ✅ Changed `/api/admin/**` from `.permitAll()` to `.hasRole("ADMIN")`
   - ✅ Enabled role-based authorization enforcement

2. **AdminContactController.java**
   - ✅ Added `@PreAuthorize("hasRole('ADMIN')")` annotation
   - ✅ Removed TODO comment about security

3. **AuthController.java**
   - ✅ Added `GET /api/auth/me` endpoint
   - ✅ Returns current authenticated user profile

4. **UserProfileResponse.java**
   - ✅ Created DTO for user profile response
   - ✅ Excludes sensitive fields (password)

---

## 🔐 Authorization Rules

### Public Endpoints (No Authentication Required):
- `POST /api/auth/login` - Login with email/password (JWT)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password

### Authenticated Endpoints (Any logged-in user):
- `GET /api/auth/me` - Get current user profile
- `POST /api/contact` - Submit contact form
- `GET /api/contact/my` - Get my contact requests

### Admin-Only Endpoints (ADMIN role required):
- `GET /api/admin/contact-requests` - View all contact requests
- `GET /api/admin/contact-requests?status=NEW` - Filter by status
- `GET /api/admin/agro-tourism/bookings` - View all bookings
- `POST /api/admin/agro-tourism/experiences` - Manage experiences

---

## 🧪 Postman Test Cases

### Prerequisites:

1. **Start PostgreSQL Database**
   ```powershell
   docker start bambardara-postgres
   ```

2. **Set Firebase Credentials** (if testing Firebase auth)
   ```powershell
   $env:FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
   ```

3. **Start Backend Server**
   ```powershell
   cd c:\bam\bamberdara-backend
   .\mvnw.cmd spring-boot:run
   ```

---

## Test Case 1: Unauthenticated User → Admin Endpoint

### ❌ Expected: HTTP 401 Unauthorized

**Request:**
```http
GET http://localhost:8080/api/admin/contact-requests
Authorization: (none)
```

**Postman Setup:**
1. Create new request: `GET`
2. URL: `http://localhost:8080/api/admin/contact-requests`
3. Authorization tab: Select "No Auth"
4. Send request

**Expected Response:**
```json
Status: 401 Unauthorized
Body: (empty or minimal error message)
```

**Explanation:**
- No authentication token provided
- Spring Security blocks request before reaching controller
- Returns 401 because endpoint requires authentication

---

## Test Case 2: Authenticated Normal User → Admin Endpoint

### ❌ Expected: HTTP 403 Forbidden

**Step 1: Login as Normal User (Get JWT Token)**

**Request:**
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
Status: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Normal User",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

**Copy the token from response.**

---

**Step 2: Try to Access Admin Endpoint**

**Request:**
```http
GET http://localhost:8080/api/admin/contact-requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Postman Setup:**
1. Create new request: `GET`
2. URL: `http://localhost:8080/api/admin/contact-requests`
3. Authorization tab: Select "Bearer Token"
4. Token: Paste the JWT token from Step 1
5. Send request

**Expected Response:**
```json
Status: 403 Forbidden
Body: 
{
  "error": "Forbidden",
  "message": "Access Denied",
  "status": 403
}
```

**Explanation:**
- User is authenticated (401 would mean not authenticated)
- User does NOT have ADMIN role
- Spring Security blocks request with 403 Forbidden
- User has `ROLE_USER` but endpoint requires `ROLE_ADMIN`

---

## Test Case 3: Authenticated Admin → Admin Endpoint

### ✅ Expected: HTTP 200 OK with data

**Step 1: Login as Admin User (Get JWT Token)**

**Option A: Using Existing JWT Authentication**

**Request:**
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

**Response:**
```json
Status: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

**⚠️ Note:** This requires an admin user to exist in your database with role=ADMIN.

---

**Option B: Using Firebase Authentication (Recommended)**

1. **Set Firebase custom claims for admin user** (using Firebase Admin SDK - server-side only):

   ```javascript
   // Run this in Firebase Admin SDK (Node.js script or Firebase Functions)
   const admin = require('firebase-admin');
   
   // Initialize Firebase Admin
   admin.initializeApp({
     credential: admin.credential.applicationDefault()
   });
   
   // Set admin custom claim for a user
   admin.auth().setCustomUserClaims('firebase-uid-here', { admin: true })
     .then(() => {
       console.log('Admin claim set successfully');
     });
   ```

2. **Authenticate in React/frontend:**
   ```javascript
   import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
   
   const userCredential = await signInWithEmailAndPassword(auth, email, password);
   const idToken = await getIdToken(userCredential.user);
   
   // Use idToken for API requests
   ```

3. **Use Firebase ID token in Postman:**
   ```http
   GET http://localhost:8080/api/admin/contact-requests
   Authorization: Bearer <Firebase-ID-Token>
   ```

---

**Step 2: Access Admin Endpoint**

**Request:**
```http
GET http://localhost:8080/api/admin/contact-requests
Authorization: Bearer <admin-jwt-or-firebase-token>
```

**Postman Setup:**
1. Create new request: `GET`
2. URL: `http://localhost:8080/api/admin/contact-requests`
3. Authorization tab: Select "Bearer Token"
4. Token: Paste the admin token
5. Send request

**Expected Response:**
```json
Status: 200 OK
[
  {
    "id": 1,
    "userId": 3,
    "userName": "John Doe",
    "email": "john@example.com",
    "subject": "Booking Inquiry",
    "message": "I want to book a room",
    "status": "NEW",
    "submittedAt": "2024-01-15T10:30:00",
    "resolvedAt": null
  },
  {
    "id": 2,
    "userId": 5,
    "userName": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Complaint",
    "message": "Service was not good",
    "status": "RESOLVED",
    "submittedAt": "2024-01-14T09:15:00",
    "resolvedAt": "2024-01-14T15:30:00"
  }
]
```

**Explanation:**
- Admin user is authenticated
- Admin user has `ROLE_ADMIN` authority
- Spring Security allows request to proceed
- Controller returns all contact requests

---

## Test Case 4: Authenticated Normal User → /api/auth/me

### ✅ Expected: HTTP 200 OK with user profile

**Step 1: Login as Normal User**

**Request:**
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

---

**Step 2: Get Current User Profile**

**Request:**
```http
GET http://localhost:8080/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Postman Setup:**
1. Create new request: `GET`
2. URL: `http://localhost:8080/api/auth/me`
3. Authorization tab: Select "Bearer Token"
4. Token: Paste the JWT token
5. Send request

**Expected Response:**
```json
Status: 200 OK
{
  "id": 1,
  "firebaseUid": null,
  "name": "Normal User",
  "email": "user@example.com",
  "mobileNumber": "1234567890",
  "address": "123 Main St",
  "gender": "MALE",
  "role": "USER"
}
```

**Explanation:**
- User is authenticated
- Endpoint is accessible to any authenticated user
- Returns current user's profile from `@AuthenticationPrincipal User`
- Does NOT return password or sensitive fields

---

## 📊 Complete Test Matrix

| Test Case | Endpoint | Auth Token | User Role | Expected Status | Expected Behavior |
|-----------|----------|------------|-----------|-----------------|-------------------|
| 1 | `/api/admin/contact-requests` | None | N/A | **401** | Unauthorized - no token |
| 2 | `/api/admin/contact-requests` | Valid | USER | **403** | Forbidden - insufficient role |
| 3 | `/api/admin/contact-requests` | Valid | ADMIN | **200** | Success - returns data |
| 4 | `/api/auth/me` | None | N/A | **401** | Unauthorized - no token |
| 5 | `/api/auth/me` | Valid | USER | **200** | Success - returns user profile |
| 6 | `/api/auth/me` | Valid | ADMIN | **200** | Success - returns admin profile |
| 7 | `/api/contact` | None | N/A | **401** | Unauthorized - no token |
| 8 | `/api/contact` | Valid | USER | **201** | Success - creates contact |
| 9 | `/api/contact` | Valid | ADMIN | **201** | Success - creates contact |

---

## 🔧 Creating Test Users

### Create Normal User (USER role):

**SQL:**
```sql
-- Connect to PostgreSQL
docker exec -it bambardara-postgres psql -U bambardara -d bambardara

-- Insert normal user
INSERT INTO users (name, email, password, role) 
VALUES (
  'Normal User', 
  'user@example.com', 
  '$2a$10$your-bcrypt-hash-here',  -- Use BCrypt to hash password
  'USER'
);
```

**Or use registration endpoint:**
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Normal User",
  "email": "user@example.com",
  "password": "password123",
  "mobileNumber": "1234567890",
  "address": "123 Main St",
  "gender": "MALE"
}
```

---

### Create Admin User (ADMIN role):

**Option A: SQL (Direct Database)**
```sql
-- Connect to PostgreSQL
docker exec -it bambardara-postgres psql -U bambardara -d bambardara

-- Insert admin user
INSERT INTO users (name, email, password, role) 
VALUES (
  'Admin User', 
  'admin@example.com', 
  '$2a$10$your-bcrypt-hash-here',  -- Use BCrypt to hash password
  'ADMIN'
);
```

**Option B: Firebase + Custom Claims (Recommended)**

1. Create user in Firebase Console or via SDK
2. Set custom claim using Firebase Admin SDK:

```javascript
const admin = require('firebase-admin');
admin.auth().setCustomUserClaims(uid, { admin: true });
```

3. First login will auto-create PostgreSQL user with ADMIN role

---

## 🐛 Troubleshooting

### Issue: All requests return 403

**Possible Causes:**
1. `@EnableMethodSecurity` not added to `SecurityConfig`
2. FirebaseAuthenticationFilter not building authorities correctly
3. User role is NULL in database

**Fix:**
```java
// Verify SecurityConfig has:
@Configuration
@EnableMethodSecurity  // ← Must be present
public class SecurityConfig {
```

---

### Issue: Admin users get 403 on admin endpoints

**Possible Causes:**
1. User role is "ADMIN" but authorities are not set correctly
2. Custom claims not set in Firebase
3. Token expired or invalid

**Debug:**
```java
// Add logging in FirebaseAuthenticationFilter:
logger.info("User role: {}", user.getRole());
logger.info("Authorities: {}", authorities);
```

**Check Firebase custom claims:**
```javascript
// In Firebase Admin SDK
admin.auth().getUser(uid).then(user => {
  console.log('Custom claims:', user.customClaims);
});
```

---

### Issue: 401 instead of 403 for insufficient role

**Explanation:**
- 401 = Not authenticated (no token or invalid token)
- 403 = Authenticated but insufficient permissions

**Fix:**
1. Verify token is valid and not expired
2. Check Authorization header: `Bearer <token>`
3. Verify Firebase Admin SDK is initialized

---

## 🚀 Next Steps

After successful testing:

1. ✅ **Verified**: Role-based authorization works
2. ✅ **Verified**: Admin endpoints are protected
3. ✅ **Verified**: Normal users cannot access admin APIs
4. ✅ **Verified**: `/api/auth/me` works for all users

**Production Checklist:**
- [ ] Set Firebase custom claims for all admin users
- [ ] Test with real Firebase tokens from React frontend
- [ ] Verify all admin endpoints have proper authorization
- [ ] Remove old JWT authentication code (if Firebase fully working)
- [ ] Update API documentation with role requirements
- [ ] Set up monitoring for authorization failures (403s)

---

## 📝 API Documentation

### GET /api/auth/me

**Description:** Get current authenticated user profile

**Authorization:** Required (any authenticated user)

**Response:**
```json
{
  "id": 1,
  "firebaseUid": "firebase-uid-abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "1234567890",
  "address": "123 Main St",
  "gender": "MALE",
  "role": "USER"
}
```

---

### GET /api/admin/contact-requests

**Description:** Get all contact requests (admin only)

**Authorization:** Required (ADMIN role)

**Query Parameters:**
- `status` (optional): Filter by status (NEW, IN_PROGRESS, RESOLVED, CLOSED)

**Example:**
```
GET /api/admin/contact-requests?status=NEW
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 3,
    "userName": "John Doe",
    "email": "john@example.com",
    "subject": "Booking Inquiry",
    "message": "I want to book a room",
    "status": "NEW",
    "submittedAt": "2024-01-15T10:30:00",
    "resolvedAt": null
  }
]
```

---

## 🔐 Security Summary

**✅ Implemented:**
- Role-based authorization on `/api/admin/**`
- Firebase custom claims → Spring Security authorities
- Method-level security with `@PreAuthorize`
- Proper 401 vs 403 distinction
- User profile endpoint for authenticated users

**✅ Security Features:**
- Admin role can ONLY be set server-side (Firebase Admin SDK)
- Frontend cannot forge admin tokens
- Tokens are verified cryptographically
- Role is extracted from signed token claims
- Spring Security enforces authorization before controller

**❌ Not Implemented (Remaining):**
- Remove agrotourism incomplete code (blocking compilation)
- Database migration execution
- Firebase credentials setup
- Admin user creation

---

## 📧 Contact

If you encounter issues during testing, check:
1. Backend logs for authentication/authorization errors
2. Token expiration (Firebase tokens expire after 1 hour)
3. Database user roles (must be exactly "USER" or "ADMIN")
4. Firebase custom claims (must be set server-side)

