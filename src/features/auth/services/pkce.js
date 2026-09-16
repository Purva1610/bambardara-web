/**
 * PKCE (RFC 7636) helpers for the Google Sign-In Authorization Code
 * redirect. Uses the Web Crypto API, available in all browsers this app
 * targets — no dependency needed.
 */

const base64UrlEncode = (bytes) => {
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/** A random, URL-safe code_verifier per RFC 7636 (43-128 chars). */
export function generateCodeVerifier() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64UrlEncode(bytes);
}

/** SHA-256(code_verifier), base64url-encoded, per RFC 7636 S256. */
export async function generateCodeChallenge(verifier) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return base64UrlEncode(new Uint8Array(digest));
}

/** A random state value to guard against CSRF on the redirect callback. */
export function generateState() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return base64UrlEncode(bytes);
}
