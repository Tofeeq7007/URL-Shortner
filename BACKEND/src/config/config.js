export const cookieOption = {
  httpOnly: true,
  secure: true,           // ✅ required for cross-site cookies over HTTPS
  sameSite: "none",       // ✅ allow cross-site cookies
  path: "/",
  maxAge: 15 * 60 * 1000  // 15 minutes
}