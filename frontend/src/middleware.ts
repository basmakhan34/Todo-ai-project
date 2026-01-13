import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const session = req.cookies.get("next-auth.session-token");
      if (session) {
        return true;
      }
      return false;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
