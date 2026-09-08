# Keycloak Local Development Setup (Phase 2)

Status: local development only. No frontend exists yet — every flow here is
tested with Postman (or curl) directly against Keycloak and the Spring Boot
API. Nothing here is production-ready; see "What is intentionally NOT
migrated yet" at the bottom.

## 1. What Keycloak is

Keycloak is the Identity Provider (IdP) for the Bambardara migration. It owns
authentication: credentials, login, sessions, MFA (later), and issuing
OIDC/OAuth2 access tokens. Spring Boot never sees a password — it only ever
validates a Keycloak-issued JWT.

## 2. What the Bambardara realm is

A Keycloak "realm" is an isolated tenant: its own users, clients, and roles.
The `bambardara` realm is dedicated to this application — never use
Keycloak's built-in `master` realm (that's for administering Keycloak
itself).

## 3. Keycloak local URL

`http://localhost:8081`
Admin console: `http://localhost:8081/admin` (login with the bootstrap admin
credentials below — this account manages Keycloak itself, not Bambardara
users).

## 4. Realm name

`bambardara`

## 5. Client name

`bambardara-api` — represents the Spring Boot backend (a resource server).
There is no `bambardara-web` yet; that will represent a real frontend in a
later phase.

- Confidential client (has a secret), `directAccessGrantsEnabled: true`
  (Resource Owner Password Credentials / "Direct Access Grant" flow) — this
  is what lets Postman obtain a token directly with a username/password,
  standing in for a frontend login screen that doesn't exist yet. This flow
  is fine for local dev/testing; a real frontend should use the
  Authorization Code flow instead (see "not migrated yet").
- `standardFlowEnabled: false` — no browser redirect login is configured
  for this client since there's no frontend to redirect to.
- Issues an `aud: "bambardara-api"` claim on access tokens (a protocol
  mapper in the realm export), preparing for audience validation later.

## 6. Test roles

Realm roles (Phase 2 minimum only — the full CRM role list from the
migration plan is a separate, later effort):

- `USER`
- `ADMIN`

## 7. Test users

**DEVELOPMENT ONLY. Never reuse these credentials anywhere real.**

| Username | Password | Realm role |
|---|---|---|
| `testuser` | `testuser123` | USER |
| `testadmin` | `testadmin123` | ADMIN |

To change them: edit `keycloak/realm-export/bambardara-realm.json` (the
`users` array) and restart the container — `start-dev`'s database is
ephemeral, so the realm (including users) is rebuilt from that file on
every restart. There is no persistent Keycloak database to migrate in this
setup.

## 8. How to start Keycloak

From the repo root (`C:\bam`):

```
docker compose -f docker-compose.keycloak.yml up -d
```

This uses Keycloak's official image (`quay.io/keycloak/keycloak:26.0.7`,
version pinned, not `latest`) in dev mode (`start-dev --import-realm`),
which:
- Runs against an embedded, in-memory H2 database (data does not persist
  across restarts — by design, so the realm always comes from the JSON file)
- Serves plain HTTP, not HTTPS
- Imports `keycloak/realm-export/bambardara-realm.json` automatically

This is a **separate compose file** from `docker-compose.backend.yml` — it
does not touch, depend on, or share a network with the existing
`bambardara-postgres`/`bambardara-backend` containers. Bambardara's
application database is completely unaffected by starting or stopping
Keycloak.

Bootstrap admin console credentials come from `KEYCLOAK_ADMIN_USERNAME` /
`KEYCLOAK_ADMIN_PASSWORD` (see `.env.example` at the repo root) — defaults to
`admin` / `admin_dev_only` if unset. Again: this is the Keycloak
*administrator*, unrelated to `testuser`/`testadmin`.

Check it came up correctly:
```
curl http://localhost:8081/realms/bambardara/.well-known/openid-configuration
```

## 9. How to obtain an access token using Postman

**POST** `http://localhost:8081/realms/bambardara/protocol/openid-connect/token`

Body type: `x-www-form-urlencoded`

| Key | Value |
|---|---|
| `grant_type` | `password` |
| `client_id` | `bambardara-api` |
| `client_secret` | `bambardara-api-dev-secret-CHANGE-ME` |
| `username` | `testuser` (or `testadmin`) |
| `password` | `testuser123` (or `testadmin123`) |

Response includes `access_token` — copy that value.

(The client secret above is the realm-export file's placeholder dev secret,
committed to this repo. It is not a real secret — it only ever grants
access to your own local, ephemeral Keycloak container. Rotate it in the
realm-export file if you want a different value; there is nothing
production-facing behind it.)

## 10. How to call Spring Boot with the token

**GET** `http://localhost:8080/api/auth/me`
Header: `Authorization: Bearer <access_token>`

Postman: use the "Bearer Token" auth type on the request and paste the
token, or add the header manually.

Backend must be started with `KEYCLOAK_ISSUER_URI` pointing at the realm:
```
KEYCLOAK_ISSUER_URI=http://localhost:8081/realms/bambardara
```
(See `.env.example` in this backend project.) Start Keycloak *before*
Spring Boot — `KeycloakResourceServerConfig` performs OIDC discovery against
the issuer URL at startup and will fail to build the JWT decoder if
Keycloak isn't reachable yet.

## 11. Expected 401/403/200 behavior

| Request | Expected |
|---|---|
| No `Authorization` header on a protected endpoint | 401 |
| Malformed/garbage bearer token | 401 |
| Valid `testuser` token on `GET /api/auth/me` | 200, identifies the local Bambardara user |
| Valid `testuser` token on an ADMIN-only endpoint (e.g. `GET /api/admin/dashboard/stats`) | 403 |
| Valid `testadmin` token on the same ADMIN-only endpoint | 200 |
| Valid legacy JWT (from `POST /api/auth/login`) on `GET /api/auth/me` | 200 (unchanged, still works) |

