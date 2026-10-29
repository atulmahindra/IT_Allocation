import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, DEFAULT_AUTHENTICATED_PATH, LOGIN_PATH } from "@/constants/auth";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const cookieStore = await cookies();
  const hasToken = Boolean(cookieStore.get(AUTH_COOKIE_NAME)?.value);
  redirect(hasToken ? DEFAULT_AUTHENTICATED_PATH : LOGIN_PATH);
}
