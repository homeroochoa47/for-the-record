import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  apiRoutes: ["/api/spotify/getSpotifyProfile"],
  publicRoutes: ["/"],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};