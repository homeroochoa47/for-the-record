// import type { NextApiRequest, NextApiResponse } from "next";
// import { getAuth } from "@clerk/nextjs/server";
// import { setCookie } from 'cookies-next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { userId } = getAuth(req);

//     // i.e. if there is no user signed in
//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Construct the Clerk API URL
//     const clerkApiUrl = `https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/spotify`;

//     // Fetch the OAuth access token from the Clerk API
//     const response = await fetch(clerkApiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
//       }
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const { token: spotifyAccessToken } = data[0];

//       // set token as an httpOnly cookie for the rest of the api to access. 
//       setCookie('spotifyToken', spotifyAccessToken, { req, res, httpOnly: true, maxAge: 3600 });

//       return res.status(200).json({});
//     } else {
//       // Handle API response error
//       console.error("Failed to fetch OAuth access token from Clerk API");
//       return res.status(500).json({ error: "Failed to fetch OAuth access token" });
//     }

//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
