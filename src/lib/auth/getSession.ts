import { cookies } from "next/headers";
import { ADMIN_TOKEN_COOKIE } from "./constants";
import { verifyAdminToken, type AdminJwtPayload } from "./jwt";

export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  const store = await cookies();
  const token = store.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