## 12. Environment variables

Backend (`bamberdara-backend/.env.example`):
```
KEYCLOAK_ISSUER_URI=http://localhost:8081/realms/bambardara
```

Root compose (`C:\bam\.env.example`):
```
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin_dev_only
KEYCLOAK_ISSUER_URI=http://localhost:8081/realms/bambardara
```

Leaving `KEYCLOAK_ISSUER_URI` blank/unset when starting the backend disables
Keycloak validation entirely (no crash — `KeycloakResourceServerConfig` logs
"KEYCLOAK_ISSUER_URI not configured" and the filter no-ops), so the legacy
JWT path keeps working exactly as before. `POST /api/auth/register` itself
still requires Keycloak, though, since it now creates the account there.

## 13. Troubleshooting

- **Backend fails to start with a Keycloak-related error**: Keycloak must
  already be up and its realm reachable before Spring Boot starts, because
  `JwtDecoders.fromIssuerLocation(...)` does OIDC discovery eagerly at
  startup. Start Keycloak first, confirm
  `curl http://localhost:8081/realms/bambardara/.well-known/openid-configuration`
  returns 200, then start the backend.
- **401 on a token that looks valid**: check the token hasn't expired
  (default access token lifetime here is 5 minutes — get a fresh one), and
  that you copied `access_token`, not `refresh_token`.
- **403 on an endpoint you expect to work for `testadmin`**: confirm the
  token actually carries `realm_access.roles: ["ADMIN"]` — decode the JWT
  (e.g. paste it into any JWT decoder) and check. The local database row's
  `role` column is a separate thing (see note in §14) and will show `USER`
  for both test users; that is expected in Phase 2, not a bug.
- **Keycloak container restarts and test users are "gone"**: expected —
  `start-dev` uses an in-memory database, so it re-imports
  `bambardara-realm.json` fresh on every restart. Nothing is lost because
  nothing was meant to persist here.
- **Port 8081 already in use**: something else is bound to it; change the
  host-side port mapping in `docker-compose.keycloak.yml` and update
  `KEYCLOAK_ISSUER_URI` to match.

## 14. Current migration architecture

```
React frontend / Postman
   |  (password grant - Direct Access Grant)
   v
Keycloak (realm: bambardara, client: bambardara-api or bambardara-web)
   |  Access Token (JWT, RS256, realm_access.roles claim)
   v
Spring Boot - KeycloakResourceServerConfig builds a standard
   Spring Security JwtDecoder (signature + issuer + expiry validation,
   no custom crypto)
   |
   v
KeycloakJwtProvisioningFilter (auth/config)
   - runs as the second and final fallback filter, after
     JwtAuthenticationFilter, only if that filter didn't already
     authenticate the request
   - extracts `sub`, `email`, name-ish claims
   - KeycloakUserProvisioningService.findOrProvisionUser(...) looks up
     users.keycloak_subject; provisions a new local User (role=USER,
     never privileged) if none exists yet
   - authorities = local User.role (ROLE_x) + realm_access.roles mapped
     via KeycloakAuthorityMapper (ROLE_x) - so testadmin's 200 above comes
     from the Keycloak-side realm role claim, not the local DB role
   - sets the existing User entity as the Spring Security principal, so
     every existing @AuthenticationPrincipal User controller keeps working
     unchanged
   v
Bambardara business APIs (unmodified)
   v
PostgreSQL (users.keycloak_subject, source of truth for business data)
```

Important nuance worth remembering: a newly-provisioned local user's
`role` column is always `USER`, regardless of what the Keycloak token
claims. `testadmin` getting through an ADMIN-gated endpoint above works
because `KeycloakAuthorityMapper` additionally maps the token's
`realm_access.roles` into Spring Security authorities — the local DB role
and the Keycloak-side role are two separate signals that happen to both be
consulted right now. Deciding whether the local DB role should eventually
become the single source of truth (with Keycloak roles only informing
provisioning, not live authorization) is a Phase 3+ design question, not
resolved here.

## 15. What is intentionally NOT migrated yet

- Firebase authentication has been fully removed (`FirebaseAuthenticationFilter`,
  `FirebaseConfig`, the `firebase-admin` dependency, and the
  `spring.security` wiring that ran them). The `users.firebase_uid` column
  and `User.firebaseUid` field remain as read-only history for accounts
  created before this removal; nothing writes to them anymore.
- Legacy local JWT authentication (`JwtAuthenticationFilter`, `JwtService`,
  `TokenIssuer`, `TokenVerifier`, `/api/auth/login`) — still present, still
  functional, not touched. `POST /api/auth/register` itself now creates the
  user's identity in Keycloak (via `KeycloakAdminService`) rather than a
  local password — see `AuthService.register`.
- Authorization Code + PKCE — the React frontend (`bambardara-web`) uses
  Direct Access Grant only for this local-dev phase; that's a stand-in, not
  the eventual production login flow.
- The full CRM role/permission model (CEO, CMD, BOARD_MEMBER, MD, CFO,
  PROJECT_DIRECTOR, PROJECT_MANAGER, DEPARTMENT_MANAGER, EMPLOYEE,
  INVESTOR) and any fine-grained permission/data-scope system — only
  `USER`/`ADMIN` exist for now, matching what the current codebase already
  enforces.
- Audience enforcement in Spring Security — the `aud: "bambardara-api"`
  claim is present on issued tokens (for future use) but Spring Security is
  not yet configured to reject tokens with a different audience.
- Any production Keycloak deployment, TLS, persistent Keycloak database,
  or realm/client configuration suitable for anything beyond a developer's
  own machine.
