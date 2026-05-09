import { SignJWT, jwtVerify } from "jose";

function getSecretBytes(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

function requireSecretBytes(): Uint8Array {
  const bytes = getSecretBytes();
  if (!bytes) {
    throw new Error(
      "JWT_SECRET must be set in the environment and be at least 16 characters.",
    );
  }
  return bytes;
}

export type AdminJwtPayload = {
  sub: string;
  email: string;
};

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(requireSecretBytes());
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminJwtPayload | null> {
  const secret = getSecretBytes();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!sub || !email) return null;
    return { sub, email };
  } catch {
    return null;
  }
}
