/**
 * Minimal admin auth: a single shared password (ADMIN_PASSWORD) exchanged for an
 * httpOnly session cookie holding a hash of the password. Good enough to gate a
 * single-operator dashboard; swap for a real auth provider if you add staff.
 */
export const ADMIN_COOKIE = "kayak_admin";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD || "change-me";
  return sha256Hex(`kayak-admin:${secret}`);
}

export async function verifyPassword(input: string): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD || "change-me";
  return input === secret;
}

export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  return cookieValue === (await sessionToken());
}
