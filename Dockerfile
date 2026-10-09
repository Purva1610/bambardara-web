# Stage 1: Build the React application
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Declare Keycloak build-time variables (set via docker-compose args or --build-arg)
ARG REACT_APP_KEYCLOAK_URL
ARG REACT_APP_KEYCLOAK_REALM
ARG REACT_APP_KEYCLOAK_CLIENT_ID
ARG REACT_APP_API_URL
ARG REACT_APP_ENQUIRY_ENDPOINT

# Expose them as env vars so react-scripts build can read them
ENV REACT_APP_KEYCLOAK_URL=$REACT_APP_KEYCLOAK_URL
ENV REACT_APP_KEYCLOAK_REALM=$REACT_APP_KEYCLOAK_REALM
ENV REACT_APP_KEYCLOAK_CLIENT_ID=$REACT_APP_KEYCLOAK_CLIENT_ID
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENQUIRY_ENDPOINT=$REACT_APP_ENQUIRY_ENDPOINT

# Prevent Webpack 5 / Terser worker thread deadlocks and OOM during container builds
ENV GENERATE_SOURCEMAP=false
ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Trusts this machine's antivirus TLS-inspection root cert if present, so npm
# can verify registry.npmjs.org through it (glob pattern is a no-op, not an
# error, on any machine/CI that doesn't have this file — see .gitignore).
COPY avast-root.pem* /usr/local/share/ca-certificates/avast-root.crt
RUN [ -f /usr/local/share/ca-certificates/avast-root.crt ] && update-ca-certificates || true
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/avast-root.crt

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
